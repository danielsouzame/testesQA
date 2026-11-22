const { limparTexto } = require('../utils/texto');
const { ehDataValida, obterDataHoje, compararDatas } = require('../utils/datas');
const { ErroValidacao } = require('../utils/erros');
const MSG = require('../utils/mensagens');

const ESPECIES_PERMITIDAS = Object.freeze(['Cão', 'Gato', 'Outro']);

// RN04, RN05, RN06 e RN07. Lança ErroValidacao com a lista de problemas encontrados.
// A data de referência é opcional e serve para testar a regra da data futura.
function validarAnimal(dados, dataReferencia = obterDataHoje()) {
  const erros = [];
  const entrada = dados || {};

  if (limparTexto(entrada.nome) === '') {
    erros.push({ campo: 'nome', mensagem: MSG.ANIMAL_NOME_OBRIGATORIO });
  }

  if (limparTexto(entrada.nome_tutor) === '') {
    erros.push({ campo: 'nome_tutor', mensagem: MSG.ANIMAL_TUTOR_OBRIGATORIO });
  }

  if (!ESPECIES_PERMITIDAS.includes(limparTexto(entrada.especie))) {
    erros.push({ campo: 'especie', mensagem: MSG.ANIMAL_ESPECIE_INVALIDA });
  }

  // A data de nascimento é opcional; quando informada, precisa ser válida e não futura.
  const nascimento = entrada.data_nascimento;
  if (nascimento !== undefined && nascimento !== null && nascimento !== '') {
    if (!ehDataValida(nascimento)) {
      erros.push({ campo: 'data_nascimento', mensagem: MSG.ANIMAL_NASCIMENTO_INVALIDO });
    } else if (compararDatas(nascimento, dataReferencia) > 0) {
      erros.push({ campo: 'data_nascimento', mensagem: MSG.ANIMAL_NASCIMENTO_FUTURO });
    }
  }

  if (erros.length > 0) throw new ErroValidacao(erros);
}

module.exports = { ESPECIES_PERMITIDAS, validarAnimal };
