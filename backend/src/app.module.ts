import { Module } from '@nestjs/common';
import { HealthModule } from './app/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AzureADStrategy } from './guard/azure-ad.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    HealthModule,
  ],
  providers: [AzureADStrategy],
})
export class AppModule {}
