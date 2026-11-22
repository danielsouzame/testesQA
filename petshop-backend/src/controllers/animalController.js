// Controllers apenas traduzem HTTP <-> service. Nenhuma regra de negócio aqui.

function criarAnimalController(animalService, vacinacaoService) {
  return {
    listar(req, res, next) {
      try { res.status(200).json(animalService.listarAnimais()); } catch (e) { next(e); }
    },
    consultar(req, res, next) {
      try { res.status(200).json(animalService.consultarAnimal(Number(req.params.id))); } catch (e) { next(e); }
    },
    cadastrar(req, res, next) {
      try { res.status(201).json(animalService.cadastrarAnimal(req.body)); } catch (e) { next(e); }
    },
    editar(req, res, next) {
      try { res.status(200).json(animalService.editarAnimal(Number(req.params.id), req.body)); } catch (e) { next(e); }
    },
    excluir(req, res, next) {
      try { animalService.excluirAnimal(Number(req.params.id)); res.status(200).json({ mensagem: 'Animal excluído com sucesso.' }); } catch (e) { next(e); }
    },
    historico(req, res, next) {
      try { res.status(200).json(vacinacaoService.consultarHistoricoAnimal(Number(req.params.id))); } catch (e) { next(e); }
    },
  };
}

module.exports = { criarAnimalController };
