import { STATUS } from './statusVacinacao';

// Monta os números do Dashboard a partir das listas recebidas da API.
export function calcularResumoDashboard(animais = [], vacinas = [], vacinacoes = []) {
  const contar = (status) => vacinacoes.filter((v) => v.status === status).length;
  return {
    totalAnimais: animais.length,
    totalVacinas: vacinas.length,
    vacinacoesVencidas: contar(STATUS.VENCIDA),
    vacinacoesEmDia: contar(STATUS.EM_DIA),
    vacinacoesVencemHoje: contar(STATUS.VENCE_HOJE),
  };
}
