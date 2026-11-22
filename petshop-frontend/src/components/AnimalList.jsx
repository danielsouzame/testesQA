import { formatarDataBR } from '../utils/datas';

// Props: animais (lista), onEditar(animal), onExcluir(animal)
export default function AnimalList({ animais = [], onEditar, onExcluir }) {
  if (animais.length === 0) {
    return <p className="lista-vazia">Nenhum animal cadastrado.</p>;
  }
  return (
    <table>
      <caption>Animais cadastrados</caption>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Espécie</th>
          <th scope="col">Raça</th>
          <th scope="col">Nascimento</th>
          <th scope="col">Tutor</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        {animais.map((animal) => (
          <tr key={animal.id}>
            <td>{animal.nome}</td>
            <td>{animal.especie}</td>
            <td>{animal.raca || '-'}</td>
            <td>{formatarDataBR(animal.data_nascimento)}</td>
            <td>{animal.nome_tutor}</td>
            <td className="acoes">
              <button type="button" onClick={() => onEditar(animal)} aria-label={`Editar ${animal.nome}`}>Editar</button>
              <button type="button" className="perigo" onClick={() => onExcluir(animal)} aria-label={`Excluir ${animal.nome}`}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
