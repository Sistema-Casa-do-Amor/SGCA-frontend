import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { type UseFormRegister, type FieldErrors, Controller } from "react-hook-form";
import type { PatientFormInputs } from "../../schemas/patientSchema";
import type { Control } from "react-hook-form";
import MaskedTextField from "../common/MaskedTextField";

interface AcompanhanteFormProps {
  register: UseFormRegister<PatientFormInputs>;
  errors: FieldErrors<PatientFormInputs>;
  handleCepSearch: (cep: string, targetFieldPrefix: "" | "acompanhante") => Promise<void>;
  control: Control<PatientFormInputs>;
}

const AcompanhanteForm = (
  {
    register,
    errors,
    handleCepSearch,
    control,
  }: AcompanhanteFormProps
) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: '26px', maxWidth: '1200px' }}>
      {/* SEXTA LINHA: Acompanhante e CPF do acompanhante */}
      < Grid size={{ xs: 12, md: 8 }
      }>
        <TextField
          id="acompanhante"
          label="Acompanhante"
          variant="outlined"
          fullWidth
          placeholder="Digite o nome do acompanhante do paciente"
          {...register("acompanhante")}
          error={!!errors.acompanhante}
          helperText={errors.acompanhante?.message}
          FormHelperTextProps={{
            sx: {
              maxHeight: '0.4em',
              margin: '0 0.2em', // Zera a margem inferior padrão
            },
          }}
        />
      </Grid >
      <Grid size={{ xs: 12, md: 4 }}>
        <Controller
          name="cpfAcompanhante"
          control={control}
          render={({ field }) => (
            <MaskedTextField
              {...field}
              id="cpf-acompanhante"
              label="CPF"
              variant="outlined"
              fullWidth
              placeholder="000.000.000-00"
              error={!!errors.cpfAcompanhante}
              helperText={errors.cpfAcompanhante?.message}
              mask="000.000.000-00"
              lazy={true}
            />
          )}
        />
      </Grid>

      {/* SÉTIMA LINHA: Telefone do acompanhante, CEP do acompanhante, Endereço do acompanhante */}
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <MaskedTextField
              {...field}
              id="telefone-acompanhante"
              label="Telefone"
              variant="outlined"
              fullWidth
              placeholder="(00) 00000-0000"
              error={!!errors.telefoneAcompanhante}
              helperText={errors.telefoneAcompanhante?.message}
              mask="(00) 00000-0000"
              lazy={true}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <MaskedTextField
              {...field}
              id="cep-acompanhante"
              label="CEP"
              variant="outlined"
              fullWidth
              placeholder="00000-000"
              error={!!errors.cepAcompanhante}
              helperText={errors.cepAcompanhante?.message}
              mask="00000-000"
              lazy={true}
              onBlur={(e) => {
                field.onBlur();
                handleCepSearch(e.target.value, "");
              }}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          id="endereco-acompanhante"
          label="Endereço do acompanhante"
          variant="outlined"
          fullWidth
          placeholder="Endereço do acompanhante"
          {...register("enderecoAcompanhante")}
          error={!!errors.enderecoAcompanhante}
          helperText={errors.enderecoAcompanhante?.message}
          InputLabelProps={{ shrink: true }}
          FormHelperTextProps={{
            sx: {
              maxHeight: '0.4em',
              margin: '0 0.2em', // Zera a margem inferior padrão
            },
          }}
        />
      </Grid>

      {/* OITAVA LINHA: Bairro, Número, Complemento do acompanhante */}
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          id="bairro-acompanhante"
          label="Bairro"
          variant="outlined"
          fullWidth
          placeholder="Bairro"
          {...register("bairroAcompanhante")}
          error={!!errors.bairroAcompanhante}
          helperText={errors.bairroAcompanhante?.message}
          InputLabelProps={{ shrink: true }}
          FormHelperTextProps={{
            sx: {
              maxHeight: '0.4em',
              margin: '0 0.2em', // Zera a margem inferior padrão
            },
          }}
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
          FormHelperTextProps={{
            sx: {
              maxHeight: '0.4em',
              margin: '0 0.2em', // Zera a margem inferior padrão
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <TextField
          id="complemento-acompanhante"
          label="Complemento"
          variant="outlined"
          fullWidth
          placeholder="Complemento"
          {...register("complementoAcompanhante")}
          error={!!errors.complementoAcompanhante}
          helperText={errors.complementoAcompanhante?.message}
          InputLabelProps={{ shrink: true }}
          FormHelperTextProps={{
            sx: {
              maxHeight: '0.4em',
              margin: '0 0.2em', // Zera a margem inferior padrão
            },
          }}
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
          FormHelperTextProps={{
            sx: {
              maxHeight: '0.4em',
              margin: '0 0.2em', // Zera a margem inferior padrão
            },
          }}
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
    </Grid>
  )
}

export default AcompanhanteForm;