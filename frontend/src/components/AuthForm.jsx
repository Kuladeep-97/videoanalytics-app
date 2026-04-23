import { useState } from "react";

function AuthForm({ title, submitLabel, onSubmit, error }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-brand-ink/10 bg-white p-8 shadow-card">
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {title.includes("Create") && (
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Name</span>
            <input
              className="w-full rounded-2xl border border-brand-ink/15 px-4 py-3"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        )}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Email</span>
          <input
            className="w-full rounded-2xl border border-brand-ink/15 px-4 py-3"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Password</span>
          <input
            className="w-full rounded-2xl border border-brand-ink/15 px-4 py-3"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded-full bg-brand-coral px-5 py-3 font-semibold text-white">
          {submitLabel}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
