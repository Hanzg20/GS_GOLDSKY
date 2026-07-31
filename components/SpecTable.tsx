export function SpecTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; values: string[] }[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border-warm">
      <table className="w-full text-sm text-left border-collapse min-w-[560px]">
        <thead>
          <tr className="bg-warm-dark text-hero-fg">
            <th className="p-3.5 font-semibold text-xs uppercase tracking-wide">Spec</th>
            {columns.map((col) => (
              <th key={col} className="p-3.5 font-semibold text-xs uppercase tracking-wide font-mono">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-warm-off'}>
              <td className="p-3.5 font-medium text-ink border-t border-border-warm">{row.label}</td>
              {row.values.map((v, j) => (
                <td key={j} className="p-3.5 font-mono text-steel border-t border-border-warm">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
