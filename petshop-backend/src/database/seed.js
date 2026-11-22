// Dados iniciais para exploração manual e testes de integração.
// As datas de vacinação são calculadas a partir de hoje, para sempre haver
// registros vencidos, em dia e com vencimento hoje.

const { obterDataHoje, somarDias } = require('../utils/datas');

function popularDadosIniciais(db, dataReferencia = obterDataHoje()) {
  const inserirVacina = db.prepare(
    'INSERT INTO vacinas (nome, descricao, intervalo_dias) VALUES (?, ?, ?)'
  );
  const inserirAnimal = db.prepare(
    'INSERT INTO animais (nome, especie, raca, data_nascimento, nome_tutor) VALUES (?, ?, ?, ?, ?)'
  );
  const inserirVacinacao = db.prepare(
    'INSERT INTO vacinacoes (animal_id, vacina_id, data_vacinacao, data_proxima_dose) VALUES (?, ?, ?, ?)'
  );

  const executar = db.transaction(() => {
    const antirrabica = inserirVacina.run('Antirrábica', 'Protege contra a raiva. Dose anual.', 365).lastInsertRowid;
    const v10 = inserirVacina.run('V10', 'Múltipla canina (cinomose, parvovirose, hepatite, entre outras).', 365).lastInsertRowid;
    const v4 = inserirVacina.run('V4 Felina', 'Múltipla felina (rinotraqueíte, calicivirose, panleucopenia, clamidiose).', 365).lastInsertRowid;
    inserirVacina.run('Giárdia', 'Protege contra giardíase. Reforço em 21 dias.', 21);

    const rex = inserirAnimal.run('Rex', 'Cão', 'Labrador', '2020-03-15', 'Carlos Silva').lastInsertRowid;
    const mia = inserirAnimal.run('Mia', 'Gato', 'Siamês', '2021-07-02', 'Ana Souza').lastInsertRowid;
    const pipoca = inserirAnimal.run('Pipoca', 'Cão', 'Poodle', '2019-11-20', 'Mariana Lima').lastInsertRowid;
    inserirAnimal.run('Tico', 'Outro', 'Coelho', null, 'João Pereira');

    // Rex: antirrábica vencida e V10 em dia
    inserirVacinacao.run(rex, antirrabica, somarDias(dataReferencia, -400), somarDias(dataReferencia, -35));
    inserirVacinacao.run(rex, v10, somarDias(dataReferencia, -60), somarDias(dataReferencia, 305));
    // Mia: V4 vence hoje
    inserirVacinacao.run(mia, v4, somarDias(dataReferencia, -365), dataReferencia);
    // Pipoca: antirrábica em dia
    inserirVacinacao.run(pipoca, antirrabica, somarDias(dataReferencia, -30), somarDias(dataReferencia, 335));
  });

  executar();
}

module.exports = { popularDadosIniciais };
