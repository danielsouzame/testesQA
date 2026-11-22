// Funções puras para tratamento de texto.

// Remove espaços das pontas. Qualquer valor que não seja texto vira ''.
function limparTexto(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

// Normaliza um nome para comparação (RN02): sem espaços nas pontas e em minúsculas.
function normalizarNome(nome) {
  return limparTexto(nome).toLowerCase();
}

module.exports = { limparTexto, normalizarNome };
