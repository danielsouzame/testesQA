const { abrirBanco } = require('./database/connection');
const { popularDadosIniciais } = require('./database/seed');
const { criarApp } = require('./app');

const PORTA = process.env.PORT || 3001;

const db = abrirBanco();

// Na primeira execução (banco vazio), carrega os dados iniciais.
const totalAnimais = db.prepare('SELECT COUNT(*) AS total FROM animais').get().total;
const totalVacinas = db.prepare('SELECT COUNT(*) AS total FROM vacinas').get().total;
if (totalAnimais === 0 && totalVacinas === 0) {
  popularDadosIniciais(db);
  console.log('Dados iniciais carregados.');
}

criarApp(db).listen(PORTA, () => {
  console.log(`API do Petshop rodando em http://localhost:${PORTA}/api`);
});
