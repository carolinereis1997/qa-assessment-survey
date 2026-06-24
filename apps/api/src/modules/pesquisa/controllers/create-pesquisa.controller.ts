import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreatePesquisaDto } from '../dtos/create-pesquisa.dto';
import { CreatePesquisaService } from '../services/create-pesquisa.service';

@Controller('pesquisas')
export class CreatePesquisaController {
  constructor(private readonly service: CreatePesquisaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ZodValidationPipe)
  execute(@Body() body: CreatePesquisaDto) {
    return this.service.execute(body);
  }
}
