// Card.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

// Mock de los componentes externos
jest.mock('@mui/material/Avatar', () => ({ src, sx }) => (
  <div data-testid="mock-avatar" style={sx}>
    <img src={src} alt="Avatar" />
  </div>
));

describe('Card Component', () => {
  const mockProps = {
    icon: 'test-icon.png',
    title: 'Test Title',
    text: 'This is a test text.',
    button_text: 'Click Me',
    action_button: '/test-route',
    estilo: { color: 'red' },
  };

  test('renders Card component with correct props', () => {
    render(<Card {...mockProps} />);

    // Verifica que el Avatar se renderice con las propiedades correctas
    const avatar = screen.getByTestId('mock-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle({ width: '70px', height: '70px', backgroundColor: '#D9D9D9' });
    expect(avatar.querySelector('img')).toHaveAttribute('src', 'test-icon.png');

    // Verifica que el título se renderice correctamente
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Verifica que el texto se renderice correctamente
    expect(screen.getByText('This is a test text.')).toBeInTheDocument();

    // Verifica que el botón se renderice con el texto y estilo correctos
    const button = screen.getByRole('link', { name: /Click Me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/test-route');
    expect(button).toHaveStyle({ color: 'red' });
  });

  test('renders Card component with default styles', () => {
    const defaultProps = {
      ...mockProps,
      estilo: undefined,
    };

    render(<Card {...defaultProps} />);

    // Verifica que el Card tenga los estilos por defecto
    const card = screen.getByRole('link', { name: /Click Me/i }).closest('.card');
    expect(card).toHaveStyle({ width: '18rem', borderRadius: '20px', height: '20rem' });
  });

  test('handles missing props gracefully', () => {
    const partialProps = {
      icon: 'test-icon.png',
      title: 'Partial Title',
    };

    render(<Card {...partialProps} />);

    // Verifica que el componente no se rompa con propiedades faltantes
    expect(screen.getByText('Partial Title')).toBeInTheDocument();
    expect(screen.queryByText('This is a test text.')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});