const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { criarTabelas } = require('./schema');

const CAMINHO_PADRAO = path.join(__dirname, '..', '..', 'data', 'petshop.db');

// Abre (ou cria) um banco SQLite em arquivo.
function abrirBanco(caminho = process.env.DB_PATH || CAMINHO_PADRAO) {
  if (caminho !== ':memory:') {
    fs.mkdirSync(path.dirname(caminho), { recursive: true });
  }
  const db = new Database(caminho);
  db.pragma('foreign_keys = ON');
  criarTabelas(db);
  return db;
}

// Banco vazio em memória, ideal para testes (cada teste pode ter o seu).
function criarBancoEmMemoria() {
  return abrirBanco(':memory:');
}

module.exports = { abrirBanco, criarBancoEmMemoria, CAMINHO_PADRAO };
