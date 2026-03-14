import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HealthController } from './health.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PaymentsModule } from './payments/payments.module'
import { CorrectionsModule } from './corrections/corrections.module'
import { ClearanceModule } from './clearance/clearance.module'
import { NotificationsModule } from './notifications/notifications.module'
import { AdminModule } from './admin/admin.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') === 'development',
        logging: config.get('NODE_ENV') === 'development',
        ssl: config.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),

    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 10 },
      { name: 'medium', ttl: 10000, limit: 50 },
      { name: 'long', ttl: 60000, limit: 200 },
    ]),

    AuthModule,
    UsersModule,
    PaymentsModule,
    CorrectionsModule,
    ClearanceModule,
    NotificationsModule,
    AdminModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
