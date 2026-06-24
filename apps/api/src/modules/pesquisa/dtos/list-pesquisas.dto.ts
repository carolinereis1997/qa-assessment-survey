import { createZodDto } from 'nestjs-zod';
import { listPesquisasQuerySchema } from '../schemas/list-pesquisas.schema';

export class ListPesquisasQueryDto extends createZodDto(
  listPesquisasQuerySchema,
) {}
