const { ehDataValida, compararDatas } = require('../utils/datas');
const { ErroValidacao } = require('../utils/erros');
const MSG = require('../utils/mensagens');

function estaVazio(valor) {
  return valor === undefined || valor === null || valor === '';
}

// RN10 e RN11 (e presença dos identificadores).
// A existência do animal/vacina (RN08/RN09) e a duplicidade (RN12) dependem do
// banco de dados e por isso são verificadas no vacinacaoService.
function validarRegistroVacinacao(dados) {
  const erros = [];
  const entrada = dados || {};

  if (estaVazio(entrada.animal_id)) {
    erros.push({ campo: 'animal_id', mensagem: MSG.VACINACAO_ANIMAL_OBRIGATORIO });
  }

  if (estaVazio(entrada.vacina_id)) {
    erros.push({ campo: 'vacina_id', mensagem: MSG.VACINACAO_VACINA_OBRIGATORIA });
  }

  const dataVacinacaoValida = ehDataValida(entrada.data_vacinacao);
  if (estaVazio(entrada.data_vacinacao)) {
    erros.push({ campo: 'data_vacinacao', mensagem: MSG.VACINACAO_DATA_OBRIGATORIA });
  } else if (!dataVacinacaoValida) {
    erros.push({ campo: 'data_vacinacao', mensagem: MSG.VACINACAO_DATA_INVALIDA });
  }

  // A próxima dose é opcional; quando informada, não pode ser anterior à vacinação.
  if (!estaVazio(entrada.data_proxima_dose)) {
    if (!ehDataValida(entrada.data_proxima_dose)) {
      erros.push({ campo: 'data_proxima_dose', mensagem: MSG.VACINACAO_PROXIMA_DOSE_INVALIDA });
    } else if (
      dataVacinacaoValida &&
      compararDatas(entrada.data_proxima_dose, entrada.data_vacinacao) < 0
    ) {
      erros.push({ campo: 'data_proxima_dose', mensagem: MSG.VACINACAO_PROXIMA_DOSE_ANTERIOR });
    }
  }

  if (erros.length > 0) throw new ErroValidacao(erros);
}

module.exports = { validarRegistroVacinacao };
