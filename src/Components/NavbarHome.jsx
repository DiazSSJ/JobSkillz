import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Logo from "../Resources/JobSkillz_logo_nombre.svg";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import "./NavbarHome.css";

const NavbarHome = () => {
  const navigate = useNavigate();

  const handleTipsClick = () => {
    navigate("/Tips");
  };

  return (
    <AppBar
      sx={{ color: "black", backgroundColor: "#D9D9D9", opacity: "0.8" }}
      position="static"
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={Logo} alt="logo" style={{ height: "3vw" }} />
        </IconButton>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, fontFamily: "MiTipografia", fontWeight: "bold" }}
          component="div"
        >
          JOBSKILLZ
        </Typography>
        <IconButton
          edge="end"
          size="small"
          aria-label="menu"
          sx={{ justifySelf: "end" }}
          onClick={handleTipsClick}
        >
          <TipsAndUpdatesIcon style={{ fontSize: 40, color: "610D96" }} size="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarHome;
