const { limparTexto, normalizarNome } = require('../utils/texto');
const { ErroValidacao } = require('../utils/erros');
const MSG = require('../utils/mensagens');

// RN01 e RN03. Lança ErroValidacao com a lista de problemas encontrados.
function validarVacina(dados) {
  const erros = [];
  const entrada = dados || {};

  if (limparTexto(entrada.nome) === '') {
    erros.push({ campo: 'nome', mensagem: MSG.VACINA_NOME_OBRIGATORIO });
  }

  if (!Number.isInteger(entrada.intervalo_dias) || entrada.intervalo_dias <= 0) {
    erros.push({ campo: 'intervalo_dias', mensagem: MSG.VACINA_INTERVALO_INVALIDO });
  }

  if (erros.length > 0) throw new ErroValidacao(erros);
}

// RN02. Retorna true se já existe outra vacina com o mesmo nome
// (ignorando maiúsculas/minúsculas e espaços nas pontas).
// `idIgnorado` permite editar uma vacina sem conflitar com ela mesma.
function existeVacinaComMesmoNome(nome, vacinas, idIgnorado = null) {
  const nomeNormalizado = normalizarNome(nome);
  return vacinas.some(
    (vacina) => vacina.id !== idIgnorado && normalizarNome(vacina.nome) === nomeNormalizado
  );
}

module.exports = { validarVacina, existeVacinaComMesmoNome };
