// Props: resumo = { totalAnimais, totalVacinas, vacinacoesVencidas, vacinacoesEmDia, vacinacoesVencemHoje }
export default function ResumoDashboard({ resumo }) {
  const itens = [
    { rotulo: 'Animais cadastrados', valor: resumo.totalAnimais, classe: '' },
    { rotulo: 'Vacinas cadastradas', valor: resumo.totalVacinas, classe: '' },
    { rotulo: 'Vacinações vencidas', valor: resumo.vacinacoesVencidas, classe: 'destaque-vencida' },
    { rotulo: 'Vacinações em dia', valor: resumo.vacinacoesEmDia, classe: 'destaque-em-dia' },
    { rotulo: 'Vacinações que vencem hoje', valor: resumo.vacinacoesVencemHoje, classe: 'destaque-hoje' },
  ];
  return (
    <dl className="resumo">
      {itens.map((item) => (
        <div key={item.rotulo} className={`resumo-item ${item.classe}`}>
          <dt>{item.rotulo}</dt>
          <dd>{item.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
