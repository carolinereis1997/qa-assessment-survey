import { api } from "@/lib/api";
import { AxiosAdapter } from "@/lib/http/axios.adapter";
import { PesquisaHttpGateway } from "./pesquisa-http.gateway";

export const pesquisaGateway = new PesquisaHttpGateway(new AxiosAdapter(api));

export type { PesquisaGateway } from "./pesquisa.gateway";
