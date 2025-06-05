import { Button, type AlertColor } from "@mui/material";
import Grid from '@mui/material/Grid';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { fetchAddressByCep } from "../../utils/cepService";
import RegisterCompanionForm from "../../components/RegisterCompanionForm";
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { companionSchema, type CompanionFormInputs } from "../../schemas/companionSchema";
import { buttonStyles, headerContainer, saveButtonStyles, TitleStyles } from "../PatientRegister/styles";
import ConfirmationDialog from "../../components/ConfirmationDialog";

const CompanionRegisterPage = () => {
  const navigate = useNavigate();

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

  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleOpenSaveDialog = () => {
    handleSubmit(() => setOpenSaveDialog(true), onError)();
  };
  const handleCloseSaveDialog = () => setOpenSaveDialog(false);

  const handleOpenCancelDialog = () => setOpenCancelDialog(true);
  const handleCloseCancelDialog = () => setOpenCancelDialog(false);
  const handleConfirmCancel = () => {
    setOpenCancelDialog(false);
    navigate('/patients');
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
  } = useForm<CompanionFormInputs>({
    resolver: zodResolver(companionSchema), // Corrected schema name
    mode: "onBlur",
    defaultValues: {
      acompanhanteNome: "",
      cpfAcompanhante: "",
      telefoneAcompanhante: "",
      cepAcompanhante: "",
      enderecoAcompanhante: "",
      bairroAcompanhante: "",
      numeroAcompanhante: "",
      complementoAcompanhante: "",
      vinculoPaciente: "",
      podeAjudarCozinha: "nao",
      acompanhanteResponsavel: "sim",
    }
  });

  const cepAcompanhanteValue = watch("cepAcompanhante");

  const handleCepSearch = useCallback(async (cep: string, targetFieldPrefix: "acompanhante") => {
    clearErrors(`${targetFieldPrefix}cep` as keyof CompanionFormInputs);
    setValue(`${targetFieldPrefix}endereco` as keyof CompanionFormInputs, "");
    setValue(`${targetFieldPrefix}bairro` as keyof CompanionFormInputs, "");
    setValue(`${targetFieldPrefix}complemento` as keyof CompanionFormInputs, "");

    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      try {
        const addressData = await fetchAddressByCep(cleanedCep);
        if (addressData) {
          setValue(`${targetFieldPrefix}endereco` as keyof CompanionFormInputs, addressData.logradouro);
          setValue(`${targetFieldPrefix}bairro` as keyof CompanionFormInputs, addressData.bairro);
          setValue(`${targetFieldPrefix}complemento` as keyof CompanionFormInputs, addressData.complemento || "");
        } else {
          setError(`${targetFieldPrefix}cep` as keyof CompanionFormInputs, {
            type: "manual",
            message: "CEP não encontrado ou inválido."
          });
          showSnackbar("CEP não encontrado ou inválido.", "warning");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        setError(`${targetFieldPrefix}cep` as keyof CompanionFormInputs, {
          type: "manual",
          message: "Erro ao buscar CEP. Tente novamente."
        });
        showSnackbar("Erro ao buscar CEP. Tente novamente.", "error");
      }
    } else if (cleanedCep.length > 0 && cleanedCep.length < 8) {
      setValue(`${targetFieldPrefix}endereco` as keyof CompanionFormInputs, "");
      setValue(`${targetFieldPrefix}bairro` as keyof CompanionFormInputs, "");
      setValue(`${targetFieldPrefix}complemento` as keyof CompanionFormInputs, "");
    }
  }, [setValue, setError, clearErrors, showSnackbar]);

  useEffect(() => {
    if (cepAcompanhanteValue && cepAcompanhanteValue.replace(/\D/g, '').length === 8) {
      handleCepSearch(cepAcompanhanteValue, "acompanhante");
    }
  }, [cepAcompanhanteValue, handleCepSearch]);

  const handleSaveCompanion = async (data: CompanionFormInputs) => {
    console.log("Formulário Válido, Dados do Acompanhante:", data);
    try {
      // **AQUI: Faça a chamada API para salvar o acompanhante.**
      // Ex: await someApiService.createCompanion(data);
      setOpenSaveDialog(false);
      showSnackbar("Acompanhante cadastrado com sucesso!", "success");
      setTimeout(() => {
        navigate('/patients');
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar acompanhante:", error);
      showSnackbar("Erro ao cadastrar acompanhante. Tente novamente.", "error");
    }
  };

  const onError = (errors: FieldErrors<CompanionFormInputs>) => {
    console.log("Erros de validação do Acompanhante:", errors);
    showSnackbar("Por favor, corrija os erros no formulário do acompanhante.", "error");
    setOpenSaveDialog(false);
  };

  const handleConfirmSave = handleSubmit(handleSaveCompanion, onError);

  return (
    <div css={headerContainer}>
      <h1 css={TitleStyles}>Cadastrar Acompanhante</h1>

      <form
        onSubmit={handleConfirmSave}
        noValidate
      >
        <RegisterCompanionForm
          register={register}
          errors={errors}
          watch={watch}
          control={control}
          handleCepSearch={handleCepSearch}
        />

        {/* Buttons for Save/Cancel on Companion Form */}
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, ml: 3 }}>
          <Button
            variant="contained"
            css={[buttonStyles, saveButtonStyles]}
            onClick={handleOpenSaveDialog}
          >
            Salvar Acompanhante
          </Button>
          <Button
            variant="contained"
            onClick={handleOpenCancelDialog}
            css={[buttonStyles, { backgroundColor: 'grey.500' }]}
          >
            Não Cadastrar Acompanhante
          </Button>
        </Grid>
      </form>

      {/* Snackbar Component */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openSaveDialog}
        onClose={handleCloseSaveDialog}
        onConfirm={handleConfirmSave} // Use the combined submit/save function
        title="Confirmar Salvamento do Acompanhante"
        message="Tem certeza que deseja salvar os dados do acompanhante?"
        confirmButtonText="Sim, Salvar"
        cancelButtonText="Não, Voltar"
      />

      {/* Diálogo de Confirmação para Não Cadastrar/Cancelar */}
      <ConfirmationDialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        onConfirm={handleConfirmCancel}
        title="Não Cadastrar Acompanhante"
        message="Tem certeza que não quer cadastrar um acompanhante para este paciente? Você pode adicioná-lo depois."
        confirmButtonText="Sim, Não Cadastrar"
        cancelButtonText="Voltar e Cadastrar"
      />
    </div>
  )
}

export default CompanionRegisterPage;