import { obterIndicadorStatus } from '../utils/statusVacinacao';

// Selo visual do status da vacinação (Vencida, Em dia, Vence Hoje).
export default function StatusVacinacao({ status }) {
  const { classe, icone, texto } = obterIndicadorStatus(status);
  return (
    <span className={classe}>
      <span aria-hidden="true">{icone}</span> {texto}
    </span>
  );
}
