function DashboardStats({ isLoading, summary }) {
  const cards = [
    {
      label: "Total Tickets",
      value: summary.totalTickets,
      accent: "from-slate-900 to-slate-700",
    },
    {
      label: "Open Tickets",
      value: summary.openTickets,
      accent: "from-amber-500 to-orange-500",
    },
    {
      label: "Resolved Tickets",
      value: summary.resolvedTickets,
      accent: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="panel relative overflow-hidden rounded-3xl p-5"
        >
          <div
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`}
          />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {card.label}
          </p>
          <div className="mt-4">
            {isLoading ? (
              <div className="h-11 w-24 animate-pulse rounded-2xl bg-slate-200" />
            ) : (
              <p className="text-4xl font-black tracking-tight text-slate-900">
                {card.value}
              </p>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export default DashboardStats;

