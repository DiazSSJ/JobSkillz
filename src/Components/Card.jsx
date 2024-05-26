import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Avatar from "@mui/material/Avatar";
import "./Card.css";

function Card({ icon, title, text, button_text, action_button, estilo }) {
  return (
    <div className="card" style={{ width: "18rem", borderRadius: "20px", height:"20rem" }}>
      <div style={{ margin: "2vh", marginBottom: "0"}}>
        <Avatar
        className="Avatar"
        src={icon}
        sx={{ width: 70, height: 70, backgroundColor:"#D9D9D9" }}
      />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <a href={action_button} className="btn boton" style={estilo}>
          {button_text}
        </a>
      </div>
    </div>
  );
}

export default Card;
