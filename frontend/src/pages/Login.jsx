import { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-6 top-28 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.18),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-10 max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl lg:mb-0 lg:w-1/2">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Team productivity</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Login to your premium task workspace
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Securely access your dashboard, assign work, and keep every project moving with clarity and style.
          </p>
          <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Fast login</p>
              <p className="mt-2">Sign in quickly and get straight to work.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">Secure access</p>
              <p className="mt-2">Tokens and secure auth keep data protected.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/95 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Welcome back</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Login</h2>
            <p className="mt-3 text-slate-400">Enter your details to continue to your workspace.</p>
          </div>

          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-300">
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Password
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Enter your password"
              />
            </label>

            <button
              onClick={login}
              className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            New here? <a href="/signup" className="font-semibold text-indigo-300 hover:text-indigo-200">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
