const express = require('express');

function criarVacinacaoRoutes(controller) {
  const router = express.Router();
  router.get('/', controller.listar);
  router.post('/', controller.registrar);
  router.delete('/:id', controller.excluir);
  return router;
}

module.exports = { criarVacinacaoRoutes };
