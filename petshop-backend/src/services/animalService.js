// Regras de negócio de animais. Os repositories chegam por parâmetro (injeção de dependência).

const { validarAnimal } = require('../validators/animalValidator');
const { limparTexto } = require('../utils/texto');
const { ErroNaoEncontrado, ErroConflito } = require('../utils/erros');
const { obterDataHoje } = require('../utils/datas');
const MSG = require('../utils/mensagens');

function criarAnimalService({ animalRepository, vacinacaoRepository }) {
  function obterOuFalhar(id) {
    const animal = animalRepository.buscarPorId(id);
    if (!animal) throw new ErroNaoEncontrado(MSG.ANIMAL_NAO_ENCONTRADO);
    return animal;
  }

  function montarDados(dados) {
    return {
      nome: limparTexto(dados.nome),
      especie: limparTexto(dados.especie),
      raca: limparTexto(dados.raca),
      data_nascimento: dados.data_nascimento || null,
      nome_tutor: limparTexto(dados.nome_tutor),
    };
  }

  return {
    listarAnimais() {
      return animalRepository.listar();
    },

    consultarAnimal(id) {
      return obterOuFalhar(id);
    },

    cadastrarAnimal(dados, dataReferencia = obterDataHoje()) {
      validarAnimal(dados, dataReferencia); // RN04, RN05, RN06, RN07
      return animalRepository.inserir(montarDados(dados));
    },

    editarAnimal(id, dados, dataReferencia = obterDataHoje()) {
      obterOuFalhar(id);
      validarAnimal(dados, dataReferencia);
      return animalRepository.atualizar(id, montarDados(dados));
    },

    excluirAnimal(id) {
      obterOuFalhar(id);
      if (vacinacaoRepository.contarPorAnimal(id) > 0) { // RN17
        throw new ErroConflito(MSG.EXCLUSAO_ANIMAL_COM_VACINACOES);
      }
      animalRepository.excluir(id);
    },
  };
}

module.exports = { criarAnimalService };
