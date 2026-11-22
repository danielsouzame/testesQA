const MSG = require('../utils/mensagens');

// Converte os erros da aplicação em respostas HTTP padronizadas:
// { "erro": "mensagem", "detalhes": [{ "campo": "...", "mensagem": "..." }] }
function tratadorErros(erro, req, res, next) { // eslint-disable-line no-unused-vars
  if (erro.status) {
    const corpo = { erro: erro.message };
    if (erro.erros) corpo.detalhes = erro.erros;
    return res.status(erro.status).json(corpo);
  }
  console.error(erro);
  return res.status(500).json({ erro: MSG.ERRO_INTERNO });
}

module.exports = { tratadorErros };
