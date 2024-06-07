import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Tips from './Tips';

const TipsRouter = () => (
  <MemoryRouter>
    <Tips />
  </MemoryRouter>
);

describe('Tips Component', () => {
  test('renders the page title correctly', () => {
    render(<TipsRouter />);
    const titleElement = screen.getByText(/Consejos para antes, durante y después de una entrevista/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('all sections are initially closed', () => {
    render(<TipsRouter />);
    const sections = ['Antes de la entrevista', 'Durante la entrevista', 'Después de la entrevista', 'Preguntas de comportamiento', 'Preguntas técnicas', 'Preguntas de antecedentes'];

    sections.forEach(section => {
      const sectionElement = screen.getByRole('heading', { name: new RegExp(section, 'i') });
      expect(sectionElement).toBeInTheDocument();
      expect(sectionElement).not.toHaveClass('selected');

      const tipsElement = screen.getByTestId(`${section.toLowerCase().replace(/ /g, '-')}-tips`);
      expect(tipsElement).not.toHaveClass('open');
    });
  });

  test('clicking a section header toggles its content visibility', () => {
    render(<TipsRouter />);
    const sectionHeader = screen.getByRole('heading', { name: /Antes de la entrevista/i });
    const sectionContent = screen.getByTestId('antes-de-la-entrevista-tips');

    // Initially closed
    expect(sectionHeader).not.toHaveClass('selected');
    expect(sectionContent).not.toHaveClass('open');

    // Open after first click
    fireEvent.click(sectionHeader);
    expect(sectionHeader).toHaveClass('selected');
    expect(sectionContent).toHaveClass('open');

    // Closed after second click
    fireEvent.click(sectionHeader);
    expect(sectionHeader).not.toHaveClass('selected');
    expect(sectionContent).not.toHaveClass('open');
  });

  test('only one section can be open at a time', () => {
    render(<TipsRouter />);
    const sectionHeaders = [
      screen.getByRole('heading', { name: /Antes de la entrevista/i }),
      screen.getByRole('heading', { name: /Durante la entrevista/i }),
    ];

    // Open first section
    fireEvent.click(sectionHeaders[0]);
    expect(sectionHeaders[0]).toHaveClass('selected');
    expect(screen.getByTestId('antes-de-la-entrevista-tips')).toHaveClass('open');

    // Open second section, first should close
    fireEvent.click(sectionHeaders[1]);
    expect(sectionHeaders[0]).not.toHaveClass('selected');
    expect(screen.getByTestId('antes-de-la-entrevista-tips')).not.toHaveClass('open');
    expect(sectionHeaders[1]).toHaveClass('selected');
    expect(screen.getByTestId('durante-la-entrevista-tips')).toHaveClass('open');
  });

  test('renders all expected sections', () => {
    render(<TipsRouter />);
    const expectedSections = [
      'Antes de la entrevista',
      'Durante la entrevista',
      'Después de la entrevista',
      'Preguntas de comportamiento',
      'Preguntas técnicas',
      'Preguntas de antecedentes',
    ];

    expectedSections.forEach(section => {
      expect(screen.getByRole('heading', { name: new RegExp(section, 'i') })).toBeInTheDocument();
    });
  });

  test('renders Navbar component with correct title', () => {
    render(<TipsRouter />);
    const navbarTitle = screen.getByText(/Tips/i);
    expect(navbarTitle).toBeInTheDocument();
  });
});