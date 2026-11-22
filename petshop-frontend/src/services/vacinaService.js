import { requisicao } from './api';

export const listarVacinas = () => requisicao('/vacinas');
export const criarVacina = (dados) => requisicao('/vacinas', { method: 'POST', body: dados });
export const atualizarVacina = (id, dados) => requisicao(`/vacinas/${id}`, { method: 'PUT', body: dados });
export const excluirVacina = (id) => requisicao(`/vacinas/${id}`, { method: 'DELETE' });
