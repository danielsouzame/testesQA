const express = require('express');
const cors = require('cors');

const { criarVacinaRepository } = require('./repositories/vacinaRepository');
const { criarAnimalRepository } = require('./repositories/animalRepository');
const { criarVacinacaoRepository } = require('./repositories/vacinacaoRepository');
const { criarVacinaService } = require('./services/vacinaService');
const { criarAnimalService } = require('./services/animalService');
const { criarVacinacaoService } = require('./services/vacinacaoService');
const { criarVacinaController } = require('./controllers/vacinaController');
const { criarAnimalController } = require('./controllers/animalController');
const { criarVacinacaoController } = require('./controllers/vacinacaoController');
const { criarVacinaRoutes } = require('./routes/vacinaRoutes');
const { criarAnimalRoutes } = require('./routes/animalRoutes');
const { criarVacinacaoRoutes } = require('./routes/vacinacaoRoutes');
const { tratadorErros } = require('./middlewares/tratadorErros');

// Monta a aplicação Express a partir de uma conexão de banco.
// Nos testes de integração: criarApp(criarBancoEmMemoria()).
function criarApp(db) {
  const vacinaRepository = criarVacinaRepository(db);
  const animalRepository = criarAnimalRepository(db);
  const vacinacaoRepository = criarVacinacaoRepository(db);

  const vacinaService = criarVacinaService({ vacinaRepository, vacinacaoRepository });
  const animalService = criarAnimalService({ animalRepository, vacinacaoRepository });
  const vacinacaoService = criarVacinacaoService({ animalRepository, vacinaRepository, vacinacaoRepository });

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/vacinas', criarVacinaRoutes(criarVacinaController(vacinaService)));
  app.use('/api/animais', criarAnimalRoutes(criarAnimalController(animalService, vacinacaoService)));
  app.use('/api/vacinacoes', criarVacinacaoRoutes(criarVacinacaoController(vacinacaoService)));

  app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));
  app.use(tratadorErros);
  return app;
}

module.exports = { criarApp };
