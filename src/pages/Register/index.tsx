import { css } from "@emotion/react";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, type PatientFormInputs } from '../../schemas/patientSchema';
import { useForm, Controller } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";
import { useEffect } from "react";
import { calculateAge } from "../../utils/dateCalculations";

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

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(patientSchema),
    mode: "onBlur",
    defaultValues: {
      // Campos de texto vazios por padrão
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

      // Campos de radio com defaultValues específicos
      podeAjudarCozinha: "nao",
      acompanhanteResponsavel: "sim",
      condicaoChegada: "de_ambulancia",
      usoSonda: "nao",
      usoCurativo: "sim",
      usoOxigenoterapia: "nao",
    }
  });

  // Success 
  const onSubmit = (data: PatientFormInputs) => {
    console.log("Formulário Válido, Dados:", data);
    alert("Formulário submetido com sucesso! Veja o console para os dados.");
  };

  const onError = (errors: FieldErrors<PatientFormInputs>) => {
    console.log("Erros de validação:", errors);
    alert("Por favor, corrija os erros no formulário.");
  };

  // Watch: propriedades que serão monitoradas
  const dataNascimentoValue = watch("dataNascimento");
  const usoSondaValue = watch("usoSonda");

  // Efeito para calcular e preencher a idade automaticamente
  useEffect(() => {
    const age = calculateAge(dataNascimentoValue);
    if (age !== null) {
      setValue("idade", String(age), { shouldValidate: true });
    } else {
      setValue("idade", "", { shouldValidate: true });
    }
  }, [dataNascimentoValue, setValue]);

  return (
    <>
      <div css={headerContainer}>
        <h1 css={TitleStyles}>Cadastrar Paciente</h1> {/* Título ajustado conforme a imagem */}

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: '0 26px', maxWidth: '1200px' }}> {/* maxWidth para o formulário não ficar excessivamente largo em monitores grandes */}

            {/* Certificar de que cada `name` nos `register` ou `Controller` corresponde a uma propriedade no `patientSchema` */}

            {/* PRIMEIRA LINHA: Nome Completo e CPF */}
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                id="nome-completo-paciente"
                label="Nome completo do paciente"
                variant="outlined"
                fullWidth
                placeholder="Digite o nome completo do paciente"
                {...register("nomeCompletoPaciente")}
                error={!!errors.nomeCompletoPaciente}
                helperText={errors.nomeCompletoPaciente?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}> {/* CPF: 12 colunas em xs, 4 em md+ */}
              <TextField
                id="cpf-paciente"
                label="CPF"
                variant="outlined"
                fullWidth
                placeholder="000.000.000-00"
                {...register("cpfPaciente")}
                error={!!errors.cpfPaciente}
                helperText={errors.cpfPaciente?.message}
              />
            </Grid>

            {/* SEGUNDA LINHA: Data de Nascimento, Idade, Naturalidade, RG */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="data-nascimento"
                label="Data de Nascimento"
                variant="outlined"
                fullWidth
                placeholder="00/00/0000"
                {...register("dataNascimento")}
                error={!!errors.dataNascimento}
                helperText={errors.dataNascimento?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                id="idade"
                label="Idade"
                variant="outlined"
                fullWidth
                {...register("idade")}
                error={!!errors.idade}
                helperText={errors.idade?.message}
                disabled
                InputLabelProps={{
                  shrink: true, // Isso força a label a ir para cima
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="naturalidade"
                label="Naturalidade"
                variant="outlined"
                fullWidth
                placeholder="Brasileiro"
                {...register("naturalidade")}
                error={!!errors.naturalidade}
                helperText={errors.naturalidade?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                id="rg"
                label="RG"
                variant="outlined"
                fullWidth
                placeholder="00.000.000-00"
                {...register("rg")}
                error={!!errors.rg}
                helperText={errors.rg?.message}
              />
            </Grid>

            {/* TERCEIRA LINHA: Nome da Mãe e Profissão */}
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                id="nome-mae"
                label="Nome da Mãe"
                variant="outlined"
                fullWidth
                placeholder="Digite o nome da mãe do paciente"
                {...register("nomeMae")}
                error={!!errors.nomeMae}
                helperText={errors.nomeMae?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                id="profissao"
                label="Profissão"
                variant="outlined"
                fullWidth
                placeholder="Digite a profissão do paciente"
                {...register("profissao")}
                error={!!errors.profissao}
                helperText={errors.profissao?.message}
              />
            </Grid>

            {/* QUARTA LINHA: Telefone, CEP, Endereço */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                id="telefone"
                label="Telefone"
                variant="outlined"
                fullWidth
                placeholder="00 00000-0000"
                {...register("telefone")}
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="cep"
                label="CEP"
                variant="outlined"
                fullWidth
                placeholder="00.000-000"
                {...register("cep")}
                error={!!errors.cep}
                helperText={errors.cep?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                id="endereco"
                label="Endereço"
                variant="outlined"
                fullWidth
                placeholder="Rua 5"
                {...register("endereco")}
                error={!!errors.endereco}
                helperText={errors.endereco?.message}
              />
            </Grid>

            {/* QUINTA LINHA: Bairro, Número, Complemento */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                id="bairro"
                label="Bairro"
                variant="outlined"
                fullWidth
                placeholder="Primavera"
                {...register("bairro")}
                error={!!errors.bairro}
                helperText={errors.bairro?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="numero"
                label="Número"
                variant="outlined"
                fullWidth
                placeholder="000"
                {...register("numero")}
                error={!!errors.numero}
                helperText={errors.numero?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                id="complemento"
                label="Complemento"
                variant="outlined"
                fullWidth
                placeholder="Bloco 5, Ap 03"
                {...register("complemento")}
                error={!!errors.complemento}
                helperText={errors.complemento?.message}
              />
            </Grid>

            {/* SEXTA LINHA: Acompanhante e CPF do acompanhante */}
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                id="acompanhante"
                label="Acompanhante"
                variant="outlined"
                fullWidth
                placeholder="Digite o nome do acompanhante do paciente"
                {...register("acompanhante")}
                error={!!errors.acompanhante}
                helperText={errors.acompanhante?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                id="cpf-acompanhante"
                label="CPF do acompanhante"
                variant="outlined"
                fullWidth
                placeholder="000.000.000-00"
                {...register("cpfAcompanhante")}
                error={!!errors.cpfAcompanhante}
                helperText={errors.cpfAcompanhante?.message}
              />
            </Grid>

            {/* SÉTIMA LINHA: Telefone do acompanhante, CEP do acompanhante, Endereço do acompanhante */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                id="telefone-acompanhante"
                label="Telefone do acompanhante"
                variant="outlined"
                fullWidth
                placeholder="00 00000-0000"
                {...register("telefoneAcompanhante")}
                error={!!errors.telefoneAcompanhante}
                helperText={errors.telefoneAcompanhante?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="cep-acompanhante"
                label="CEP do acompanhante"
                variant="outlined"
                fullWidth
                placeholder="00.000-000"
                {...register("cepAcompanhante")}
                error={!!errors.cepAcompanhante}
                helperText={errors.cepAcompanhante?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                id="endereco-acompanhante"
                label="Endereço do acompanhante"
                variant="outlined"
                fullWidth
                placeholder="Rua 5"
                {...register("enderecoAcompanhante")}
                error={!!errors.enderecoAcompanhante}
                helperText={errors.enderecoAcompanhante?.message}
              />
            </Grid>

            {/* OITAVA LINHA: Bairro, Número, Complemento do acompanhante */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                id="bairro-acompanhante"
                label="Bairro"
                variant="outlined"
                fullWidth
                placeholder="Primavera"
                {...register("bairroAcompanhante")}
                error={!!errors.bairroAcompanhante}
                helperText={errors.bairroAcompanhante?.message}

              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                id="numero-acompanhante"
                label="Número"
                variant="outlined"
                fullWidth
                placeholder="000"
                {...register("numeroAcompanhante")}
                error={!!errors.numeroAcompanhante}
                helperText={errors.numeroAcompanhante?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                id="complemento-acompanhante"
                label="Complemento"
                variant="outlined"
                fullWidth
                placeholder="Bloco 5, Ap 03"
                {...register("complementoAcompanhante")}
                error={!!errors.complementoAcompanhante}
                helperText={errors.complementoAcompanhante?.message}
              />
            </Grid>

            {/* Vínculo com o paciente */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="vinculo-paciente"
                label="Vínculo com o paciente"
                variant="outlined"
                fullWidth
                placeholder="Filho"
                {...register("vinculoPaciente")}
                error={!!errors.vinculoPaciente}
                helperText={errors.vinculoPaciente?.message}
              />
            </Grid>

            {/* Pode ajudar na cozinha? */}
            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl component="fieldset" error={!!errors.podeAjudarCozinha}>
                <FormLabel component="legend">Pode ajudar na cozinha?</FormLabel>
                <Controller
                  name="podeAjudarCozinha"
                  control={control}
                  defaultValue="nao"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="nao" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
                {errors.podeAjudarCozinha && (
                  <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                    {errors.podeAjudarCozinha.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            {/* O acompanhante é responsável pelo paciente? */}
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset" error={!!errors.acompanhanteResponsavel}>
                <FormLabel component="legend">O acompanhante é responsável pelo paciente?</FormLabel>
                <Controller
                  name="acompanhanteResponsavel"
                  control={control}
                  defaultValue="nao"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="nao" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
                {errors.acompanhanteResponsavel && (
                  <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                    {errors.acompanhanteResponsavel.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            {/* Condição de chegada */}
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset" error={!!errors.condicaoChegada}>
                <FormLabel component="legend">Condição de chegada</FormLabel>
                <Controller
                  name="condicaoChegada"
                  control={control}
                  defaultValue="nenhum"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="de_ambulancia" control={<Radio />} label="De ambulância" />
                      <FormControlLabel value="maca" control={<Radio />} label="Maca" />
                      <FormControlLabel value="cadeira_rodas" control={<Radio />} label="Cadeira de Rodas" />
                      <FormControlLabel value="nenhum" control={<Radio />} label="Nenhuma da opções" />
                    </RadioGroup>
                  )}
                />
                {errors.condicaoChegada && (
                  <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                    {errors.condicaoChegada.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            {/* Tratamento e Diagnóstico */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="tratamento"
                label="Tratamento"
                variant="outlined"
                fullWidth
                placeholder="Tratamento"
                multiline
                rows={2}
                {...register("tratamento")}
                error={!!errors.tratamento}
                helperText={errors.tratamento?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="diagnostico"
                label="Diagnóstico"
                variant="outlined"
                fullWidth
                placeholder="Diagnóstico"
                multiline
                rows={2}
                {...register("diagnostico")}
                error={!!errors.diagnostico}
                helperText={errors.diagnostico?.message}
              />
            </Grid>

            {/* Faz uso de sonda? */}
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset" error={!!errors.usoSonda}>
                <FormLabel component="legend">Faz uso de sonda?</FormLabel>
                <Controller
                  name="usoSonda"
                  control={control}
                  defaultValue="nao"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="nao" control={<Radio />} label="Não" />
                      <FormControlLabel value="sonda_foley" control={<Radio />} label="Sonda Foley" />
                      <FormControlLabel value="cislostomia" control={<Radio />} label="Cislostomia" />
                      <FormControlLabel value="outra" control={<Radio />} label="Outra" />
                    </RadioGroup>
                  )}
                />
                {errors.usoSonda && (
                  <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                    {errors.usoSonda.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                id="se-for-outra"
                label="Se for outra:"
                variant="outlined"
                fullWidth
                placeholder="Descreva"
                {...register("seForOutra")}
                error={!!errors.seForOutra}
                helperText={errors.seForOutra?.message}
                disabled={usoSondaValue !== 'outra'} // Desabilita o campo se não for "outra"
              />
            </Grid>

            {/* Faz uso de curativo? */}
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset" error={!!errors.usoCurativo}>
                <FormLabel component="legend">Faz uso de curativo?</FormLabel>
                <Controller
                  name="usoCurativo"
                  control={control}
                  defaultValue="nao"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="nao" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
                {errors.usoCurativo && (
                  <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                    {errors.usoCurativo.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            {/* Faz uso de oxigenoterapia? */}
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset" error={!!errors.usoOxigenoterapia}>
                <FormLabel component="legend">Faz uso de oxigenoterapia?</FormLabel>
                <Controller
                  name="usoOxigenoterapia"
                  control={control}
                  defaultValue="nao"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                      <FormControlLabel value="nao" control={<Radio />} label="Não" />
                    </RadioGroup>
                  )}
                />
                {errors.usoOxigenoterapia && (
                  <span style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>
                    {errors.usoOxigenoterapia.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            {/* Botões Salvar e Cancelar */}
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, mb: 4 }}>
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
          </Grid>
        </form>
      </div>
    </>
  );
}

export default Register;