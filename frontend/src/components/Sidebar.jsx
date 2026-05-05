export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 flex-col bg-slate-950 p-6 text-slate-100 shadow-2xl lg:flex">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">Workspace</h2>
        <p className="mt-2 text-sm text-slate-400">Premium control for your team and tasks.</p>
      </div>
      <nav className="space-y-3 text-sm">
        <button className="w-full rounded-3xl bg-slate-900/80 px-5 py-3 text-left font-medium text-white transition hover:bg-slate-800">
          Dashboard
        </button>
        <button className="w-full rounded-3xl bg-slate-900/80 px-5 py-3 text-left font-medium text-white transition hover:bg-slate-800">
          Tasks
        </button>
        <button className="w-full rounded-3xl bg-slate-900/80 px-5 py-3 text-left font-medium text-white transition hover:bg-slate-800">
          Members
        </button>
      </nav>
      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-400">
        <p className="font-semibold text-white">Pro features</p>
        <p className="mt-2">Faster assignment, clear progress tracking, and better visibility for your team.</p>
      </div>
    </aside>
  );
}
