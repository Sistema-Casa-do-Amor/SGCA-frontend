import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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

const buttonStyles = css({

});

const Register = () => {
  return (
    <>
      <div css={headerContainer}>
        <h1 css={TitleStyles}>Cadastro</h1>
        <Button
          component={Link}
          to="/patients"
          variant="contained"
          css={buttonStyles}
        >
          Voltar
        </Button>
      </div>
    </>
  );
}

export default Register;