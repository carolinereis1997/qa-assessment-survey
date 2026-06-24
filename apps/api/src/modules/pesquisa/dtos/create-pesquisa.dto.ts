import { createZodDto } from "nestjs-zod";
import { createPesquisaSchema } from "../schemas/create-pesquisa.schema";

export class CreatePesquisaDto extends createZodDto(createPesquisaSchema) {}
