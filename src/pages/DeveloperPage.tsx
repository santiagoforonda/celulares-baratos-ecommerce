export const DeveloperPage = () => {
  const stack = ["React 19", "TypeScript", "TailwindCSS", "Supabase", "React Query"];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-900/60 bg-slate-950 p-8 text-slate-100 shadow-[0_24px_80px_-28px_rgba(6,182,212,0.5)] sm:p-10">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,_rgba(148,163,184,0.08)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(148,163,184,0.08)_1px,_transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative space-y-8">
        <div className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
          Developer Hub
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="font-['Montserrat_Alternates'] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Construyendo experiencias de eCommerce con codigo limpio y rendimiento real.
          </h1>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Esta pagina concentra el enfoque tecnico de CelularesBaratos: arquitectura modular,
            interfaz escalable y despliegues estables para acelerar cada nueva funcionalidad.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stack.map((tech, index) => (
            <article
              key={tech}
              className="rounded-xl border border-slate-700/70 bg-slate-900/70 px-4 py-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-[0_10px_25px_-12px_rgba(34,211,238,0.9)]"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className="text-center text-sm font-semibold tracking-wide text-slate-100">{tech}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
