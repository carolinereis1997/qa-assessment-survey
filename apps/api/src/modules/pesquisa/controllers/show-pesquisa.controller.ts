import { Controller, Get, HttpCode, Param, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import { ShowPesquisaService } from "../services/show-pesquisa.service";

@Controller("pesquisas")
export class ShowPesquisaController {
  constructor(private readonly service: ShowPesquisaService) {}

  @Get(":id")
  @HttpCode(200)
  @UsePipes(ZodValidationPipe)
  execute(@Param("id") id: string, empresaId: string) {
    return this.service.execute(id, empresaId);
  }
}
