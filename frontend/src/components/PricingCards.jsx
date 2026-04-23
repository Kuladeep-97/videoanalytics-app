import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Validate content ideas before you spend hours editing.",
    features: ["3 analyses per day", "Basic SEO finder", "AI hooks and captions"]
  },
  {
    name: "Pro",
    price: "$19/mo",
    description: "For creators, agencies, and editors shipping content daily.",
    features: ["Unlimited analyses", "Advanced SEO finder", "Bulk hook generation", "Stripe or Razorpay billing"],
    featured: true
  }
];

function PricingCards({ onUpgrade = () => {} }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`rounded-[2rem] border p-8 shadow-card ${
            plan.featured
              ? "border-brand-coral bg-brand-ink text-white"
              : "border-brand-ink/10 bg-white text-brand-ink"
          }`}
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em]">{plan.name}</p>
          <h3 className="mt-3 font-display text-4xl font-semibold">{plan.price}</h3>
          <p className={`mt-4 text-sm ${plan.featured ? "text-white/80" : "text-brand-ink/70"}`}>
            {plan.description}
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          {plan.featured ? (
            <button
              onClick={onUpgrade}
              className="mt-8 rounded-full bg-brand-coral px-5 py-3 font-semibold text-white"
            >
              Upgrade to Pro
            </button>
          ) : (
            <Link
              to="/register"
              className="mt-8 inline-flex rounded-full bg-brand-sand px-5 py-3 font-semibold text-brand-ink"
            >
              Create free account
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

export default PricingCards;
