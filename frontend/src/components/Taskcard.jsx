export default function TaskCard({ task, updateStatus }) {
  const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No deadline";

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/60 bg-white/95 p-6 shadow-2xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
      <div className="relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{task.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{task.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Assigned by</span>
                <span className="mt-1 block font-semibold text-slate-900">{task.assignedBy?.name || "Unknown"}</span>
              </div>
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">Due date</span>
                <span className="mt-1 block font-semibold text-slate-900">{dueDate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-3xl bg-slate-950/5 p-4 text-sm text-slate-700 shadow-sm md:items-end">
            <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700">
              {task.status.replace("_", " ")}
            </span>
            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
