// Regras de negócio de vacinação. Os repositories chegam por parâmetro (injeção de dependência).

const { validarRegistroVacinacao } = require('../validators/vacinacaoValidator');
const { calcularStatusVacinacao } = require('../utils/statusVacinacao');
const { obterDataHoje, somarDias } = require('../utils/datas');
const { ErroNaoEncontrado, ErroConflito } = require('../utils/erros');
const MSG = require('../utils/mensagens');

// Se a próxima dose não foi informada, usa a data da vacinação + intervalo da vacina.
function calcularProximaDose(dataVacinacao, intervaloDias) {
  return somarDias(dataVacinacao, intervaloDias);
}

function criarVacinacaoService({ animalRepository, vacinaRepository, vacinacaoRepository }) {
  function comStatus(registro, dataReferencia) {
    return {
      ...registro,
      status: calcularStatusVacinacao(registro.data_proxima_dose, dataReferencia),
    };
  }

  return {
    listarVacinacoes(dataReferencia = obterDataHoje()) {
      return vacinacaoRepository.listar().map((r) => comStatus(r, dataReferencia));
    },

    // RN13: devolve somente os registros do animal consultado.
    consultarHistoricoAnimal(animalId, dataReferencia = obterDataHoje()) {
      if (!animalRepository.buscarPorId(animalId)) {
        throw new ErroNaoEncontrado(MSG.ANIMAL_NAO_ENCONTRADO);
      }
      return vacinacaoRepository.listarPorAnimal(animalId).map((r) => comStatus(r, dataReferencia));
    },

    registrarVacinacao(dados, dataReferencia = obterDataHoje()) {
      validarRegistroVacinacao(dados); // RN10, RN11

      if (!animalRepository.buscarPorId(dados.animal_id)) { // RN08
        throw new ErroNaoEncontrado(MSG.ANIMAL_NAO_ENCONTRADO);
      }
      const vacina = vacinaRepository.buscarPorId(dados.vacina_id); // RN09
      if (!vacina) {
        throw new ErroNaoEncontrado(MSG.VACINA_NAO_ENCONTRADA);
      }
      if (vacinacaoRepository.buscarDuplicada(dados.animal_id, dados.vacina_id, dados.data_vacinacao)) { // RN12
        throw new ErroConflito(MSG.VACINACAO_DUPLICADA);
      }

      const dataProximaDose =
        dados.data_proxima_dose || calcularProximaDose(dados.data_vacinacao, vacina.intervalo_dias);

      const criado = vacinacaoRepository.inserir({
        animal_id: dados.animal_id,
        vacina_id: dados.vacina_id,
        data_vacinacao: dados.data_vacinacao,
        data_proxima_dose: dataProximaDose,
      });
      return comStatus(criado, dataReferencia);
    },

    excluirVacinacao(id) {
      if (!vacinacaoRepository.buscarPorId(id)) {
        throw new ErroNaoEncontrado(MSG.VACINACAO_NAO_ENCONTRADA);
      }
      vacinacaoRepository.excluir(id);
    },
  };
}

module.exports = { criarVacinacaoService, calcularProximaDose };
