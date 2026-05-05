import { useState } from "react";
import API from "../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "MEMBER" });

  const signup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("User created");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-12 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute right-14 top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(14,165,233,0.16),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-10 max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl lg:mb-0 lg:w-1/2">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Join the team</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Create your account with confidence
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Register and start assigning or completing tasks on a polished and responsive dashboard built for teams.
          </p>
          <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Smooth onboarding</p>
              <p className="mt-2">Easy signup for members and admins.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Modern experience</p>
              <p className="mt-2">A premium interface for every screen.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Sign up</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Create an account</h2>
            <p className="mt-3 text-slate-400">Join today and collaborate seamlessly with your team.</p>
          </div>

          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-300">
              Full name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                placeholder="Jane Doe"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Password
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                placeholder="Create a strong password"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Role
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>

            <button
              onClick={signup}
              className="w-full rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
