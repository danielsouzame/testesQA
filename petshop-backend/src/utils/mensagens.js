// Mensagens de erro padronizadas. Use estas constantes nos testes para
// não depender de strings escritas "na mão".

module.exports = {
  VACINA_NOME_OBRIGATORIO: 'O nome da vacina é obrigatório.',
  VACINA_NOME_DUPLICADO: 'Já existe uma vacina cadastrada com este nome.',
  VACINA_INTERVALO_INVALIDO: 'O intervalo em dias deve ser um número inteiro maior que zero.',
  VACINA_NAO_ENCONTRADA: 'Vacina não encontrada.',

  ANIMAL_NOME_OBRIGATORIO: 'O nome do animal é obrigatório.',
  ANIMAL_TUTOR_OBRIGATORIO: 'O nome do tutor é obrigatório.',
  ANIMAL_ESPECIE_INVALIDA: 'A espécie deve ser Cão, Gato ou Outro.',
  ANIMAL_NASCIMENTO_INVALIDO: 'A data de nascimento deve estar no formato AAAA-MM-DD.',
  ANIMAL_NASCIMENTO_FUTURO: 'A data de nascimento não pode ser futura.',
  ANIMAL_NAO_ENCONTRADO: 'Animal não encontrado.',

  VACINACAO_ANIMAL_OBRIGATORIO: 'O animal é obrigatório.',
  VACINACAO_VACINA_OBRIGATORIA: 'A vacina é obrigatória.',
  VACINACAO_DATA_OBRIGATORIA: 'A data da vacinação é obrigatória.',
  VACINACAO_DATA_INVALIDA: 'A data da vacinação deve estar no formato AAAA-MM-DD.',
  VACINACAO_PROXIMA_DOSE_INVALIDA: 'A data da próxima dose deve estar no formato AAAA-MM-DD.',
  VACINACAO_PROXIMA_DOSE_ANTERIOR: 'A data da próxima dose deve ser igual ou posterior à data da vacinação.',
  VACINACAO_DUPLICADA: 'Esta vacina já foi registrada para este animal nesta data.',
  VACINACAO_NAO_ENCONTRADA: 'Registro de vacinação não encontrado.',

  EXCLUSAO_VACINA_COM_VACINACOES: 'Não é possível excluir a vacina: existem registros de vacinação vinculados.',
  EXCLUSAO_ANIMAL_COM_VACINACOES: 'Não é possível excluir o animal: existem registros de vacinação vinculados.',

  STATUS_DATA_INVALIDA: 'Data inválida para cálculo do status da vacinação.',
  ERRO_INTERNO: 'Erro interno do servidor.',
};
