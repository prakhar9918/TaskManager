import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/Taskcard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", assignedTo: "" });
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
      if (res.data.length > 0 && !form.assignedTo) {
        setForm((prev) => ({ ...prev, assignedTo: res.data[0]._id }));
      }
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();

    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    }
  }, []);

  const createTask = async () => {
    if (!form.title || !form.description || !form.assignedTo) return;

    await API.post("/tasks", form);
    setForm({ title: "", description: "", assignedTo: users[0]?._id || "" });
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const taskStats = {
    todo: tasks.filter((task) => task.status === "TODO").length,
    inProgress: tasks.filter((task) => task.status === "IN_PROGRESS").length,
    done: tasks.filter((task) => task.status === "DONE").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="lg:flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          <div className="px-6 py-8 lg:px-10">
            <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="max-w-4xl">
                <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">Premium workspace</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Deliver assignments with clarity and speed.
                </h1>
                <p className="mt-4 max-w-3xl text-slate-400">
                  Manage your team across all projects with intuitive controls, instant insights, and a polished dashboard experience.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Pending</p>
                <p className="mt-4 text-3xl font-semibold text-white">{taskStats.todo}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">In progress</p>
                <p className="mt-4 text-3xl font-semibold text-white">{taskStats.inProgress}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Completed</p>
                <p className="mt-4 text-3xl font-semibold text-white">{taskStats.done}</p>
              </div>
            </div>

            {role === "ADMIN" && (
              <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-indigo-300">Admin panel</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">Assign a New Task</h2>
                    <p className="mt-2 text-slate-400">Select a member, enter task details, and assign instantly.</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-indigo-100/10 px-4 py-2 text-sm font-semibold text-indigo-200 ring-1 ring-indigo-500/20">
                    Admin only
                  </span>
                </div>

                <div className="mt-8 grid gap-4 xl:grid-cols-3">
                  <label className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                    <span className="block text-sm font-medium text-slate-300">Task Title</span>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Enter task title"
                    />
                  </label>

                  <label className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-4 xl:col-span-2">
                    <span className="block text-sm font-medium text-slate-300">Description</span>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Describe the work to be done"
                    />
                  </label>

                  <label className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                    <span className="block text-sm font-medium text-slate-300">Assign to</span>
                    <select
                      value={form.assignedTo}
                      onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                      className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-400">Your team will receive a polished task notification after assignment.</p>
                  <button
                    onClick={createTask}
                    className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
                  >
                    Assign Task
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-5 xl:grid-cols-2">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} updateStatus={updateStatus} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
