import { Module } from '@nestjs/common';
import { PrModule } from './modules/pr/pr.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrModule, AuthModule],
})
export class AppModule { }