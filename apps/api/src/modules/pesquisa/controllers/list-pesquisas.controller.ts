import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ListPesquisasQueryDto } from '../dtos/list-pesquisas.dto';
import { ListPesquisasService } from '../services/list-pesquisas.service';

@Controller('pesquisas')
export class ListPesquisasController {
  constructor(private readonly service: ListPesquisasService) {}

  @Get()
  @HttpCode(200)
  execute(@Query() query: ListPesquisasQueryDto) {
    return this.service.execute(query);
  }
}
