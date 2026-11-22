// Camada de comunicação com o Backend (Fetch API).
// Em desenvolvimento o Vite encaminha /api para http://localhost:3001 (ver vite.config.js).

export const API_URL = '/api';

export class ErroApi extends Error {
  constructor(mensagem, status = 0, detalhes = []) {
    super(mensagem);
    this.name = 'ErroApi';
    this.status = status;
    this.detalhes = detalhes;
  }
}

export async function requisicao(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
      body: opcoes.body ? JSON.stringify(opcoes.body) : undefined,
    });
  } catch {
    throw new ErroApi('Não foi possível conectar ao servidor. Verifique se o Backend está em execução.');
  }

  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new ErroApi(corpo.erro || 'Ocorreu um erro inesperado.', resposta.status, corpo.detalhes || []);
  }
  return corpo;
}

// Transforma um erro em texto para mostrar ao usuário.
export function obterMensagemErro(erro) {
  if (erro && erro.detalhes && erro.detalhes.length > 0) {
    return erro.detalhes.map((d) => d.mensagem).join(' ');
  }
  return (erro && erro.message) || 'Ocorreu um erro inesperado.';
}
