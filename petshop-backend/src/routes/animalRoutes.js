const express = require('express');

function criarAnimalRoutes(controller) {
  const router = express.Router();
  router.get('/', controller.listar);
  router.get('/:id/vacinacoes', controller.historico);
  router.get('/:id', controller.consultar);
  router.post('/', controller.cadastrar);
  router.put('/:id', controller.editar);
  router.delete('/:id', controller.excluir);
  return router;
}

module.exports = { criarAnimalRoutes };
