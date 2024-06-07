// NavbarHome.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavbarHome from "./NavbarHome";

// Mock de los componentes de Material-UI y recursos
jest.mock("@mui/material/AppBar", () => ({ children, sx }) => (
  <div data-testid="mock-appbar" style={sx}>
    {children}
  </div>
));
jest.mock("@mui/material/Toolbar", () => ({ children }) => (
  <div data-testid="mock-toolbar">{children}</div>
));
jest.mock(
  "@mui/material/Typography",
  () =>
    ({ children, variant, sx, component }) =>
      (
        <div
          data-testid="mock-typography"
          style={sx}
          data-variant={variant}
          data-component={component}
        >
          {children}
        </div>
      )
);
jest.mock(
  "@mui/material/IconButton",
  () =>
    ({ children, edge, color, size, sx, onClick, "aria-label": ariaLabel }) =>
      (
        <button
          data-testid="mock-iconbutton"
          style={sx}
          onClick={onClick}
          aria-label={ariaLabel}
          data-edge={edge}
          data-color={color}
          data-size={size}
        >
          {children}
        </button>
      )
);
jest.mock("@mui/icons-material/TipsAndUpdates", () => () => (
  <span data-testid="mock-tipsicon">TipsIcon</span>
));
jest.mock("../Resources/JobSkillz_logo_nombre.svg", () => "jobskillz-logo.svg");

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("NavbarHome Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders NavbarHome component correctly", () => {
    render(
      <MemoryRouter>
        <NavbarHome />
      </MemoryRouter>
    );

    // Verifica que AppBar se renderice con los estilos correctos
    const appBar = screen.getByTestId("mock-appbar");
    expect(appBar).toHaveStyle({
      color: "black",
      backgroundColor: "#D9D9D9",
      opacity: "0.8",
    });

    // Verifica que Toolbar se renderice
    expect(screen.getByTestId("mock-toolbar")).toBeInTheDocument();

    // Verifica que el logo se renderice correctamente
    const logo = screen.getByAltText("logo");
    expect(logo).toHaveAttribute("src", "jobskillz-logo.svg");
    expect(logo).toHaveStyle({ height: "3vw" });

    // Verifica que el título "JOBSKILLZ" se renderice correctamente
    const title = screen.getByTestId("mock-typography");
    expect(title).toHaveTextContent("JOBSKILLZ");
    expect(title).toHaveAttribute("data-variant", "h4");
    expect(title).toHaveAttribute("data-component", "div");
    expect(title).toHaveStyle({
      flexGrow: "1",
      fontFamily: "MiTipografia",
      fontWeight: "bold",
    });

    // Verifica que el botón de tips se renderice correctamente
    const tipsButton = screen.getByTestId('mock-tipsicon').closest('button');
    expect(tipsButton).toHaveAttribute("data-edge", "end");
    expect(tipsButton).toHaveAttribute("data-color", "secondary");
    expect(tipsButton).toHaveAttribute("data-size", "large");
    expect(tipsButton).toHaveStyle({ justifySelf: "end" });

    // Verifica que el ícono de tips se renderice
    expect(screen.getByTestId("mock-tipsicon")).toBeInTheDocument();
  });

  test("navigates to Tips page when tips button is clicked", () => {
    render(
      <MemoryRouter>
        <NavbarHome />
      </MemoryRouter>
    );

    const tipsButton = screen.getByTestId("mock-tipsicon").closest("button");
    fireEvent.click(tipsButton);

    // Verifica que se llamó a navigate con la ruta correcta
    expect(mockNavigate).toHaveBeenCalledWith("/Tips");
  });

  test("renders correctly without crashing if some components are missing", () => {
    // Simula que algunos componentes de Material-UI no están disponibles
    jest.mock("@mui/material/AppBar", () => () => null);
    jest.mock("@mui/material/IconButton", () => () => null);

    render(
      <MemoryRouter>
        <NavbarHome />
      </MemoryRouter>
    );

    // Verifica que el componente se renderice sin errores
    expect(screen.getByText("JOBSKILLZ")).toBeInTheDocument();
  });
});
