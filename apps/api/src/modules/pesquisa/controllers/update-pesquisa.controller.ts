import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UsePipes,
} from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import { UpdatePesquisaDto } from "../dtos/update-pesquisa.dto";
import { UpdatePesquisaService } from "../services/update-pesquisa.service";

@Controller("pesquisas")
export class UpdatePesquisaController {
  constructor(private readonly service: UpdatePesquisaService) {}

  @Put(":id")
  @HttpCode(200)
  @UsePipes(ZodValidationPipe)
  execute(@Param("id") id: string, @Body() body: UpdatePesquisaDto) {
    return this.service.execute(id, body);
  }
}
