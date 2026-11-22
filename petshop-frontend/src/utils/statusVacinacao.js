// O status é calculado pelo Backend. Aqui apenas decidimos como apresentá-lo.

export const STATUS = Object.freeze({
  VENCIDA: 'Vencida',
  EM_DIA: 'Em dia',
  VENCE_HOJE: 'Vence Hoje',
});

// Retorna { classe, icone, texto } para exibir o status com indicação visual.
export function obterIndicadorStatus(status) {
  switch (status) {
    case STATUS.VENCIDA:
      return { classe: 'status status-vencida', icone: '⚠', texto: 'Vencida' };
    case STATUS.EM_DIA:
      return { classe: 'status status-em-dia', icone: '✔', texto: 'Em dia' };
    case STATUS.VENCE_HOJE:
      return { classe: 'status status-vence-hoje', icone: '⏰', texto: 'Vence Hoje' };
    default:
      return { classe: 'status', icone: '', texto: 'Sem status' };
  }
}
