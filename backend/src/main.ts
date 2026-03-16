import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import * as compression from 'compression'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Security
  app.use(helmet())
  app.use(compression())

  // Request logger (dev + production diagnostic)
  app.use((req: import('express').Request, _res: import('express').Response, next: import('express').NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | Origin: ${req.headers.origin || 'none'}`)
    next()
  })

  // CORS
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
  ].filter(Boolean).map(o => o!.replace(/\/$/, '')) // strip trailing slashes

  app.enableCors({
    origin: (origin, callback) => {
      // allow server-to-server / Swagger (no origin)
      if (!origin) return callback(null, true)
      const normalized = origin.replace(/\/$/, '')
      if (allowedOrigins.includes(normalized)) {
        callback(null, true)
      } else {
        console.warn(`[CORS] Blocked origin: ${origin} | Allowed: ${allowedOrigins.join(', ')}`)
        callback(new Error(`CORS: origin ${origin} not allowed`))
      }
    },
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  // Global API prefix
  app.setGlobalPrefix('api/v1')

  // Swagger docs (dev only)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('NYSC Portal API')
      .setDescription('National Youth Service Corps Portal — REST API')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)
  }

  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`NYSC Portal API running on http://localhost:${port}/api/v1`)
  console.log(`API Docs: http://localhost:${port}/api/docs`)
}

bootstrap()
