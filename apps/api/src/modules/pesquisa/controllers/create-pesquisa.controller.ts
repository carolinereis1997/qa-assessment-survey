import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreatePesquisaDto } from '../dtos/create-pesquisa.dto';
import { CreatePesquisaService } from '../services/create-pesquisa.service';

@Controller('pesquisas')
export class CreatePesquisaController {
  constructor(private readonly service: CreatePesquisaService) {}

  @Post()
  @HttpCode(201)
  execute(@Body() body: CreatePesquisaDto) {
    return this.service.execute(body);
  }
}
