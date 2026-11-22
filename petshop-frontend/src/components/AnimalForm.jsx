import { useEffect, useState } from 'react';
import { Campo, propsAcessibilidade } from './Campo';
import { ESPECIES, validarFormularioAnimal } from '../utils/validacoesFormulario';

const VALORES_VAZIOS = { nome: '', especie: '', raca: '', data_nascimento: '', nome_tutor: '' };

// Props:
// - valoresIniciais: animal a editar (com id) ou undefined para cadastro
// - onSalvar(valores): função (pode ser async) que retorna false quando o salvamento falha
// - onCancelar: chamado ao cancelar a edição
export default function AnimalForm({ valoresIniciais = VALORES_VAZIOS, onSalvar, onCancelar }) {
  const [valores, setValores] = useState({ ...VALORES_VAZIOS, ...valoresIniciais });
  const [erros, setErros] = useState({});
  const editando = Boolean(valoresIniciais.id);

  useEffect(() => {
    setValores({ ...VALORES_VAZIOS, ...valoresIniciais });
    setErros({});
  }, [valoresIniciais]);

  const alterar = (campo) => (evento) => setValores({ ...valores, [campo]: evento.target.value });

  async function enviar(evento) {
    evento.preventDefault();
    const encontrados = validarFormularioAnimal(valores);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const sucesso = await onSalvar(valores);
    if (sucesso !== false && !editando) setValores(VALORES_VAZIOS);
  }

  return (
    <form onSubmit={enviar} noValidate aria-label={editando ? 'Editar animal' : 'Cadastrar animal'}>
      <h2>{editando ? 'Editar animal' : 'Cadastrar animal'}</h2>

      <Campo id="animal-nome" rotulo="Nome do animal" erro={erros.nome}>
        <input id="animal-nome" type="text" value={valores.nome} onChange={alterar('nome')}
          {...propsAcessibilidade('animal-nome', erros.nome)} />
      </Campo>

      <Campo id="animal-especie" rotulo="Espécie" erro={erros.especie}>
        <select id="animal-especie" value={valores.especie} onChange={alterar('especie')}
          {...propsAcessibilidade('animal-especie', erros.especie)}>
          <option value="">Selecione</option>
          {ESPECIES.map((especie) => (
            <option key={especie} value={especie}>{especie}</option>
          ))}
        </select>
      </Campo>

      <Campo id="animal-raca" rotulo="Raça">
        <input id="animal-raca" type="text" value={valores.raca || ''} onChange={alterar('raca')} />
      </Campo>

      <Campo id="animal-nascimento" rotulo="Data de nascimento" erro={erros.data_nascimento}>
        <input id="animal-nascimento" type="date" value={valores.data_nascimento || ''}
          onChange={alterar('data_nascimento')}
          {...propsAcessibilidade('animal-nascimento', erros.data_nascimento)} />
      </Campo>

      <Campo id="animal-tutor" rotulo="Nome do tutor" erro={erros.nome_tutor}>
        <input id="animal-tutor" type="text" value={valores.nome_tutor} onChange={alterar('nome_tutor')}
          {...propsAcessibilidade('animal-tutor', erros.nome_tutor)} />
      </Campo>

      <div className="acoes">
        <button type="submit" className="primario">{editando ? 'Salvar alterações' : 'Cadastrar animal'}</button>
        {editando && <button type="button" onClick={onCancelar}>Cancelar edição</button>}
      </div>
    </form>
  );
}
