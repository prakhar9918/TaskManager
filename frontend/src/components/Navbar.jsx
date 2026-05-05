export default function Navbar() {
  return (
    <div className="bg-slate-950/95 border-b border-slate-800 px-6 py-5 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Task Manager</h2>
          <p className="text-sm text-slate-400">Organize work, assign tasks, and track progress with premium clarity.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
