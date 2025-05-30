import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, type PatientFormInputs } from '../../schemas/patientSchema';
import { useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { fetchAddressByCep } from "../../utils/cepService";
import PatientPersonalDataForm from "../../components/PatientForm/PatientPersonalDataForm";
import PatientDetailsForm from "../../components/PatientForm/PatientDetailsForm";
import AcompanhanteForm from "../../components/PatientForm/AcompanhanteForm";

const headerContainer = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  minHeight: "56px",
  marginTop: "24px",
  marginBottom: "24px",
});

const TitleStyles = css({
  fontSize: "24px",
  color: "#000",
  fontWeight: "600",
  textAlign: "center",
  margin: 0,
});

// Estilos para os botões de Salvar/Cancelar
const buttonStyles = css({
  '&:not(:last-child)': {
    marginRight: '16px', // Espaço entre os botões
  },
});

const saveButtonStyles = css({
  backgroundColor: '#000', // Cor preta para o botão Salvar
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const cancelButtonStyles = css({
  backgroundColor: '#f44336', // Cor vermelha para o botão Cancelar
  color: '#fff',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

const RegisterPage = () => {
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
    alert("Formulário submetido com sucesso! Veja o console para os dados.");
  };

  const onError = (errors: FieldErrors<PatientFormInputs>) => {
    console.log("Erros de validação:", errors);
    alert("Por favor, corrija os erros no formulário.");
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
    // Adicionar os outros

    if (cep.replace(/\D/g, '').length === 8) { // Só busca se o CEP tiver 8 dígitos
      try {
        const addressData = await fetchAddressByCep(cep);
        if (addressData) {
          setValue(`${targetFieldPrefix}endereco` as keyof PatientFormInputs, addressData.logradouro);
          setValue(`${targetFieldPrefix}bairro` as keyof PatientFormInputs, addressData.bairro);
          setValue("naturalidade", addressData.localidade); // Exemplo: preenchendo naturalidade
          // Adicionar outros

          // Opcional: mover o foco para o campo 'numero'
          // document.getElementById(`${targetFieldPrefix}numero`)?.focus();
        } else {
          // Define um erro se o CEP não for encontrado pela API
          setError(`${targetFieldPrefix}cep` as keyof PatientFormInputs, {
            type: "manual",
            message: "CEP não encontrado ou inválido."
          });
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        setError(`${targetFieldPrefix}cep` as keyof PatientFormInputs, {
          type: "manual",
          message: "Erro ao buscar CEP. Tente novamente."
        });
      }
    }
  }, [setValue, setError, clearErrors]);

  // Efeito para monitorar o CEP do paciente
  useEffect(() => {
    // A busca será acionada quando o campo perder o foco (onBlur)
    // ou você pode acionar ao digitar, mas onBlur é geralmente melhor para APIs
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
        />

        {/* Dados Acompanhante */}
        <AcompanhanteForm
          register={register}
          errors={errors}
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
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, mb: 4, ml: 3 }}>
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
    </div>
  );
}


export default RegisterPage;