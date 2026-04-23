function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-brand-coral">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold text-brand-ink md:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-brand-ink/80">{description}</p>
    </div>
  );
}

export default SectionHeading;
