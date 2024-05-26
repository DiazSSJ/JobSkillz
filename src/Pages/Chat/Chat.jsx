// ChatPage.js
import * as React from 'react';
import { useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import './Chat.css';
import logo from '../../Resources/JobSkillz_logo.svg';
import sendIcon from '../../Resources/enviar.png';
import audioIcon from '../../Resources/microfono.png'; // Importa la imagen para el botÃ³n de audio
import audiontIcon from '../../Resources/microfono-silencio.png';
import { useSpeechApi } from '../Chat/SpeechApi'

function ChatPage() {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const { transcript, isListening, startListening, stopListening } = useSpeechApi();

  useEffect(() => {
    if (!isListening) {
      setInput(prevInput => prevInput + ' ' + transcript);
    }
  }, [transcript, isListening]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'user' }]);
      setInput('');
      // Simular respuesta del bot
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Este es un mensaje del bot', user: 'bot' },
        ]);
      }, 1000);
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
  );
}

export default ChatPage;