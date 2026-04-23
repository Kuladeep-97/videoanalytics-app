import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { request } from "../api/client";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async ({ email, password }) => {
    try {
      setError("");
      const data = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      saveAuth(data);
      navigate("/dashboard");
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="px-4 py-16">
      <AuthForm title="Login to your account" submitLabel="Login" onSubmit={handleSubmit} error={error} />
      <p className="mt-6 text-center text-sm">
        Need an account? <Link to="/register" className="font-semibold text-brand-coral">Create one</Link>
      </p>
    </section>
  );
}

export default LoginPage;
