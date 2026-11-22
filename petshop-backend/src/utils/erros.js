// Erros específicos da aplicação. Cada um carrega o código HTTP correspondente.

class ErroValidacao extends Error {
  // `erros` é uma lista de { campo, mensagem }
  constructor(erros = []) {
    super('Dados inválidos.');
    this.name = 'ErroValidacao';
    this.status = 400;
    this.erros = erros;
  }
}

class ErroNaoEncontrado extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroNaoEncontrado';
    this.status = 404;
  }
}

class ErroConflito extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ErroConflito';
    this.status = 409;
  }
}

module.exports = { ErroValidacao, ErroNaoEncontrado, ErroConflito };
