// Acesso ao banco para a tabela `animais`. Aqui não há regras de negócio, apenas SQL.

function criarAnimalRepository(db) {
  return {
    listar() {
      return db.prepare('SELECT * FROM animais ORDER BY nome').all();
    },
    buscarPorId(id) {
      return db.prepare('SELECT * FROM animais WHERE id = ?').get(id);
    },
    inserir({ nome, especie, raca, data_nascimento, nome_tutor }) {
      const info = db
        .prepare(
          'INSERT INTO animais (nome, especie, raca, data_nascimento, nome_tutor) VALUES (?, ?, ?, ?, ?)'
        )
        .run(nome, especie, raca, data_nascimento, nome_tutor);
      return this.buscarPorId(info.lastInsertRowid);
    },
    atualizar(id, { nome, especie, raca, data_nascimento, nome_tutor }) {
      db.prepare(
        'UPDATE animais SET nome = ?, especie = ?, raca = ?, data_nascimento = ?, nome_tutor = ? WHERE id = ?'
      ).run(nome, especie, raca, data_nascimento, nome_tutor, id);
      return this.buscarPorId(id);
    },
    excluir(id) {
      db.prepare('DELETE FROM animais WHERE id = ?').run(id);
    },
  };
}

module.exports = { criarAnimalRepository };
