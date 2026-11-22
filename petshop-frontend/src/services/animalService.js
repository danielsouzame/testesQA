import { requisicao } from './api';

export const listarAnimais = () => requisicao('/animais');
export const criarAnimal = (dados) => requisicao('/animais', { method: 'POST', body: dados });
export const atualizarAnimal = (id, dados) => requisicao(`/animais/${id}`, { method: 'PUT', body: dados });
export const excluirAnimal = (id) => requisicao(`/animais/${id}`, { method: 'DELETE' });
