import { Alert, Button, CircularProgress, Snackbar, type AlertColor, type SnackbarCloseReason } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { recordStyles, stylesContainer, TitleStyles } from "./styles";
import { useCallback, useEffect, useState } from "react";

interface PatientData {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
}

const PatientInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = location.state || {};
  const delay = 3000;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<PatientData | null>(null);

  const showSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = (reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Se acessar direto sem patientId
  useEffect(() => {
    if (!patientId) {
      showSnackbar("Você precisa selecionar o paciente", "warning");
      setTimeout(() => {
        navigate("/patients");
      }, delay);
    }
  }, [patientId, navigate, showSnackbar]);

  // Buscar dados do paciente
  useEffect(() => {
    if (patientId) {
      const fetchPatient = async () => {
        try {
          setLoading(true);
          // Aqui seria seu fetch real:
          // const response = await api.get(`/patients/${patientId}`);
          // setPatient(response.data);

          // Simulação de fetch com delay
          setTimeout(() => {
            setPatient({
              id: patientId,
              name: "José da Silva",
              cpf: "123.456.789-00",
              birthDate: "01/01/1970"
            });
            setLoading(false);
          }, 1500);
        } catch (error) {
          console.error(error);
          showSnackbar("Erro ao buscar dados do paciente", "error");
          setLoading(false);
        }
      };

      fetchPatient();
    }
  }, [patientId, showSnackbar]);

  const handleNavigate = (record: string) => {
    navigate(`/patient/information/${record}`, {
      state: { patientId }
    });
  };

  if (loading) {
    return (
      <div css={stylesContainer} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div css={stylesContainer}>
      {patient && (
        <>
          <h1 css={TitleStyles}>{patient.name}</h1>
          <p>CPF: {patient.cpf}</p>
          <p>Data de nascimento: {patient.birthDate}</p>
        </>
      )}

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
          Psicologia
        </Button>
      </div>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={(_, reason) => handleSnackbarClose(reason as SnackbarCloseReason)}
      >
        <Alert
          onClose={() => handleSnackbarClose("clickaway")}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PatientInformation;
