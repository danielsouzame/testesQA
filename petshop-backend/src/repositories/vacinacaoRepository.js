// Acesso ao banco para a tabela `vacinacoes`. Aqui não há regras de negócio, apenas SQL.
// As consultas de listagem trazem também os nomes do animal e da vacina.

const SELECT_COM_NOMES = `
  SELECT v.id, v.animal_id, a.nome AS animal_nome,
         v.vacina_id, vc.nome AS vacina_nome,
         v.data_vacinacao, v.data_proxima_dose
  FROM vacinacoes v
  JOIN animais a ON a.id = v.animal_id
  JOIN vacinas vc ON vc.id = v.vacina_id
`;

function criarVacinacaoRepository(db) {
  return {
    listar() {
      return db.prepare(`${SELECT_COM_NOMES} ORDER BY v.data_vacinacao DESC, v.id DESC`).all();
    },
    listarPorAnimal(animalId) {
      return db
        .prepare(`${SELECT_COM_NOMES} WHERE v.animal_id = ? ORDER BY v.data_vacinacao DESC, v.id DESC`)
        .all(animalId);
    },
    buscarPorId(id) {
      return db.prepare(`${SELECT_COM_NOMES} WHERE v.id = ?`).get(id);
    },
    buscarDuplicada(animalId, vacinaId, dataVacinacao) {
      return db
        .prepare(
          'SELECT id FROM vacinacoes WHERE animal_id = ? AND vacina_id = ? AND data_vacinacao = ?'
        )
        .get(animalId, vacinaId, dataVacinacao);
    },
    inserir({ animal_id, vacina_id, data_vacinacao, data_proxima_dose }) {
      const info = db
        .prepare(
          'INSERT INTO vacinacoes (animal_id, vacina_id, data_vacinacao, data_proxima_dose) VALUES (?, ?, ?, ?)'
        )
        .run(animal_id, vacina_id, data_vacinacao, data_proxima_dose);
      return this.buscarPorId(info.lastInsertRowid);
    },
    excluir(id) {
      db.prepare('DELETE FROM vacinacoes WHERE id = ?').run(id);
    },
    contarPorAnimal(animalId) {
      return db.prepare('SELECT COUNT(*) AS total FROM vacinacoes WHERE animal_id = ?').get(animalId).total;
    },
    contarPorVacina(vacinaId) {
      return db.prepare('SELECT COUNT(*) AS total FROM vacinacoes WHERE vacina_id = ?').get(vacinaId).total;
    },
  };
}

module.exports = { criarVacinacaoRepository };
