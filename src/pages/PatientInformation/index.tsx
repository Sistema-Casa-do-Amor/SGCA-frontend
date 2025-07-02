import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { recordStyles, stylesContainer, TitleStyles } from "./styles";

const PatientInformation = () => {
  const navigate = useNavigate();

  const handleNavigate = (record: string) => {
    navigate(`/patient/information/${record}`);
  }

  const patientData = {
    name: "João da silva",
  }
  return (
    <div css={stylesContainer}>
      <h1 css={TitleStyles}>{patientData.name}</h1>
      <p>Dados do paciente aqui.</p>
      <h1 css={TitleStyles}>Prontuários</h1>
      <div css={recordStyles}>
        <Button
          sx={{ backgroundColor: "#FA444E", color: "white", width: "200px" }}
          onClick={() => handleNavigate("medical-record")}
        >
          Médico
        </Button>
        <Button
          sx={{ backgroundColor: "#FA444E", color: "white", width: "200px" }}
          onClick={() => handleNavigate("nursing-record")}
        >
          Enfermagem
        </Button>
        <Button
          sx={{ backgroundColor: "#FA444E", color: "white", width: "200px" }}
          onClick={() => handleNavigate("nutrition-record")}
        >
          Nutrição
        </Button>
        <Button
          sx={{ backgroundColor: "#FA444E", color: "white", width: "200px" }}
          onClick={() => handleNavigate("psychology-record")}
        >
          Psicológia
        </Button>
      </div>
    </div>
  );
}

export default PatientInformation;

