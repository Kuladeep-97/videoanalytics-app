import { useState } from "react";

import { request } from "../api/client";
import PricingCards from "../components/PricingCards";
import SectionHeading from "../components/SectionHeading";
import { useAuth } from "../context/AuthContext";

function PricingPage() {
  const { token } = useAuth();
  const [error, setError] = useState("");

  const handleUpgrade = async () => {
    if (!token) {
      setError("Create an account and log in before starting checkout.");
      return;
    }

    try {
      setError("");
      const response = await request("/payments/checkout", { method: "POST" });
      if (response.provider === "stripe" && response.url) {
        window.location.href = response.url;
        return;
      }

      if (response.provider === "razorpay") {
        setError("Razorpay order created. Wire its checkout script in production using the returned order payload.");
      }
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple creator pricing"
        description="Use the free plan to test a few videos each day, then move to Pro when you want unlimited diagnostics and deeper SEO research."
      />
      <div className="mt-10">
        <PricingCards onUpgrade={handleUpgrade} />
      </div>
      {error ? <p className="mt-6 text-sm text-red-600">{error}</p> : null}
    </section>
  );
}

export default PricingPage;
