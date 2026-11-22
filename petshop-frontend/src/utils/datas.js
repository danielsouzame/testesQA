// Funções puras de data (formato 'AAAA-MM-DD').

export function obterDataHoje() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

// '2026-11-18' -> '18/11/2026'. Valores vazios viram '-'.
export function formatarDataBR(data) {
  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) return '-';
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}
