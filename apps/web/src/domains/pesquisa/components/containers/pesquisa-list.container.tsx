import { useNavigate } from "react-router-dom";
import { PesquisaListService } from "../services/pesquisa-list.service";

export const PesquisaListContainer = () => {
  const navigate = useNavigate();
  return <PesquisaListService navigate={navigate} />;
};
