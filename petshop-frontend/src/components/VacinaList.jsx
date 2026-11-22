// Props: vacinas (lista), onEditar(vacina), onExcluir(vacina)
export default function VacinaList({ vacinas = [], onEditar, onExcluir }) {
  if (vacinas.length === 0) {
    return <p className="lista-vazia">Nenhuma vacina cadastrada.</p>;
  }
  return (
    <table>
      <caption>Vacinas cadastradas</caption>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Descrição</th>
          <th scope="col">Intervalo (dias)</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {vacinas.map((vacina) => (
          <tr key={vacina.id}>
            <td>{vacina.nome}</td>
            <td>{vacina.descricao || '-'}</td>
            <td>{vacina.intervalo_dias}</td>
            <td className="acoes">
              <button type="button" onClick={() => onEditar(vacina)} aria-label={`Editar ${vacina.nome}`}>Editar</button>
              <button type="button" className="perigo" onClick={() => onExcluir(vacina)} aria-label={`Excluir ${vacina.nome}`}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
