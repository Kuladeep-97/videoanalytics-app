const stats = [
  { label: "Free daily analyses", value: "3" },
  { label: "AI hooks per run", value: "10" },
  { label: "Keywords ranked", value: "20" }
];

function HeroStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-3xl border border-brand-ink/10 bg-white/80 p-5 shadow-card">
          <div className="text-3xl font-bold text-brand-moss">{stat.value}</div>
          <div className="mt-2 text-sm text-brand-ink/70">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;
