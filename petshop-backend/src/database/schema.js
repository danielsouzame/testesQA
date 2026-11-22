// Criação das tabelas. Recebe a conexão como parâmetro para facilitar testes com banco em memória.

function criarTabelas(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vacinas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      intervalo_dias INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS animais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      especie TEXT NOT NULL,
      raca TEXT,
      data_nascimento TEXT,
      nome_tutor TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vacinacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      animal_id INTEGER NOT NULL REFERENCES animais(id),
      vacina_id INTEGER NOT NULL REFERENCES vacinas(id),
      data_vacinacao TEXT NOT NULL,
      data_proxima_dose TEXT NOT NULL
    );
  `);
}

function apagarTabelas(db) {
  db.exec(`
    DROP TABLE IF EXISTS vacinacoes;
    DROP TABLE IF EXISTS animais;
    DROP TABLE IF EXISTS vacinas;
  `);
}

module.exports = { criarTabelas, apagarTabelas };
