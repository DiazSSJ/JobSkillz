// Navbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Mock de los componentes de Material-UI y recursos
jest.mock('@mui/material/AppBar', () => ({ children, sx, position }) => (
  <div data-testid="mock-appbar" style={sx} data-position={position}>{children}</div>
));
jest.mock('@mui/material/Box', () => ({ children, sx }) => (
  <div data-testid="mock-box" style={sx}>{children}</div>
));
jest.mock('@mui/material/Toolbar', () => ({ children }) => (
  <div data-testid="mock-toolbar">{children}</div>
));
jest.mock('@mui/material/Typography', () => ({ children, variant, component, sx }) => (
  <div data-testid="mock-typography" style={sx} data-variant={variant} data-component={component}>{children}</div>
));
jest.mock('@mui/material/IconButton', () => ({ children, size, edge, color, sx, onClick, 'aria-label': ariaLabel }) => (
  <button data-testid="mock-iconbutton" style={sx} onClick={onClick} aria-label={ariaLabel}
          data-size={size} data-edge={edge} data-color={color}>
    {children}
  </button>
));
jest.mock('../../Resources/JobSkillz_logo_nombre.svg', () => 'jobskillz-logo.svg');
jest.mock('../../Resources/flecha-izquierda.png', () => 'flecha-izquierda.png');

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders Navbar component with correct title', () => {
    const testTitle = 'Test Title';
    render(
      <MemoryRouter>
        <Navbar title={testTitle} />
      </MemoryRouter>
    );

    // Verifica que AppBar se renderice con los estilos y posición correctos
    const appBar = screen.getByTestId('mock-appbar');
    expect(appBar).toHaveStyle({ backgroundColor: '#D9D9D9' });
    expect(appBar).toHaveAttribute('data-position', 'static');

    // Verifica que Box se renderice
    expect(screen.getByTestId('mock-box')).toHaveStyle({ flexGrow: 1 });

    // Verifica que Toolbar se renderice
    expect(screen.getByTestId('mock-toolbar')).toBeInTheDocument();

    // Verifica que el botón de retroceso se renderice correctamente
    const backButton = screen.getByRole('button', { name: /menu/i });
    expect(backButton).toHaveAttribute('data-size', 'large');
    expect(backButton).toHaveAttribute('data-edge', 'start');
    expect(backButton).toHaveAttribute('data-color', 'inherit');

    const backIcon = screen.getByAltText('menu icon');
    expect(backIcon).toHaveAttribute('src', 'flecha-izquierda.png');
    expect(backIcon).toHaveStyle({ width: '50px', height: '50px' });

    // Verifica que el título se renderice correctamente
    const title = screen.getByTestId('mock-typography');
    expect(title).toHaveTextContent(testTitle);
    expect(title).toHaveAttribute('data-variant', 'h4');
    expect(title).toHaveAttribute('data-component', 'div');
    expect(title).toHaveStyle({ flexGrow: 1, textAlign: 'center', color: 'black', fontWeight: 'bold' });

    // Verifica que el logo se renderice correctamente
    const logo = screen.getByAltText('login');
    expect(logo).toHaveAttribute('src', 'jobskillz-logo.svg');
    expect(logo).toHaveStyle({ width: '50px', height: '50px' });
  });

  test('navigates back when back button is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar title="Test" />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(backButton);

    // Verifica que se llamó a navigate con la ruta correcta
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  describe('renders correctly with different titles', () => {
    const titles = ['Home', 'Profile', 'Settings', 'Entrevistas'];

    titles.forEach(title => {
      test(`renders with title "${title}"`, () => {
        render(
          <MemoryRouter>
            <Navbar title={title} />
          </MemoryRouter>
        );

        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  test('handles missing props gracefully', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verifica que el componente se renderice sin romperse
    expect(screen.getByTestId('mock-appbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-typography')).toBeInTheDocument();
    expect(screen.getByAltText('menu icon')).toBeInTheDocument();
    expect(screen.getByAltText('login')).toBeInTheDocument();
  });
});