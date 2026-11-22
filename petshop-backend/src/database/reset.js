// Reinicializa o banco de dados: apaga tudo, recria as tabelas e insere os dados iniciais.
// Uso: npm run db:reset

const { abrirBanco } = require('./connection');
const { apagarTabelas, criarTabelas } = require('./schema');
const { popularDadosIniciais } = require('./seed');

function reinicializarBanco(db) {
  apagarTabelas(db);
  criarTabelas(db);
  popularDadosIniciais(db);
}

module.exports = { reinicializarBanco };

if (require.main === module) {
  const db = abrirBanco();
  reinicializarBanco(db);
  db.close();
  console.log('Banco de dados reinicializado com os dados iniciais.');
}
