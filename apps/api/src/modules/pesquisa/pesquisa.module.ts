import { Module } from "@nestjs/common";
import { CreatePesquisaController } from "./controllers/create-pesquisa.controller";
import { ListPesquisasController } from "./controllers/list-pesquisas.controller";
import { ShowPesquisaController } from "./controllers/show-pesquisa.controller";
import { UpdatePesquisaController } from "./controllers/update-pesquisa.controller";
import { CreatePesquisaRepository } from "./repositories/create-pesquisa.repository";
import { FindPesquisaByIdRepository } from "./repositories/find-pesquisa-by-id.repository";
import { FindPesquisaByNomeRepository } from "./repositories/find-pesquisa-by-nome.repository";
import { ListPesquisasRepository } from "./repositories/list-pesquisas.repository";
import { UpdatePesquisaRepository } from "./repositories/update-pesquisa.repository";
import { CreatePesquisaService } from "./services/create-pesquisa.service";
import { ListPesquisasService } from "./services/list-pesquisas.service";
import { ShowPesquisaService } from "./services/show-pesquisa.service";
import { UpdatePesquisaService } from "./services/update-pesquisa.service";

@Module({
  controllers: [
    CreatePesquisaController,
    ShowPesquisaController,
    UpdatePesquisaController,
    ListPesquisasController,
  ],
  providers: [
    CreatePesquisaService,
    UpdatePesquisaService,
    ListPesquisasService,
    ShowPesquisaService,
    CreatePesquisaRepository,
    UpdatePesquisaRepository,
    ListPesquisasRepository,
    FindPesquisaByNomeRepository,
    FindPesquisaByIdRepository,
  ],
})
export class PesquisaModule {}
