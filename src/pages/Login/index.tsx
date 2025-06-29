import { Box, Button, Container, IconButton, InputAdornment, TextField } from "@mui/material";
import { BoxStyles, ButtonStyles, ContainerLoginStyles, imgStyles, TextFieldStyles } from "./styles";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    // Lógica de login aqui (chamar a função login do AuthContext, por exemplo)
  };

  return (
    <Box css={BoxStyles}>
      <Container css={ContainerLoginStyles}>
        <img
          src="casadoamor.png"
          alt="Logo Casa do Amor"
          css={imgStyles}
        />

        {/* Campo de Username */}
        <TextField
          label="Nome"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          css={TextFieldStyles} // Passa o tema para a função de estilo
        />

        {/* Campo de Password */}
        <TextField
          label="Senha"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          css={TextFieldStyles}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}

        />
        <Button
          variant="contained"
          css={ButtonStyles}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Container>
    </Box>
  )
};

export default Login;