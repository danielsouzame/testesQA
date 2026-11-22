// Atividade 1 – Testes unitários do Backend (cadastro de animais)
// O service é testado de forma isolada: os repositories são substituídos por
// funções falsas (jest.fn), então nenhum banco de dados é utilizado.

const { criarAnimalService } = require('../../src/services/animalService');
const { ErroValidacao } = require('../../src/utils/erros');
const MSG = require('../../src/utils/mensagens');

const DATA_REFERENCIA = '2026-01-15';

// Cria dados de um animal válido; cada teste pode sobrescrever o que precisar.
function criarDadosAnimal(sobrescritas = {}) {
  return {
    nome: 'Rex',
    especie: 'Cão',
    raca: 'Labrador',
    data_nascimento: '2020-05-10',
    nome_tutor: 'Maria Silva',
    ...sobrescritas,
  };
}

// Cria um service novo com repositories falsos (isolamento entre os testes).
function criarServiceComRepositoriosFalsos() {
  const animalRepository = {
    inserir: jest.fn((dados) => ({ id: 1, ...dados })),
    buscarPorId: jest.fn(),
    listar: jest.fn(),
    atualizar: jest.fn(),
    excluir: jest.fn(),
  };
  const vacinacaoRepository = { contarPorAnimal: jest.fn() };
  const service = criarAnimalService({ animalRepository, vacinacaoRepository });
  return { service, animalRepository };
}

// Executa a função e devolve o erro lançado (ou falha o teste se nada for lançado).
function capturarErro(funcao) {
  try {
    funcao();
  } catch (erro) {
    return erro;
  }
  throw new Error('Era esperado que um erro fosse lançado.');
}

describe('Cadastro de animais (animalService.cadastrarAnimal)', () => {
  test('Teste 01 – cadastra o animal quando todos os dados obrigatórios são válidos', () => {
    const { service, animalRepository } = criarServiceComRepositoriosFalsos();
    const dados = criarDadosAnimal();

    const animal = service.cadastrarAnimal(dados, DATA_REFERENCIA);

    expect(animalRepository.inserir).toHaveBeenCalledTimes(1);
    expect(animalRepository.inserir).toHaveBeenCalledWith({
      nome: 'Rex',
      especie: 'Cão',
      raca: 'Labrador',
      data_nascimento: '2020-05-10',
      nome_tutor: 'Maria Silva',
    });
    expect(animal).toEqual({ id: 1, ...dados });
  });

  test('Teste 02 – rejeita o cadastro de animal sem nome', () => {
    const { service, animalRepository } = criarServiceComRepositoriosFalsos();
    const dados = criarDadosAnimal({ nome: '' });

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.status).toBe(400);
    expect(erro.erros).toEqual([{ campo: 'nome', mensagem: MSG.ANIMAL_NOME_OBRIGATORIO }]);
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });

  test('Teste 03 – rejeita o cadastro de animal sem nome do tutor', () => {
    const { service, animalRepository } = criarServiceComRepositoriosFalsos();
    const dados = criarDadosAnimal({ nome_tutor: '' });

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.status).toBe(400);
    expect(erro.erros).toEqual([{ campo: 'nome_tutor', mensagem: MSG.ANIMAL_TUTOR_OBRIGATORIO }]);
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });

  test('Teste 04 – rejeita o cadastro de animal com espécie diferente de Cão, Gato ou Outro', () => {
    const { service, animalRepository } = criarServiceComRepositoriosFalsos();
    const dados = criarDadosAnimal({ especie: 'Pássaro' });

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.status).toBe(400);
    expect(erro.erros).toEqual([{ campo: 'especie', mensagem: MSG.ANIMAL_ESPECIE_INVALIDA }]);
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });
});
