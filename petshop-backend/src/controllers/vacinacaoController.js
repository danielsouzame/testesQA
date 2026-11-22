// Controllers apenas traduzem HTTP <-> service. Nenhuma regra de negócio aqui.

function criarVacinacaoController(vacinacaoService) {
  return {
    listar(req, res, next) {
      try { res.status(200).json(vacinacaoService.listarVacinacoes()); } catch (e) { next(e); }
    },
    registrar(req, res, next) {
      try { res.status(201).json(vacinacaoService.registrarVacinacao(req.body)); } catch (e) { next(e); }
    },
    excluir(req, res, next) {
      try { vacinacaoService.excluirVacinacao(Number(req.params.id)); res.status(200).json({ mensagem: 'Registro de vacinação excluído com sucesso.' }); } catch (e) { next(e); }
    },
  };
}

module.exports = { criarVacinacaoController };
