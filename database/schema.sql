-- ============================================================
-- NYSC Portal Upgrade - Database Schema
-- PostgreSQL 16
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('corps_member', 'lga_officer', 'state_coordinator', 'admin', 'superadmin');
CREATE TYPE user_status AS ENUM ('pending', 'active', 'suspended', 'discharged', 'absconded');
CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE marital_status AS ENUM ('single', 'married', 'divorced', 'widowed');
CREATE TYPE batch AS ENUM ('A', 'B', 'C');
CREATE TYPE call_up_stream AS ENUM ('1', '2', '3');
CREATE TYPE payment_status AS ENUM ('pending', 'successful', 'failed', 'reversed');
CREATE TYPE payment_type AS ENUM ('allawee', 'clearance', 'relocation', 'medical', 'other');
CREATE TYPE correction_status AS ENUM ('pending', 'under_review', 'approved', 'rejected');
CREATE TYPE correction_type AS ENUM ('name', 'date_of_birth', 'state_of_origin', 'institution', 'course', 'other');
CREATE TYPE clearance_status AS ENUM ('pending', 'cleared', 'query', 'withheld');
CREATE TYPE case_status AS ENUM ('open', 'under_investigation', 'hearing', 'closed', 'appealed');
CREATE TYPE case_severity AS ENUM ('minor', 'moderate', 'major', 'absconding');
CREATE TYPE document_type AS ENUM ('passport_photo', 'certificate', 'statement_of_result', 'birth_certificate', 'other');
CREATE TYPE notification_channel AS ENUM ('email', 'sms', 'in_app');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed');

-- ============================================================
-- REFERENCE TABLES
-- ============================================================

CREATE TABLE states (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    code        VARCHAR(3) NOT NULL UNIQUE,
    geopolitical_zone VARCHAR(20),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lgas (
    id          SERIAL PRIMARY KEY,
    state_id    INTEGER NOT NULL REFERENCES states(id),
    name        VARCHAR(100) NOT NULL,
    code        VARCHAR(10),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(state_id, name)
);

CREATE TABLE institutions (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(200) NOT NULL,
    type            VARCHAR(50),  -- university, polytechnic, college_of_education
    state_id        INTEGER REFERENCES states(id),
    is_foreign       BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BATCHES & STREAMS
-- ============================================================

CREATE TABLE service_years (
    id          SERIAL PRIMARY KEY,
    year        INTEGER NOT NULL,
    batch       batch NOT NULL,
    stream      call_up_stream NOT NULL,
    start_date  DATE,
    end_date    DATE,
    is_active   BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(year, batch, stream)
);

-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(20) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    role            user_role NOT NULL DEFAULT 'corps_member',
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    two_fa_enabled  BOOLEAN DEFAULT FALSE,
    last_login_at   TIMESTAMPTZ,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE corps_members (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    state_code          VARCHAR(20) UNIQUE,           -- e.g. LA/23A/1234, assigned by NYSC after registration
    nin                 VARCHAR(11) UNIQUE,
    bvn                 VARCHAR(11),
    first_name          VARCHAR(100) NOT NULL,
    middle_name         VARCHAR(100),
    last_name           VARCHAR(100) NOT NULL,
    date_of_birth       DATE,
    gender              gender,
    marital_status      marital_status DEFAULT 'single',
    state_of_origin_id  INTEGER REFERENCES states(id),
    lga_of_origin_id    INTEGER REFERENCES lgas(id),
    institution_id      INTEGER REFERENCES institutions(id),
    course_of_study     VARCHAR(200),
    degree_type         VARCHAR(50),
    graduation_year     INTEGER,
    service_year_id     INTEGER REFERENCES service_years(id),
    posted_state_id     INTEGER REFERENCES states(id),
    posted_lga_id       INTEGER REFERENCES lgas(id),
    ppa_name            VARCHAR(300),  -- Primary Place of Assignment
    ppa_address         TEXT,
    status              user_status DEFAULT 'pending',
    passport_url        TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE staff (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    staff_id        VARCHAR(50) NOT NULL UNIQUE,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    designation     VARCHAR(200),
    state_id        INTEGER REFERENCES states(id),
    lga_id          INTEGER REFERENCES lgas(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REFRESH TOKENS
-- ============================================================

CREATE TABLE refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash  TEXT NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked     BOOLEAN DEFAULT FALSE,
    ip_address  VARCHAR(50),
    user_agent  TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- OTP
-- ============================================================

CREATE TABLE otps (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code        VARCHAR(6) NOT NULL,
    purpose     VARCHAR(50) NOT NULL,  -- login, email_verify, phone_verify, password_reset
    expires_at  TIMESTAMPTZ NOT NULL,
    used        BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PAYMENTS
-- ============================================================

CREATE TABLE payments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id       UUID NOT NULL REFERENCES corps_members(id),
    rrr             VARCHAR(50) UNIQUE,   -- Remita Retrieval Reference
    amount          DECIMAL(12, 2) NOT NULL,
    payment_type    payment_type NOT NULL,
    status          payment_status DEFAULT 'pending',
    remita_response JSONB,
    month           INTEGER,  -- for monthly allawee
    year            INTEGER,
    initiated_at    TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payment_audit_log (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id  UUID NOT NULL REFERENCES payments(id),
    event       VARCHAR(50) NOT NULL,
    payload     JSONB,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- COURSE CORRECTIONS
-- ============================================================

CREATE TABLE course_corrections (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id       UUID NOT NULL REFERENCES corps_members(id),
    correction_type correction_type NOT NULL,
    old_value       TEXT NOT NULL,
    new_value       TEXT NOT NULL,
    reason          TEXT,
    supporting_docs JSONB DEFAULT '[]',
    status          correction_status DEFAULT 'pending',
    reviewed_by     UUID REFERENCES users(id),
    review_note     TEXT,
    reviewed_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LGA CLEARANCE
-- ============================================================

CREATE TABLE lga_clearances (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id       UUID NOT NULL REFERENCES corps_members(id),
    lga_id          INTEGER NOT NULL REFERENCES lgas(id),
    status          clearance_status DEFAULT 'pending',
    cleared_by      UUID REFERENCES users(id),
    query_reason    TEXT,
    notes           TEXT,
    cleared_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(member_id, lga_id)
);

-- ============================================================
-- DISCIPLINARY CASES
-- ============================================================

CREATE TABLE disciplinary_cases (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id       UUID NOT NULL REFERENCES corps_members(id),
    case_number     VARCHAR(50) NOT NULL UNIQUE,
    offense         TEXT NOT NULL,
    severity        case_severity NOT NULL,
    status          case_status DEFAULT 'open',
    filed_by        UUID NOT NULL REFERENCES users(id),
    assigned_to     UUID REFERENCES users(id),
    hearing_date    TIMESTAMPTZ,
    verdict         TEXT,
    punishment      TEXT,
    appeal_deadline TIMESTAMPTZ,
    closed_at       TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE case_events (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id     UUID NOT NULL REFERENCES disciplinary_cases(id),
    event_type  VARCHAR(50) NOT NULL,
    description TEXT,
    created_by  UUID REFERENCES users(id),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DOCUMENTS
-- ============================================================

CREATE TABLE documents (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id       UUID NOT NULL REFERENCES corps_members(id),
    document_type   document_type NOT NULL,
    file_url        TEXT NOT NULL,
    file_name       TEXT,
    file_size       INTEGER,
    mime_type       VARCHAR(100),
    is_verified     BOOLEAN DEFAULT FALSE,
    verified_by     UUID REFERENCES users(id),
    verified_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    channel     notification_channel NOT NULL,
    status      notification_status DEFAULT 'pending',
    is_read     BOOLEAN DEFAULT FALSE,
    metadata    JSONB DEFAULT '{}',
    sent_at     TIMESTAMPTZ,
    read_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================

CREATE TABLE audit_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id),
    action      VARCHAR(100) NOT NULL,
    entity      VARCHAR(100),
    entity_id   UUID,
    old_data    JSONB,
    new_data    JSONB,
    ip_address  VARCHAR(50),
    user_agent  TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);

-- Corps Members
CREATE INDEX idx_corps_members_state_code ON corps_members(state_code);
CREATE INDEX idx_corps_members_nin ON corps_members(nin);
CREATE INDEX idx_corps_members_service_year ON corps_members(service_year_id);
CREATE INDEX idx_corps_members_posted_state ON corps_members(posted_state_id);
CREATE INDEX idx_corps_members_status ON corps_members(status);
CREATE INDEX idx_corps_members_name ON corps_members(last_name, first_name);

-- Payments
CREATE INDEX idx_payments_member ON payments(member_id);
CREATE INDEX idx_payments_rrr ON payments(rrr);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_type ON payments(payment_type);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- Audit Logs
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Clearances
CREATE INDEX idx_lga_clearances_member ON lga_clearances(member_id);
CREATE INDEX idx_lga_clearances_status ON lga_clearances(status);

-- OTPs
CREATE INDEX idx_otps_user_purpose ON otps(user_id, purpose);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_corps_members_updated_at BEFORE UPDATE ON corps_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_staff_updated_at BEFORE UPDATE ON staff FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_corrections_updated_at BEFORE UPDATE ON course_corrections FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_clearances_updated_at BEFORE UPDATE ON lga_clearances FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_cases_updated_at BEFORE UPDATE ON disciplinary_cases FOR EACH ROW EXECUTE FUNCTION update_updated_at();
