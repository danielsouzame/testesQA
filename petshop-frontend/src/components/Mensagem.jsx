// Mensagem de sucesso ou erro. Não renderiza nada quando não há texto.
export default function Mensagem({ tipo = 'sucesso', children }) {
  if (!children) return null;
  return (
    <p className={`mensagem mensagem-${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
      {children}
    </p>
  );
}
