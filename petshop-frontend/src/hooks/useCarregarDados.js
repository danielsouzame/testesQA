import { useCallback, useEffect, useState } from 'react';
import { obterMensagemErro } from '../services/api';

// Executa uma função de busca ao montar o componente e controla carregando/erro.
// A função `buscar` precisa ter identidade estável (função de módulo ou useCallback).
// Se `buscar` for null, nada é carregado.
export function useCarregarDados(buscar) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(Boolean(buscar));
  const [erro, setErro] = useState('');

  const recarregar = useCallback(async () => {
    if (!buscar) {
      setDados(null);
      setCarregando(false);
      return;
    }
    setCarregando(true);
    try {
      setDados(await buscar());
      setErro('');
    } catch (e) {
      setErro(obterMensagemErro(e));
    } finally {
      setCarregando(false);
    }
  }, [buscar]);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { dados, carregando, erro, recarregar };
}
