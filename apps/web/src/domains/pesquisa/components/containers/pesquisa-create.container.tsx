import { useNavigate } from "react-router-dom";
import { PesquisaCreateService } from "../services/pesquisa-create.service";

export const PesquisaCreateContainer = () => {
  const navigate = useNavigate();
  return <PesquisaCreateService navigate={navigate} />;
};
