import * as React from 'react';
import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import './Chat.css';
import logo from '../../Resources/JobSkillz_logo.svg';
import sendIcon from '../../Resources/enviar.png';
import audioIcon from '../../Resources/microfono.png';
import audiontIcon from '../../Resources/microfono-silencio.png';
import { useSpeechApi } from '../Chat/SpeechApi';
import deleteIcon from '../../Resources/bote-de-basura.png';
import { getQuestion, getFeedback } from '../../api/api';

function ChatPage() {
  const [messages, setMessages] = useState([{ text: '¿Estás listo para comenzar? Escribe "Sí" o "No".', user: 'bot' }]);
  const [input, setInput] = useState('');
  const [lastBotQuestion, setLastBotQuestion] = useState(null);
  const { transcript, isListening, startListening, stopListening } = useSpeechApi();

  useEffect(() => {
    if (!isListening) {
      setInput(prevInput => prevInput + transcript);
    }
  }, [transcript, isListening]);

  const handleSend = async () => {
    if (input.trim()) {
      const userResponse = input.trim();
      console.log('User response:', userResponse);
      setMessages(prevMessages => [...prevMessages, { text: userResponse, user: 'user' }]);
      setInput('');

      if (userResponse.toLowerCase() === 'sí' || userResponse.toLowerCase() === 'si') {
        try {
          const response = await getQuestion(userResponse);
          const botQuestion = response.data.question;
          console.log('Bot question:', botQuestion);
          setLastBotQuestion(botQuestion);
          setMessages(prevMessages => [...prevMessages, { text: botQuestion, user: 'bot' }]);
        } catch (error) {
          console.error('Error getting question:', error);
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Hubo un error obteniendo la pregunta. Intenta de nuevo.', user: 'bot' },
          ]);
        }
      } else if (userResponse.toLowerCase() === 'no') {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'De acuerdo, ¡vuelve cuando estés listo!', user: 'bot' },
        ]);
      } else {
        if (lastBotQuestion) {
          try {
            const feedbackResponse = await getFeedback(lastBotQuestion, userResponse);
            const feedbackText = feedbackResponse.data.feedback; // Ajusta según la estructura de la respuesta
            setMessages(prevMessages => [
              ...prevMessages,
              { text: feedbackText, user: 'bot' },
            ]);
            setMessages(prevMessages => [
              ...prevMessages,
              { text: 'Quieres continuar? Responde "si" o "no".', user: 'bot' },
            ]);
          } catch (error) {
            console.error('Error sending feedback:', error);
            setMessages(prevMessages => [
              ...prevMessages,
              { text: 'Hubo un error enviando la respuesta. Intenta de nuevo.', user: 'bot' },
            ]);
          }
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'Por favor responde con "Sí" o "No".', user: 'bot' },
          ]);
        }
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="chat-layout">
        <div className="history-container">
          <h2>Historial de Chats</h2>
          <div className="chat-history-item">
            <div className="message-item">
              Mensaje 1 ...
              <button className="delete-button" onClick=''>
                <img src={deleteIcon} alt="Eliminar" className="delete-icon" />
              </button>
            </div>
          </div>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-wrapper ${msg.user === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {msg.user === 'bot' && (
                  <div className="bot-avatar">
                    <img src={logo} alt="Bot Avatar" />
                  </div>
                )}
                <div className={`message ${msg.user === 'bot' ? 'message-bot' : 'message-user'}`}>
                  <div className="message-text">{msg.text}</div>
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
              placeholder="Escribe tu respuesta..."
            />
            <button className="chat-button chat-audio-button" onClick={toggleListening}>
              <img src={isListening ? audiontIcon : audioIcon} alt="Audio" className="audio-icon-img" />
            </button>
            <button className="chat-button chat-send-button" onClick={handleSend}>
              <img src={sendIcon} alt="Send" className="send-icon-img" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
