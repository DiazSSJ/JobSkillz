// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

// Mock de los componentes y recursos
jest.mock('../../Components/NavbarHome', () => () => <div data-testid="mock-navbar">NavbarHome</div>);
jest.mock('../../Components/Card', () => ({ icon, title, text, button_text, action_button }) => (
  <div data-testid="mock-card">
    <img src={icon} alt={title} />
    <h2>{title}</h2>
    <p>{text}</p>
    <button>{button_text}</button>
    <span>{action_button}</span>
  </div>
));
jest.mock('../../Resources/comunicacion.png', () => 'comunicacion.png');
jest.mock('../../Resources/reconocimiento.png', () => 'reconocimiento.png');

describe('Home Component', () => {
  test('renders Home component correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    // Verifica que el título principal esté presente
    expect(screen.getByText(/Potencia y eleva tus entrevistas/i)).toBeInTheDocument();

    // Verifica que el subtítulo esté presente
    expect(screen.getByText(/Practica y mejora tus habilidades/i)).toBeInTheDocument();

    // Verifica que el componente NavbarHome esté renderizado
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();

    // Verifica que los componentes Card estén renderizados
    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(2);

    // Verifica el contenido de la primera Card (Chatbot)
    expect(cards[0]).toHaveTextContent('Chatbot');
    expect(cards[0]).toHaveTextContent('Utiliza el poder de la IA');
    expect(cards[0]).toHaveTextContent('Preguntame');
    expect(cards[0]).toHaveTextContent('/Chat');

    // Verifica el contenido de la segunda Card (Reconocimiento)
    expect(cards[1]).toHaveTextContent('Reconocimiento');
    expect(cards[1]).toHaveTextContent('Con nuestra opción de reconocimiento facial');
    expect(cards[1]).toHaveTextContent('Reconoceme');
    expect(cards[1]).toHaveTextContent('/Recognition');
  });
});