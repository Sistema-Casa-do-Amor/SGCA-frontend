import { css } from "@emotion/react";
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import TablePatients from "../../components/Table/TablePatients";

const headerContainer = css({
  display: "flex",
  alignItems: "center",
  flexDirection: 'column',
  position: "relative",
  minHeight: "56px",
  marginTop: "24px",
  marginBottom: "24px",
  paddingBottom: "15px",
  width: '80%', 
});

const TitleStyles = css({
  fontSize: "24px",
  color: "#000",
  fontWeight: "600",
  textAlign: "center",
  marginBottom: '16px'
});

const buttonStyles = css({
  width: '20%',
  backgroundColor: "#000",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const searchContainer = css({
  display: "flex",
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
  width: '100%'
});

const Patients = () => {
  return (
    <>
      <div css={headerContainer}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h1" css={TitleStyles}>
            Pacientes
          </Typography>
        </Box>

        <Box css={searchContainer}>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="search">Buscar Paciente</InputLabel>
            <Input id="search" 
              type="search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            component={Link}
            to="/patient/register"
            variant="contained"
            css={buttonStyles}
          >
            Adicionar
          </Button>
        </Box>
      <TablePatients />
      </div >
      {/* ...restante do conteúdo... */}
    </>
  );
};



export default Patients;

