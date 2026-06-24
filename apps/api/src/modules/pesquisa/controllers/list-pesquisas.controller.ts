import { Controller, Get, HttpCode, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { ListPesquisasQueryDto } from '../dtos/list-pesquisas.dto';
import { ListPesquisasService } from '../services/list-pesquisas.service';

@Controller('pesquisas')
export class ListPesquisasController {
  constructor(private readonly service: ListPesquisasService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(ZodValidationPipe)
  execute(@Query() query: ListPesquisasQueryDto) {
    return this.service.execute(query);
  }
}
