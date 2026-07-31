export function DashboardMockup() {
  return (
    <div className="rounded-xl border border-border-warm bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-muted uppercase tracking-wide">GS-SSP Operations Dashboard</span>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Today's Revenue", value: '$1,842' },
          { label: 'Active Bays', value: '6 / 6' },
          { label: 'Uptime', value: '99.8%' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-warm-off border border-border-warm p-3">
            <p className="text-[10px] text-muted">{s.label}</p>
            <p className="text-base font-bold text-ink mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-warm-off border border-border-warm p-3 flex items-end gap-1.5 h-20">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-brand/70" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
