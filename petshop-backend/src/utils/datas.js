// Funções puras para trabalhar com datas no formato 'AAAA-MM-DD'.
// Trabalhamos com texto (e não com objetos Date) para evitar problemas de fuso horário.

const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;

function ehDataValida(valor) {
  if (typeof valor !== 'string' || !FORMATO_DATA.test(valor)) return false;
  const [ano, mes, dia] = valor.split('-').map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  return (
    data.getUTCFullYear() === ano &&
    data.getUTCMonth() === mes - 1 &&
    data.getUTCDate() === dia
  );
}

// Retorna a data de hoje (local) como 'AAAA-MM-DD'.
function obterDataHoje() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

// Retorna -1, 0 ou 1 conforme a primeira data seja anterior, igual ou posterior à segunda.
function compararDatas(dataA, dataB) {
  if (dataA < dataB) return -1;
  if (dataA > dataB) return 1;
  return 0;
}

// Soma `dias` a uma data 'AAAA-MM-DD' e devolve o resultado no mesmo formato.
function somarDias(data, dias) {
  const [ano, mes, dia] = data.split('-').map(Number);
  const resultado = new Date(Date.UTC(ano, mes - 1, dia + dias));
  return resultado.toISOString().slice(0, 10);
}

module.exports = { ehDataValida, obterDataHoje, compararDatas, somarDias };
