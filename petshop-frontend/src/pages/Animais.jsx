import { useState } from 'react';
import { useCarregarDados } from '../hooks/useCarregarDados';
import { listarAnimais, criarAnimal, atualizarAnimal, excluirAnimal } from '../services/animalService';
import { obterMensagemErro } from '../services/api';
import AnimalForm from '../components/AnimalForm';
import AnimalList from '../components/AnimalList';
import Mensagem from '../components/Mensagem';

export default function Animais() {
  const { dados: animais, carregando, erro, recarregar } = useCarregarDados(listarAnimais);
  const [animalEmEdicao, setAnimalEmEdicao] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: 'sucesso', texto: '' });

  async function salvar(valores) {
    try {
      if (animalEmEdicao) {
        await atualizarAnimal(animalEmEdicao.id, valores);
        setAnimalEmEdicao(null);
        setMensagem({ tipo: 'sucesso', texto: 'Animal atualizado com sucesso.' });
      } else {
        await criarAnimal(valores);
        setMensagem({ tipo: 'sucesso', texto: 'Animal cadastrado com sucesso.' });
      }
      await recarregar();
      return true;
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: obterMensagemErro(e) });
      return false;
    }
  }

  async function excluir(animal) {
    try {
      await excluirAnimal(animal.id);
      setMensagem({ tipo: 'sucesso', texto: 'Animal excluído com sucesso.' });
      await recarregar();
    } catch (e) {
      setMensagem({ tipo: 'erro', texto: obterMensagemErro(e) });
    }
  }

  return (
    <section aria-labelledby="titulo-animais">
      <h1 id="titulo-animais">Animais</h1>
      <Mensagem tipo={mensagem.tipo}>{mensagem.texto}</Mensagem>
      <div className="painel">
        <AnimalForm
          valoresIniciais={animalEmEdicao || undefined}
          onSalvar={salvar}
          onCancelar={() => setAnimalEmEdicao(null)}
        />
      </div>
      <Mensagem tipo="erro">{erro}</Mensagem>
      {carregando && !animais ? (
        <p>Carregando...</p>
      ) : (
        <AnimalList animais={animais || []} onEditar={setAnimalEmEdicao} onExcluir={excluir} />
      )}
    </section>
  );
}
