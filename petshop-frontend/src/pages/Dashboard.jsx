import { useCallback } from 'react';
import { useCarregarDados } from '../hooks/useCarregarDados';
import { listarAnimais } from '../services/animalService';
import { listarVacinas } from '../services/vacinaService';
import { listarVacinacoes } from '../services/vacinacaoService';
import { calcularResumoDashboard } from '../utils/dashboard';
import ResumoDashboard from '../components/ResumoDashboard';
import Mensagem from '../components/Mensagem';

export default function Dashboard() {
  const buscarResumo = useCallback(async () => {
    const [animais, vacinas, vacinacoes] = await Promise.all([
      listarAnimais(),
      listarVacinas(),
      listarVacinacoes(),
    ]);
    return calcularResumoDashboard(animais, vacinas, vacinacoes);
  }, []);

  const { dados: resumo, carregando, erro } = useCarregarDados(buscarResumo);

  return (
    <section aria-labelledby="titulo-dashboard">
      <h1 id="titulo-dashboard">Resumo do petshop</h1>
      <Mensagem tipo="erro">{erro}</Mensagem>
      {carregando && !resumo && <p>Carregando...</p>}
      {resumo && <ResumoDashboard resumo={resumo} />}
    </section>
  );
}
