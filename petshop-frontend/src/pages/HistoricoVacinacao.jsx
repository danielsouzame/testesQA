import { useCallback, useState } from 'react';
import { useCarregarDados } from '../hooks/useCarregarDados';
import { listarAnimais } from '../services/animalService';
import { listarVacinas } from '../services/vacinaService';
import { listarHistoricoDoAnimal, registrarVacinacao, excluirVacinacao } from '../services/vacinacaoService';
import { obterMensagemErro } from '../services/api';
import VacinacaoForm from '../components/VacinacaoForm';
import VacinacaoList from '../components/VacinacaoList';
import Mensagem from '../components/Mensagem';

export default function HistoricoVacinacao() {
  const [animalId, setAnimalId] = useState('');
  const [mensagem, setMensagem] = useState({ tipo: 'sucesso', texto: '' });

  const { dados: animais, erro: erroAnimais } = useCarregarDados(listarAnimais);
  const { dados: vacinas } = useCarregarDados(listarVacinas);

  const buscarHistorico = useCallback(
    () => (animalId ? listarHistoricoDoAnimal(animalId) : Promise.resolve([])),
    [animalId]
  );
  const { dados: historico, carregando, erro: erroHistorico, recarregar } = useCarregarDados(buscarHistorico);

  async function registrar(valores) {
    try {
      await registrarVacinacao({ ...valores, animal_id: Number(animalId) });
      setMensagem({ tipo: 'sucesso', texto: 'Vacinação registrada com sucesso.' });
      await recarregar();
      return true;
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: obterMensagemErro(e) });
      return false;
    }
  }

  async function excluir(registro) {
    try {
      await excluirVacinacao(registro.id);
      setMensagem({ tipo: 'sucesso', texto: 'Registro de vacinação excluído com sucesso.' });
      await recarregar();
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: obterMensagemErro(e) });
    }
  }

  function selecionarAnimal(evento) {
    setAnimalId(evento.target.value);
    setMensagem({ tipo: 'sucesso', texto: '' });
  }

  return (
    <section aria-labelledby="titulo-historico">
      <h1 id="titulo-historico">Histórico de vacinação</h1>
      <Mensagem tipo="erro">{erroAnimais}</Mensagem>

      <div className="campo painel">
        <label htmlFor="historico-animal">Animal</label>
        <select id="historico-animal" value={animalId} onChange={selecionarAnimal}>
          <option value="">Selecione um animal</option>
          {(animais || []).map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.nome} (tutor: {animal.nome_tutor})
            </option>
          ))}
        </select>
      </div>

      <Mensagem tipo={mensagem.tipo}>{mensagem.texto}</Mensagem>

      {!animalId && <p className="lista-vazia">Selecione um animal para ver o histórico de vacinação.</p>}

      {animalId && (
        <>
          <Mensagem tipo="erro">{erroHistorico}</Mensagem>
          {carregando && !historico ? (
            <p>Carregando...</p>
          ) : (
            <VacinacaoList
              vacinacoes={historico || []}
              onExcluir={excluir}
              mensagemVazia="Este animal ainda não possui vacinações registradas."
            />
          )}
          <div className="painel">
            <VacinacaoForm vacinas={vacinas || []} onSalvar={registrar} />
          </div>
        </>
      )}
    </section>
  );
}
