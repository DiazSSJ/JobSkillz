import * as React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Chat.css";
import logo from "../../Resources/JobSkillz_logo.svg";
import sendIcon from "../../Resources/enviar.png";
import audioIcon from "../../Resources/microfono.png";
import audiontIcon from "../../Resources/microfono-silencio.png";
import playIcon from "../../Resources/audio.png";
import { useSpeechApi } from "../Chat/SpeechApi";
import deleteIcon from "../../Resources/bote-de-basura.png";
import { getQuestion, getFeedback, generateAudio } from "../../api/api";
import { openDatabase, upgradeDB, saveConversation, getConversations } from "../Chat/indexedDB";
import guardar from "../../Resources/guardar.png"
import cerrar from "../../Resources/cerrar.png"

function ChatPage() {
  const [messages, setMessages] = useState([
    { text: '¿Estás listo para comenzar? Escribe "Sí" o "No".', user: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [lastBotQuestion, setLastBotQuestion] = useState(null);
  const { transcript, isListening, startListening, stopListening } =
    useSpeechApi();
  const [db, setDb] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirmSave, setShowModalConfirmSave] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    openDatabase('ChatDB', 5, upgradeDB).then(db => {
      setDb(db);
      console.log(`nombre bd: ${db.name}`);
      return getConversations(db);
    }).then(conversations => {
      setConversations(conversations);
      console.log(conversations);
    }).catch(error => console.error('Error opening database:', error));
  }, []);

  useEffect(() => {
    if (!isListening) {
      setInput((prevInput) => prevInput + transcript);
    }
  }, [transcript, isListening]);

  const handleSave = () => {
    if (db) {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, por lo que sumamos 1
      const year = now.getFullYear();
      saveConversation(db, {
        day: day,
        month: month,
        year: year,
        messages: messages,
      })
        .then(() => {
          // Si el guardado es exitoso, recarga la página
          window.location.reload();
        })
        .catch(error => console.error("Error saving conversation:", error));
    }
  };

  const saveModalConfirm = () => {
    setShowModalConfirmSave(true);
  }

  const closeSaveModalConfirm = () => {
    setShowModalConfirmSave(false);
  }


  const handleSend = async () => {
    if (input.trim()) {
      const userResponse = input.trim();
      console.log("User response:", userResponse);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userResponse, user: "user" },
      ]);
      setInput("");

      if (
        userResponse.toLowerCase() === "sí" ||
        userResponse.toLowerCase() === "si"
      ) {
        try {
          const response = await getQuestion(userResponse);
          const botQuestion = response.data.question;
          console.log("Bot question:", botQuestion);
          setLastBotQuestion(botQuestion);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botQuestion, user: "bot" },
          ]);
        } catch (error) {
          console.error("Error getting question:", error);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: "Hubo un error obteniendo la pregunta. Intenta de nuevo.",
              user: "bot",
            },
          ]);
        }
      } else if (userResponse.toLowerCase() === "no") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "De acuerdo, vuelve cuando estes listo!", user: "bot" },
        ]);
      } else {
        if (lastBotQuestion) {
          try {
            const feedbackResponse = await getFeedback(
              lastBotQuestion,
              userResponse
            );
            const feedbackText = feedbackResponse.data.feedback;
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: feedbackText, user: "bot" },
            ]);
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: 'Quieres continuar? Responde "si" o "no".', user: "bot" },
            ]);
          } catch (error) {
            console.error("Error sending feedback:", error);
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: "Hubo un error enviando la respuesta. Intenta de nuevo.",
                user: "bot",
              },
            ]);
          }
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Por favor responde con "Sí" o "No".', user: "bot" },
          ]);
        }
      }
    }
  };

  const handlePlay = async (text) => {
    try {
      const audioBlob = await generateAudio(text);
      console.log('Blob type:', audioBlob.type);

      if (!audioBlob.type || audioBlob.type !== "audio/mpeg") {
        throw new Error(`Unexpected Blob type: ${audioBlob.type}`);
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const openModal = (conversation) => {
    setSelectedConversation(conversation);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConversation(null);
  };

  return (
    <div className="app-container">
      <Navbar title = "Chatbot" />
      <div className="chat-layout">
        <div className="history-container">
          <h2>Historial de Chats</h2>
          <div className="chat-history-item">
            {conversations.map(conversation => (
              <div className="message-item" key={conversation.id} onClick={() => openModal(conversation)}>
                {`#${conversation.id} fecha: ${conversation.day}/${conversation.month}/${conversation.year}`}
                <button className="delete-button" onClick={(e) => e.stopPropagation()}>
                  <img src={deleteIcon} alt="Eliminar" className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-container">
          <button className="save-button" onClick={saveModalConfirm}>
            <img src={guardar} alt="Guardar" className="save-icon" />
          </button>          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-wrapper ${msg.user === "bot" ? "bot-message" : "user-message"}`}
              >
                {msg.user === "bot" && (
                  <div className="bot-avatar">
                    <img src={logo} alt="Bot Avatar" />
                  </div>
                )}
                <div className={`message ${msg.user === "bot" ? "message-bot" : "message-user"}`}>
                  <div className="message-text">
                    {msg.text}
                    {msg.user === "bot" && (
                      <button className="chat-play-button" onClick={() => handlePlay(msg.text)}>
                        <img src={playIcon} alt="Play Audio" className="play-icon-img" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              className="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu respuesta..."
            />
            <button
              className="chat-button chat-audio-button"
              onClick={toggleListening}
            >
              <img src={isListening ? audiontIcon : audioIcon} alt="Audio" className="audio-icon-img" />
            </button>
            <button className="chat-button chat-send-button" onClick={handleSend}>
              <img src={sendIcon} alt="Send" className="send-icon-img" />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <img src={cerrar} alt="Cerrar" className="close-icon" />
            </button>
            <div className="chat-messages">
              {selectedConversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-wrapper ${msg.user === "bot" ? "bot-message" : "user-message"}`}
                >
                  {msg.user === "bot" && (
                    <div className="bot-avatar">
                      <img src={logo} alt="Bot Avatar" />
                    </div>
                  )}
                  <div className={`message ${msg.user === "bot" ? "message-bot" : "message-user"}`}>
                    <div className="message-text">
                      {msg.text}
                      {msg.user === "bot" && (
                        <button className="chat-play-button" onClick={() => handlePlay(msg.text)}>
                          <img src={playIcon} alt="Play Audio" className="play-icon-img" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModalConfirmSave && (
        <div className="modal">
          <div className="modal-content-save">
            <h3>Guardar Conversación</h3>
            <p>¿Estás seguro de guardar la conversación?</p>
            <div className="modal-buttons">
              <button className="button-modal-save" onClick={handleSave}>Confirmar</button>
              <button className="button-modal-save" onClick={closeSaveModalConfirm}>Cancelar</button>
            </div>
          </div>
        </div>
      )

      }
    </div>
  );
}

export default ChatPage;
