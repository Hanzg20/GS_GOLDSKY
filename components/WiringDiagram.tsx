export function WiringDiagram() {
  const nodes = [
    { label: 'Payment Terminal', x: 40, y: 20 },
    { label: 'Relay / Valve Output', x: 40, y: 220 },
    { label: 'Sensors (GPIO)', x: 460, y: 20 },
    { label: '12–24VDC Power', x: 460, y: 220 },
  ];
  return (
    <svg viewBox="0 0 620 280" className="w-full h-auto" role="img" aria-label="Edge Controller wiring diagram">
      {nodes.map((n) => (
        <line
          key={n.label}
          x1={n.x < 300 ? n.x + 150 : n.x}
          y1={n.y + 20}
          x2={310}
          y2={140}
          stroke="#C8C3B8"
          strokeWidth={1.5}
        />
      ))}
      <rect x="250" y="100" width="120" height="80" rx="10" fill="#1A1A18" />
      <text x="310" y="135" textAnchor="middle" fill="#F5F0E8" fontSize="11" fontWeight="700">
        GS-SSP
      </text>
      <text x="310" y="150" textAnchor="middle" fill="#A8A09A" fontSize="9">
        Edge Controller
      </text>
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x} y={n.y} width="150" height="40" rx="8" fill="#FFFFFF" stroke="#E5E1D8" />
          <text x={n.x + 75} y={n.y + 24} textAnchor="middle" fill="#3D3D3A" fontSize="10.5" fontWeight="600">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
