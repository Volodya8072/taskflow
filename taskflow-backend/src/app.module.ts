import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { TaskModule } from './task/task.module'

import { UserModule } from './user/user.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    AppController
  ],
})
export class AppModule {}

