import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { request } from "../api/client";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async ({ name, email, password }) => {
    try {
      setError("");
      const data = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      saveAuth(data);
      navigate("/dashboard");
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="px-4 py-16">
      <AuthForm title="Create your account" submitLabel="Register" onSubmit={handleSubmit} error={error} />
      <p className="mt-6 text-center text-sm">
        Already have an account? <Link to="/login" className="font-semibold text-brand-coral">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
