import { Button, type AlertColor } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, type PatientFormInputs } from '../../schemas/patientSchema';
import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { fetchAddressByCep } from "../../utils/cepService";
import PatientPersonalDataForm from "../../components/PatientForm/PatientPersonalDataForm";
import PatientDetailsForm from "../../components/PatientForm/PatientDetailsForm";
import AcompanhanteForm from "../../components/PatientForm/AcompanhanteForm";
import { buttonStyles, cancelButtonStyles, headerContainer, saveButtonStyles, TitleStyles } from "./styles";
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const RegisterPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  const showSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = (
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<PatientFormInputs>({
    resolver: zodResolver(patientSchema),
    mode: "onBlur",
    defaultValues: {
      nomeCompletoPaciente: "",
      cpfPaciente: "",
      dataNascimento: "",
      idade: "",
      naturalidade: "",
      rg: "",
      nomeMae: "",
      profissao: "",
      telefone: "",
      cep: "",
      endereco: "",
      bairro: "",
      numero: "",
      complemento: "",
      acompanhante: "",
      cpfAcompanhante: "",
      telefoneAcompanhante: "",
      cepAcompanhante: "",
      enderecoAcompanhante: "",
      bairroAcompanhante: "",
      numeroAcompanhante: "",
      complementoAcompanhante: "",
      tratamento: "",
      diagnostico: "",
      vinculoPaciente: "",
      seForOutra: "",
      podeAjudarCozinha: "nao",
      acompanhanteResponsavel: "sim",
      condicaoChegada: "de_ambulancia",
      usoSonda: "nao",
      usoCurativo: "sim",
      usoOxigenoterapia: "nao",
    }
  });

  const onSubmit = (data: PatientFormInputs) => {
    console.log("Formulário Válido, Dados:", data);
    try {
      // Fazer a chamada API (ex: axios.post('/api/patients', data)) aqui, usar hooks
      // await someApiService.createPatient(data); // Exemplo de chamada API
      showSnackbar("Paciente cadastrado com sucesso!", "success");
      // navigate('/patients');
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      showSnackbar("Erro ao cadastrar paciente. Tente novamente.", "error");
    }
  };

  const onError = (errors: FieldErrors<PatientFormInputs>) => {
    console.log("Erros de validação:", errors);
    showSnackbar("Por favor, corrija os erros no formulário.", "error");
  };

  const cepValue = watch("cep");
  const cepAcompanhanteValue = watch("cepAcompanhante");

  // Função para buscar e preencher o endereço
  const handleCepSearch = useCallback(async (cep: string, targetFieldPrefix: "" | "acompanhante") => {
    // Limpa erros anteriores do CEP
    clearErrors(`${targetFieldPrefix}cep` as keyof PatientFormInputs);
    // Limpa os campos de endereço enquanto a busca ocorre ou se o CEP for inválido
    setValue(`${targetFieldPrefix}endereco` as keyof PatientFormInputs, "");
    setValue(`${targetFieldPrefix}bairro` as keyof PatientFormInputs, "");
    setValue(`${targetFieldPrefix}complemento` as keyof PatientFormInputs, "");

    if (cep.replace(/\D/g, '').length === 8) {
      try {
        const addressData = await fetchAddressByCep(cep);
        if (addressData) {
          setValue(`${targetFieldPrefix}endereco` as keyof PatientFormInputs, addressData.logradouro);
          setValue(`${targetFieldPrefix}bairro` as keyof PatientFormInputs, addressData.bairro);
          setValue(`${targetFieldPrefix}complemento` as keyof PatientFormInputs, addressData.complemento);
        } else {
          setError(`${targetFieldPrefix}cep` as keyof PatientFormInputs, {
            type: "manual",
            message: "CEP não encontrado ou inválido."
          });
          showSnackbar("CEP não encontrado ou inválido.", "warning");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        setError(`${targetFieldPrefix}cep` as keyof PatientFormInputs, {
          type: "manual",
          message: "Erro ao buscar CEP. Tente novamente."
        });
        showSnackbar("Erro ao buscar CEP. Tente novamente.", "error");
      }
    }
  }, [setValue, setError, clearErrors, showSnackbar]);

  // Efeito para monitorar o CEP do paciente
  useEffect(() => {
    // A busca será acionada quando o campo perder o foco (onBlur)
  }, [cepValue, cepAcompanhanteValue, handleCepSearch]);

  return (
    <div css={headerContainer}>
      <h1 css={TitleStyles}>Cadastrar Paciente</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>

        {/* Dados Pessoais */}
        <PatientPersonalDataForm
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          handleCepSearch={handleCepSearch}
          control={control}
        />

        {/* Dados Acompanhante */}
        <AcompanhanteForm
          register={register}
          errors={errors}
          watch={watch}
          handleCepSearch={handleCepSearch}
          control={control}
        />

        {/* Mais detalhes do paciente */}
        <PatientDetailsForm
          register={register}
          errors={errors}
          control={control}
          watch={watch}
        />

        {/* Botões Salvar e Cancelar */}
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, ml: 3 }}>
          <Button
            component={Link}
            to="/patients"
            variant="contained"
            css={[buttonStyles, cancelButtonStyles]}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            css={[buttonStyles, saveButtonStyles]}
            type="submit"
          >
            Salvar
          </Button>
        </Grid>
      </form>

      {/* Snackbar Component */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={(_, reason) => handleSnackbarClose(reason as SnackbarCloseReason)}
      >
        <Alert
          onClose={() => handleSnackbarClose('clickaway')}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}


export default RegisterPage;