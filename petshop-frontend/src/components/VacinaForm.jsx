import { useEffect, useState } from 'react';
import { Campo, propsAcessibilidade } from './Campo';
import { validarFormularioVacina } from '../utils/validacoesFormulario';

const VALORES_VAZIOS = { nome: '', descricao: '', intervalo_dias: '' };

// Props: valoresIniciais (vacina a editar), onSalvar(dados), onCancelar
export default function VacinaForm({ valoresIniciais = VALORES_VAZIOS, onSalvar, onCancelar }) {
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
    const encontrados = validarFormularioVacina(valores);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const sucesso = await onSalvar({
      nome: valores.nome,
      descricao: valores.descricao,
      intervalo_dias: Number(valores.intervalo_dias),
    });
    if (sucesso !== false && !editando) setValores(VALORES_VAZIOS);
  }

  return (
    <form onSubmit={enviar} noValidate aria-label={editando ? 'Editar vacina' : 'Cadastrar vacina'}>
      <h2>{editando ? 'Editar vacina' : 'Cadastrar vacina'}</h2>

      <Campo id="vacina-nome" rotulo="Nome da vacina" erro={erros.nome}>
        <input id="vacina-nome" type="text" value={valores.nome} onChange={alterar('nome')}
          {...propsAcessibilidade('vacina-nome', erros.nome)} />
      </Campo>

      <Campo id="vacina-descricao" rotulo="Descrição">
        <textarea id="vacina-descricao" rows="3" value={valores.descricao || ''} onChange={alterar('descricao')} />
      </Campo>

      <Campo id="vacina-intervalo" rotulo="Intervalo entre doses (dias)" erro={erros.intervalo_dias}>
        <input id="vacina-intervalo" type="number" min="1" value={valores.intervalo_dias}
          onChange={alterar('intervalo_dias')}
          {...propsAcessibilidade('vacina-intervalo', erros.intervalo_dias)} />
      </Campo>

      <div className="acoes">
        <button type="submit" className="primario">{editando ? 'Salvar alterações' : 'Cadastrar vacina'}</button>
        {editando && <button type="button" onClick={onCancelar}>Cancelar edição</button>}
      </div>
    </form>
  );
}
