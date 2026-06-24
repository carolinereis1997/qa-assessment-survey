import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { PesquisaModule } from './modules/pesquisa/pesquisa.module';
import { PublicModule } from './modules/pesquisa-publica/public.module';

@Module({
  imports: [PrismaModule, HealthModule, PesquisaModule, PublicModule],
})
export class AppModule {}
