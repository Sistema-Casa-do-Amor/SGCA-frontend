import { Grid, TextField } from "@mui/material";
import { type UseFormRegister, type FieldErrors, type UseFormWatch, type UseFormSetValue } from "react-hook-form";
import type { PatientFormInputs } from "../../schemas/patientSchema";
import { useEffect } from "react";
import { calculateAge } from "../../utils/dateCalculations";

// Definição da interface de props para este componente
interface PatientPersonalDataFormProps {
  register: UseFormRegister<PatientFormInputs>;
  errors: FieldErrors<PatientFormInputs>;
  watch: UseFormWatch<PatientFormInputs>; // Necessário para assistir `dataNascimento`
  setValue: UseFormSetValue<PatientFormInputs>; // Necessário para setar `idade`
  handleCepSearch: (cep: string, targetFieldPrefix: "" | "acompanhante") => Promise<void>;
}

const PatientPersonalDataForm = (
  {
    register,
    errors,
    watch,
    setValue,
    handleCepSearch,
  }: PatientPersonalDataFormProps
) => {

  const dataNascimentoValue = watch("dataNascimento");

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
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: '0 26px', maxWidth: '1200px' }}>

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
              shrink: true,
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
            {...register("cep", {
              onBlur: (e) => handleCepSearch(e.target.value, ""), // <-- Dispara a busca ao perder o foco
            })}
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PatientPersonalDataForm;
