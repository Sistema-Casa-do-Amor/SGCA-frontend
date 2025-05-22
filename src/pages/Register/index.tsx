import { css } from "@emotion/react";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; // Importe o Grid2 para a nova sintaxe!

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
  // Você precisará de estados para gerenciar os valores dos RadioGroups e TextFields
  // Por exemplo:
  // const [vinculoPaciente, setVinculoPaciente] = useState('');
  // const [ajudaCozinha, setAjudaCozinha] = useState('');
  // ... e assim por diante.
  return (
    <>
      <div css={headerContainer}>
        <h1 css={TitleStyles}>Cadastrar Paciente</h1> {/* Título ajustado conforme a imagem */}

        {/* Grid container para todo o formulário */}
        {/* spacing={{ xs: 2, md: 3 }} para um bom espaçamento entre os campos */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: '0 26px', maxWidth: '1200px' }}> {/* Adicionei maxWidth para o formulário não ficar excessivamente largo em monitores grandes */}

          {/* PRIMEIRA LINHA: Nome Completo e CPF */}
          <Grid size={{ xs: 12, md: 8 }}> {/* Nome completo: 12 colunas em xs, 8 em md+ */}
            <TextField id="nome-completo-paciente" label="Nome completo do paciente" variant="outlined" fullWidth placeholder="Digite o nome completo do paciente" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}> {/* CPF: 12 colunas em xs, 4 em md+ */}
            <TextField id="cpf-paciente" label="CPF" variant="outlined" fullWidth placeholder="000.000.000-00" />
          </Grid>

          {/* SEGUNDA LINHA: Data de Nascimento, Idade, Naturalidade, RG */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* Data de Nascimento: 12 em xs, 6 em sm, 3 em md+ */}
            <TextField id="data-nascimento" label="Data de Nascimento" variant="outlined" fullWidth placeholder="00/00/0000" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}> {/* Idade: 12 em xs, 6 em sm, 2 em md+ */}
            <TextField id="idade" label="Idade" variant="outlined" fullWidth placeholder="00" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* Naturalidade: 12 em xs, 6 em sm, 4 em md+ */}
            <TextField id="naturalidade" label="Naturalidade" variant="outlined" fullWidth placeholder="Brasileiro" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}> {/* RG: 12 em xs, 6 em sm, 3 em md+ */}
            <TextField id="rg" label="RG" variant="outlined" fullWidth placeholder="00.000.000-00" />
          </Grid>

          {/* TERCEIRA LINHA: Nome da Mãe e Profissão */}
          <Grid size={{ xs: 12, md: 8 }}> {/* Nome da Mãe: 12 em xs, 6 em md+ */}
            <TextField id="nome-mae" label="Nome da Mãe" variant="outlined" fullWidth placeholder="Digite o nome da mãe do paciente" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}> {/* Profissão: 12 em xs, 6 em md+ */}
            <TextField id="profissao" label="Profissão" variant="outlined" fullWidth placeholder="Digite a profissão do paciente" />
          </Grid>

          {/* QUARTA LINHA: Telefone, CEP, Endereço */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}> {/* Telefone: 12 em xs, 6 em sm, 4 em md+ */}
            <TextField id="telefone" label="Telefone" variant="outlined" fullWidth placeholder="00 00000-0000" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* CEP: 12 em xs, 6 em sm, 3 em md+ */}
            <TextField id="cep" label="CEP" variant="outlined" fullWidth placeholder="00.000-000" />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}> {/* Endereço: 12 em xs, 5 em md+ */}
            <TextField id="endereco" label="Endereço" variant="outlined" fullWidth placeholder="Rua 5" />
          </Grid>

          {/* QUINTA LINHA: Bairro, Número, Complemento */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}> {/* Bairro: 12 em xs, 6 em sm, 4 em md+ */}
            <TextField id="bairro" label="Bairro" variant="outlined" fullWidth placeholder="Primavera" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* Número: 12 em xs, 6 em sm, 3 em md+ */}
            <TextField id="numero" label="Número" variant="outlined" fullWidth placeholder="000" />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}> {/* Complemento: 12 em xs, 5 em md+ */}
            <TextField id="complemento" label="Complemento" variant="outlined" fullWidth placeholder="Bloco 5, Ap 03" />
          </Grid>

          {/* SEXTA LINHA: Acompanhante e CPF do acompanhante */}
          <Grid size={{ xs: 12, md: 8 }}> {/* Acompanhante: 12 em xs, 8 em md+ */}
            <TextField id="acompanhante" label="Acompanhante" variant="outlined" fullWidth placeholder="Digite o nome do acompanhante do paciente" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}> {/* CPF do acompanhante: 12 em xs, 4 em md+ */}
            <TextField id="cpf-acompanhante" label="CPF do acompanhante" variant="outlined" fullWidth placeholder="000.000.000-00" />
          </Grid>

          {/* SÉTIMA LINHA: Telefone do acompanhante, CEP do acompanhante, Endereço do acompanhante */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}> {/* Telefone do acompanhante: 12 em xs, 6 em sm, 4 em md+ */}
            <TextField id="telefone-acompanhante" label="Telefone do acompanhante" variant="outlined" fullWidth placeholder="00 00000-0000" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* CEP do acompanhante: 12 em xs, 6 em sm, 3 em md+ */}
            <TextField id="cep-acompanhante" label="CEP do acompanhante" variant="outlined" fullWidth placeholder="00.000-000" />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}> {/* Endereço do acompanhante: 12 em xs, 5 em md+ */}
            <TextField id="endereco-acompanhante" label="Endereço do acompanhante" variant="outlined" fullWidth placeholder="Rua 5" />
          </Grid>

          {/* OITAVA LINHA: Bairro, Número, Complemento do acompanhante */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}> {/* Bairro: 12 em xs, 6 em sm, 4 em md+ */}
            <TextField id="bairro-acompanhante" label="Bairro" variant="outlined" fullWidth placeholder="Primavera" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}> {/* Número: 12 em xs, 6 em sm, 3 em md+ */}
            <TextField id="numero-acompanhante" label="Número" variant="outlined" fullWidth placeholder="000" />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}> {/* Complemento: 12 em xs, 5 em md+ */}
            <TextField id="complemento-acompanhante" label="Complemento" variant="outlined" fullWidth placeholder="Bloco 5, Ap 03" />
          </Grid>

          {/* Vínculo com o paciente */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField id="vinculo-paciente" label="Vínculo com o paciente" variant="outlined" fullWidth placeholder="Filho" />
          </Grid>

          {/* Pode ajudar na cozinha? */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Pode ajudar na cozinha?</FormLabel>
              <RadioGroup row name="ajudar-cozinha" defaultValue="nao">
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* O acompanhante é responsável pelo paciente? */}
          <Grid size={{ xs: 12 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">O acompanhante é responsável pelo paciente?</FormLabel>
              <RadioGroup row name="acompanhante-responsavel" defaultValue="sim">
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Condição de chegada */}
          <Grid size={{ xs: 12 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Condição de chegada</FormLabel>
              <RadioGroup row name="condicao-chegada" defaultValue="de_ambulancia">
                <FormControlLabel value="de_ambulancia" control={<Radio />} label="De ambulância" />
                <FormControlLabel value="maca" control={<Radio />} label="Maca" />
                <FormControlLabel value="cadeira_rodas" control={<Radio />} label="Cadeira de rodas" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Faz uso de sonda? */}
          <Grid size={{ xs: 12 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Faz uso de sonda?</FormLabel>
              <RadioGroup row name="uso-sonda" defaultValue="nao">
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
                <FormControlLabel value="sonda_foley" control={<Radio />} label="Sonda Foley" />
                <FormControlLabel value="cislostomia" control={<Radio />} label="Cislostomia" />
                <FormControlLabel value="outra" control={<Radio />} label="Outra" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Se for outra: (condicional) */}
          <Grid size={{ xs: 12 }}>
            {/* Vai de um estado para controlar a visibilidade deste campo,
                ex: if (usoSonda === 'outra') { ... } */}
            <TextField id="se-for-outra" label="Se for outra:" variant="outlined" fullWidth placeholder="Outra" />
          </Grid>

          {/* Faz uso de curativo? */}
          <Grid size={{ xs: 12 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Faz uso de curativo?</FormLabel>
              <RadioGroup row name="uso-curativo" defaultValue="sim">
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Faz uso de oxigenoterapia? */}
          <Grid size={{ xs: 12 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Faz uso de oxigenoterapia?</FormLabel>
              <RadioGroup row name="uso-oxigenoterapia" defaultValue="nao">
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
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
              type="submit" // Adicionar type="submit" para o botão de salvar -> POST de rota de cadastro
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Register;