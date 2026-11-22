import StatusVacinacao from './StatusVacinacao';
import { formatarDataBR } from '../utils/datas';

// Props:
// - vacinacoes: registros (cada um já traz `status` calculado pelo Backend)
// - onExcluir(registro): opcional; sem ele a coluna de ações não aparece
// - mensagemVazia: texto exibido quando não há registros
export default function VacinacaoList({
  vacinacoes = [],
  onExcluir,
  mensagemVazia = 'Nenhuma vacinação registrada.',
}) {
  if (vacinacoes.length === 0) {
    return <p className="lista-vazia">{mensagemVazia}</p>;
  }
  return (
    <table>
      <caption>Histórico de vacinação</caption>
      <thead>
        <tr>
          <th scope="col">Vacina</th>
          <th scope="col">Data da aplicação</th>
          <th scope="col">Próxima dose</th>
          <th scope="col">Status</th>
          {onExcluir && <th scope="col">Ações</th>}
        </tr>
      </thead>
      <tbody>
        {vacinacoes.map((registro) => (
          <tr key={registro.id}>
            <td>{registro.vacina_nome}</td>
            <td>{formatarDataBR(registro.data_vacinacao)}</td>
            <td>{formatarDataBR(registro.data_proxima_dose)}</td>
            <td><StatusVacinacao status={registro.status} /></td>
            {onExcluir && (
              <td className="acoes">
                <button type="button" className="perigo" onClick={() => onExcluir(registro)}
                  aria-label={`Excluir vacinação ${registro.vacina_nome} de ${formatarDataBR(registro.data_vacinacao)}`}>
                  Excluir
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
