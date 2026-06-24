import { Module } from "@nestjs/common";
import { ShowPesquisaPublicaController } from "./controllers/show-pesquisa-publica.controller";
import { SubmitPesquisaPublicaController } from "./controllers/submit-pesquisa-publica.controller";
import { FindPesquisaByPublicIdRepository } from "./repositories/find-pesquisa-by-public-id.repository";
import { SubmitPesquisaPublicaRepository } from "./repositories/submit-pesquisa-publica.repository";
import { ShowPesquisaPublicaService } from "./services/show-pesquisa-publica.service";
import { SubmitPesquisaPublicaService } from "./services/submit-pesquisa-publica.service";

@Module({
  controllers: [ShowPesquisaPublicaController, SubmitPesquisaPublicaController],
  providers: [
    ShowPesquisaPublicaService,
    SubmitPesquisaPublicaService,
    FindPesquisaByPublicIdRepository,
    SubmitPesquisaPublicaRepository,
  ],
})
export class PublicModule {}
