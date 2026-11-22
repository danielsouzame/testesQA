// Validações de preenchimento dos formulários (feedback imediato ao usuário).
// Cada função recebe os valores do formulário e devolve um objeto { campo: 'mensagem' }.
// Objeto vazio = formulário válido. O Backend continua sendo a fonte oficial das regras.

import { obterDataHoje } from './datas';

export const ESPECIES = ['Cão', 'Gato', 'Outro'];

const vazio = (valor) => !valor || String(valor).trim() === '';

export function validarFormularioAnimal(valores, dataReferencia = obterDataHoje()) {
  const erros = {};
  if (vazio(valores.nome)) erros.nome = 'Informe o nome do animal.';
  if (!ESPECIES.includes(valores.especie)) erros.especie = 'Selecione a espécie: Cão, Gato ou Outro.';
  if (vazio(valores.nome_tutor)) erros.nome_tutor = 'Informe o nome do tutor.';
  if (!vazio(valores.data_nascimento) && valores.data_nascimento > dataReferencia) {
    erros.data_nascimento = 'A data de nascimento não pode ser futura.';
  }
  return erros;
}

export function validarFormularioVacina(valores) {
  const erros = {};
  if (vazio(valores.nome)) erros.nome = 'Informe o nome da vacina.';
  const intervalo = String(valores.intervalo_dias ?? '').trim();
  if (!/^\d+$/.test(intervalo) || Number(intervalo) <= 0) {
    erros.intervalo_dias = 'Informe um número inteiro maior que zero.';
  }
  return erros;
}

export function validarFormularioVacinacao(valores) {
  const erros = {};
  if (vazio(valores.vacina_id)) erros.vacina_id = 'Selecione a vacina.';
  if (vazio(valores.data_vacinacao)) erros.data_vacinacao = 'Informe a data da vacinação.';
  if (
    !vazio(valores.data_proxima_dose) &&
    !vazio(valores.data_vacinacao) &&
    valores.data_proxima_dose < valores.data_vacinacao
  ) {
    erros.data_proxima_dose = 'A próxima dose deve ser igual ou posterior à data da vacinação.';
  }
  return erros;
}
