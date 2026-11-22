// Atividade 2 – Testes de componentes do Frontend (formulário de animais)
// Usa React Testing Library para localizar os elementos do formulário.

import { render, screen } from '@testing-library/react';
import AnimalForm from '../../src/components/AnimalForm';

describe('AnimalForm – Teste 11: renderização do formulário de animais', () => {
  test('apresenta os campos Nome, Espécie, Raça, Data de nascimento e Tutor', () => {
    render(<AnimalForm onSalvar={jest.fn()} />);

    expect(screen.getByLabelText('Nome do animal')).toBeInTheDocument();
    expect(screen.getByLabelText('Espécie')).toBeInTheDocument();
    expect(screen.getByLabelText('Raça')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de nascimento')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do tutor')).toBeInTheDocument();
  });

  // No formulário de cadastro, o botão que salva os dados tem o texto "Cadastrar animal".
  test('apresenta o botão Salvar do formulário', () => {
    render(<AnimalForm onSalvar={jest.fn()} />);

    const botaoSalvar = screen.getByRole('button', { name: 'Cadastrar animal' });
    expect(botaoSalvar).toBeInTheDocument();
    expect(botaoSalvar).toHaveAttribute('type', 'submit');
  });
});
