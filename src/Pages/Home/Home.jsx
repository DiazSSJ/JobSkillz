import React from "react";
import "../Home/Home.css";
import NavbarHome from "../../Components/NavbarHome";
import Card from "../../Components/Card";
import Chatbot from "../../Resources/comunicacion.png"
import Recognition from "../../Resources/reconocimiento.png"

const Home = () => {
  return (
    <div className="container-home">
      <NavbarHome />
      <div className="titles">
        <h1 style={{ fontSize: "54px" }}>
          Potencia y eleva tus <br />
          entrevistas
        </h1>
        <p style={{ fontSize: "20px" }}>
          Practica y mejora tus habilidades de <br />
          manera efectiva simulando entrevistas <br />
          laborales con retroalimentación al instante.
        </p>
      </div>
      <div className="cartas">
        <div>
          <Card
          icon = {Chatbot}
          title = "Chatbot"
          text = "Utiliza el poder de la IA para practicar tus respuestas a algunas preguntas auto generadas especialmente para ti."
          button_text = 'Preguntame'
          action_button = '/Chat'
          estilo={{ marginTop: '1.6rem' }}
           />
        </div>
        <div>
          <Card 
           icon = {Recognition}
           title = "Reconocimiento"
           text = "Con nuestra opción de reconocimiento facial, verifica si estas preparado y tienes todo lo necesario para dar la mejor impresión en tu entrevista."
           button_text = 'Reconoceme'
           action_button = '/Recognition'
           />
        </div>
      </div>
    </div>
  );
};

export default Home;
