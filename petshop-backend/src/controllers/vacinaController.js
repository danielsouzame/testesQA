// Controllers apenas traduzem HTTP <-> service. Nenhuma regra de negócio aqui.
// Erros são repassados ao middleware de tratamento via next(erro).

function criarVacinaController(vacinaService) {
  return {
    listar(req, res, next) {
      try { res.status(200).json(vacinaService.listarVacinas()); } catch (e) { next(e); }
    },
    consultar(req, res, next) {
      try { res.status(200).json(vacinaService.consultarVacina(Number(req.params.id))); } catch (e) { next(e); }
    },
    cadastrar(req, res, next) {
      try { res.status(201).json(vacinaService.cadastrarVacina(req.body)); } catch (e) { next(e); }
    },
    editar(req, res, next) {
      try { res.status(200).json(vacinaService.editarVacina(Number(req.params.id), req.body)); } catch (e) { next(e); }
    },
    excluir(req, res, next) {
      try { vacinaService.excluirVacina(Number(req.params.id)); res.status(200).json({ mensagem: 'Vacina excluída com sucesso.' }); } catch (e) { next(e); }
    },
  };
}

module.exports = { criarVacinaController };
