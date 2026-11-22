import { useState } from 'react';
import { useCarregarDados } from '../hooks/useCarregarDados';
import { listarVacinas, criarVacina, atualizarVacina, excluirVacina } from '../services/vacinaService';
import { obterMensagemErro } from '../services/api';
import VacinaForm from '../components/VacinaForm';
import VacinaList from '../components/VacinaList';
import Mensagem from '../components/Mensagem';

export default function Vacinas() {
  const { dados: vacinas, carregando, erro, recarregar } = useCarregarDados(listarVacinas);
  const [vacinaEmEdicao, setVacinaEmEdicao] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: 'sucesso', texto: '' });

  async function salvar(valores) {
    try {
      if (vacinaEmEdicao) {
        await atualizarVacina(vacinaEmEdicao.id, valores);
        setVacinaEmEdicao(null);
        setMensagem({ tipo: 'sucesso', texto: 'Vacina atualizada com sucesso.' });
      } else {
        await criarVacina(valores);
        setMensagem({ tipo: 'sucesso', texto: 'Vacina cadastrada com sucesso.' });
      }
      await recarregar();
      return true;
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: obterMensagemErro(e) });
      return false;
    }
  }

  async function excluir(vacina) {
    try {
      await excluirVacina(vacina.id);
      setMensagem({ tipo: 'sucesso', texto: 'Vacina excluída com sucesso.' });
      await recarregar();
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: obterMensagemErro(e) });
    }
  }

  return (
    <section aria-labelledby="titulo-vacinas">
      <h1 id="titulo-vacinas">Vacinas</h1>
      <Mensagem tipo={mensagem.tipo}>{mensagem.texto}</Mensagem>
      <div className="painel">
        <VacinaForm
          valoresIniciais={vacinaEmEdicao || undefined}
          onSalvar={salvar}
          onCancelar={() => setVacinaEmEdicao(null)}
        />
      </div>
      <Mensagem tipo="erro">{erro}</Mensagem>
      {carregando && !vacinas ? (
        <p>Carregando...</p>
      ) : (
        <VacinaList vacinas={vacinas || []} onEditar={setVacinaEmEdicao} onExcluir={excluir} />
      )}
    </section>
  );
}
