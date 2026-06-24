import { createZodDto } from "nestjs-zod";
import { updatePesquisaSchema } from "../schemas/update-pesquisa.schema";

export class UpdatePesquisaDto extends createZodDto(updatePesquisaSchema) {}
