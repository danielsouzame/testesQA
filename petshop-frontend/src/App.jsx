import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Animais from './pages/Animais';
import Vacinas from './pages/Vacinas';
import HistoricoVacinacao from './pages/HistoricoVacinacao';

const TELAS = [
  { id: 'dashboard', titulo: 'Dashboard', componente: Dashboard },
  { id: 'animais', titulo: 'Animais', componente: Animais },
  { id: 'vacinas', titulo: 'Vacinas', componente: Vacinas },
  { id: 'historico', titulo: 'Histórico de vacinação', componente: HistoricoVacinacao },
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState('dashboard');
  const Tela = TELAS.find((t) => t.id === telaAtual).componente;

  return (
    <>
      <header className="cabecalho">
        <p className="marca">Carteira de Vacinas do Petshop</p>
        <nav aria-label="Navegação principal">
          {TELAS.map((tela) => (
            <button
              key={tela.id}
              type="button"
              className={tela.id === telaAtual ? 'ativo' : ''}
              aria-current={tela.id === telaAtual ? 'page' : undefined}
              onClick={() => setTelaAtual(tela.id)}
            >
              {tela.titulo}
            </button>
          ))}
        </nav>
      </header>
      <main>
        <Tela />
      </main>
    </>
  );
}
