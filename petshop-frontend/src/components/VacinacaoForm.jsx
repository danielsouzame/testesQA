import { useState } from 'react';
import { Campo, propsAcessibilidade } from './Campo';
import { validarFormularioVacinacao } from '../utils/validacoesFormulario';

const VALORES_VAZIOS = { vacina_id: '', data_vacinacao: '', data_proxima_dose: '' };

// Props: vacinas (opções do select), onSalvar({ vacina_id, data_vacinacao, data_proxima_dose })
// O animal é escolhido na página; este formulário só coleta os dados da aplicação.
export default function VacinacaoForm({ vacinas = [], onSalvar }) {
  const [valores, setValores] = useState(VALORES_VAZIOS);
  const [erros, setErros] = useState({});

  const alterar = (campo) => (evento) => setValores({ ...valores, [campo]: evento.target.value });

  async function enviar(evento) {
    evento.preventDefault();
    const encontrados = validarFormularioVacinacao(valores);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const sucesso = await onSalvar({
      vacina_id: Number(valores.vacina_id),
      data_vacinacao: valores.data_vacinacao,
      data_proxima_dose: valores.data_proxima_dose || undefined,
    });
    if (sucesso !== false) setValores(VALORES_VAZIOS);
  }

  return (
    <form onSubmit={enviar} noValidate aria-label="Registrar vacinação">
      <h2>Registrar vacinação</h2>

      <Campo id="vacinacao-vacina" rotulo="Vacina" erro={erros.vacina_id}>
        <select id="vacinacao-vacina" value={valores.vacina_id} onChange={alterar('vacina_id')}
          {...propsAcessibilidade('vacinacao-vacina', erros.vacina_id)}>
          <option value="">Selecione</option>
          {vacinas.map((vacina) => (
            <option key={vacina.id} value={vacina.id}>{vacina.nome}</option>
          ))}
        </select>
      </Campo>

      <Campo id="vacinacao-data" rotulo="Data da vacinação" erro={erros.data_vacinacao}>
        <input id="vacinacao-data" type="date" value={valores.data_vacinacao}
          onChange={alterar('data_vacinacao')}
          {...propsAcessibilidade('vacinacao-data', erros.data_vacinacao)} />
      </Campo>

      <Campo id="vacinacao-proxima" rotulo="Próxima dose (opcional)" erro={erros.data_proxima_dose}>
        <input id="vacinacao-proxima" type="date" value={valores.data_proxima_dose}
          onChange={alterar('data_proxima_dose')}
          {...propsAcessibilidade('vacinacao-proxima', erros.data_proxima_dose)} />
        <p className="dica">Se ficar em branco, a data é calculada pelo intervalo da vacina.</p>
      </Campo>

      <div className="acoes">
        <button type="submit" className="primario">Registrar vacinação</button>
      </div>
    </form>
  );
}
