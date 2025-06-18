import { css } from "@emotion/react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const headerContainer = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
  minHeight: "56px",
  marginTop: "24px",
  marginBottom: "24px",
});

const TitleStyles = css({
  position: "absolute",
  left: "45%",
  transform: "translateX(-50%)",
  fontSize: "24px",
  color: "#000",
  fontWeight: "600",
  textAlign: "center",
  margin: 0,
});

const buttonStyles = css({
  marginLeft: "86%",
  backgroundColor: "#000",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const Users = () => {
  return (
    <>
      <div css={headerContainer}>
        <h1 css={TitleStyles}>Profissionais</h1>
        {/* Esse botão só deverá aparecer se o users tiver permissão */}
        <Button
          component={Link}
          to="/user/register"
          variant="contained"
          css={buttonStyles}
        >
          Adicionar
        </Button>
      </div>
      {/* ...restante do conteúdo... */}
    </>
  );
};

export default Users;

