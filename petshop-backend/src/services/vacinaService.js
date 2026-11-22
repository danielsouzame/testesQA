// Regras de negócio de vacinas. Os repositories chegam por parâmetro (injeção de dependência),
// então nos testes é possível passar repositories falsos (mocks) ou um banco em memória.

const { validarVacina, existeVacinaComMesmoNome } = require('../validators/vacinaValidator');
const { limparTexto } = require('../utils/texto');
const { ErroNaoEncontrado, ErroConflito } = require('../utils/erros');
const MSG = require('../utils/mensagens');

function criarVacinaService({ vacinaRepository, vacinacaoRepository }) {
  function obterOuFalhar(id) {
    const vacina = vacinaRepository.buscarPorId(id);
    if (!vacina) throw new ErroNaoEncontrado(MSG.VACINA_NAO_ENCONTRADA);
    return vacina;
  }

  function montarDados(dados) {
    return {
      nome: limparTexto(dados.nome),
      descricao: limparTexto(dados.descricao),
      intervalo_dias: dados.intervalo_dias,
    };
  }

  return {
    listarVacinas() {
      return vacinaRepository.listar();
    },

    consultarVacina(id) {
      return obterOuFalhar(id);
    },

    cadastrarVacina(dados) {
      validarVacina(dados); // RN01, RN03
      if (existeVacinaComMesmoNome(dados.nome, vacinaRepository.listar())) { // RN02
        throw new ErroConflito(MSG.VACINA_NOME_DUPLICADO);
      }
      return vacinaRepository.inserir(montarDados(dados));
    },

    editarVacina(id, dados) {
      obterOuFalhar(id);
      validarVacina(dados);
      if (existeVacinaComMesmoNome(dados.nome, vacinaRepository.listar(), Number(id))) {
        throw new ErroConflito(MSG.VACINA_NOME_DUPLICADO);
      }
      return vacinaRepository.atualizar(id, montarDados(dados));
    },

    excluirVacina(id) {
      obterOuFalhar(id);
      if (vacinacaoRepository.contarPorVacina(id) > 0) { // RN17
        throw new ErroConflito(MSG.EXCLUSAO_VACINA_COM_VACINACOES);
      }
      vacinaRepository.excluir(id);
    },
  };
}

module.exports = { criarVacinaService };
