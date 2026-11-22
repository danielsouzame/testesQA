import { requisicao } from './api';

export const listarVacinacoes = () => requisicao('/vacinacoes');
export const listarHistoricoDoAnimal = (animalId) => requisicao(`/animais/${animalId}/vacinacoes`);
export const registrarVacinacao = (dados) => requisicao('/vacinacoes', { method: 'POST', body: dados });
export const excluirVacinacao = (id) => requisicao(`/vacinacoes/${id}`, { method: 'DELETE' });
