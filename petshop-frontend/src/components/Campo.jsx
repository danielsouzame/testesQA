// Agrupa rótulo + campo + mensagem de validação.
// O <label> é associado ao campo pelo `id`, o que facilita encontrá-lo nos testes (getByLabelText).
export function Campo({ id, rotulo, erro, children }) {
  return (
    <div className="campo">
      <label htmlFor={id}>{rotulo}</label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="erro-campo" role="alert">
          {erro}
        </p>
      )}
    </div>
  );
}

// Props de acessibilidade para o input/select quando há erro.
export function propsAcessibilidade(id, erro) {
  return erro ? { 'aria-invalid': true, 'aria-describedby': `${id}-erro` } : {};
}
