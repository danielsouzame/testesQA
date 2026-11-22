// Acesso ao banco para a tabela `vacinas`. Aqui não há regras de negócio, apenas SQL.

function criarVacinaRepository(db) {
  return {
    listar() {
      return db.prepare('SELECT * FROM vacinas ORDER BY nome').all();
    },
    buscarPorId(id) {
      return db.prepare('SELECT * FROM vacinas WHERE id = ?').get(id);
    },
    inserir({ nome, descricao, intervalo_dias }) {
      const info = db
        .prepare('INSERT INTO vacinas (nome, descricao, intervalo_dias) VALUES (?, ?, ?)')
        .run(nome, descricao, intervalo_dias);
      return this.buscarPorId(info.lastInsertRowid);
    },
    atualizar(id, { nome, descricao, intervalo_dias }) {
      db.prepare('UPDATE vacinas SET nome = ?, descricao = ?, intervalo_dias = ? WHERE id = ?')
        .run(nome, descricao, intervalo_dias, id);
      return this.buscarPorId(id);
    },
    excluir(id) {
      db.prepare('DELETE FROM vacinas WHERE id = ?').run(id);
    },
  };
}

module.exports = { criarVacinaRepository };
