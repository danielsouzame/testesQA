const { ehDataValida, compararDatas } = require('./datas');
const { ErroValidacao } = require('./erros');
const MSG = require('./mensagens');

const STATUS_VACINACAO = Object.freeze({
  VENCIDA: 'Vencida',
  EM_DIA: 'Em dia',
  VENCE_HOJE: 'Vence Hoje',
});

// RN14, RN15 e RN16.
// A data de referência é um parâmetro: assim o teste não depende do relógio do computador.
function calcularStatusVacinacao(dataProximaDose, dataReferencia) {
  if (!ehDataValida(dataProximaDose) || !ehDataValida(dataReferencia)) {
    throw new ErroValidacao([{ campo: 'data_proxima_dose', mensagem: MSG.STATUS_DATA_INVALIDA }]);
  }
  const comparacao = compararDatas(dataProximaDose, dataReferencia);
  if (comparacao < 0) return STATUS_VACINACAO.VENCIDA;
  if (comparacao === 0) return STATUS_VACINACAO.VENCE_HOJE;
  return STATUS_VACINACAO.EM_DIA;
}

module.exports = { STATUS_VACINACAO, calcularStatusVacinacao };
