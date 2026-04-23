import { Link } from "react-router-dom";

import HeroStats from "../components/HeroStats";
import PricingCards from "../components/PricingCards";
import SectionHeading from "../components/SectionHeading";
import { blogPosts } from "../data/blogPosts";

function LandingPage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-brand-coral">SEO + analytics for creators</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight text-brand-ink md:text-6xl">
            Why my reels not getting views? Find the reason, fix the hook, and publish smarter.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ink/80">
            Why My Video Flopped + SEO Finder helps creators understand why YouTube Shorts and Instagram Reels underperform,
            then turns real search demand into titles, hooks, captions, and next-video ideas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="rounded-full bg-brand-coral px-6 py-3 font-semibold text-white">
              Start free
            </Link>
            <Link to="/pricing" className="rounded-full border border-brand-ink/15 px-6 py-3 font-semibold text-brand-ink">
              See pricing
            </Link>
          </div>
          <div className="mt-12">
            <HeroStats />
          </div>
        </div>
        <div className="rounded-[2rem] border border-brand-ink/10 bg-white/90 p-6 shadow-card">
          <div className="rounded-[1.5rem] bg-brand-ink p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-sand">Built for Reels + Shorts</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Analyze, rank, generate, improve</h2>
            <div className="mt-6 space-y-4 text-sm text-white/80">
              <p>Spot low engagement and retention problems instantly.</p>
              <p>Pull Google and YouTube suggestions into ranked SEO opportunities.</p>
              <p>Generate viral hooks, captions, titles, and hashtags with OpenAI.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-brand-cream p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-moss">Landing SEO target</p>
              <p className="mt-2 text-sm">why my reels not getting views</p>
            </div>
            <div className="rounded-3xl bg-brand-cream p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-moss">Secondary keyword</p>
              <p className="mt-2 text-sm">why youtube shorts not getting views</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="How it works"
          title="One workflow for diagnosing bad performance and finding better ideas"
          description="Creators usually guess whether the problem is the hook, engagement, or topic. This workflow reduces that guesswork."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Analyze what failed",
              text: "Input platform, views, likes, comments, duration, and niche. The app flags weak hooks, low engagement, and retention risk."
            },
            {
              title: "Discover search intent",
              text: "SEO Finder combines Google autocomplete and YouTube suggestions to surface topics people are already searching."
            },
            {
              title: "Generate better creative",
              text: "Use AI to create viral hooks, captions, titles, and hashtags aligned with the topic and platform."
            }
          ].map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-brand-ink/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ink/80">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Pricing"
          title="Start free, upgrade when your content engine is working"
          description="Free gives creators enough room to validate the workflow. Pro removes limits and unlocks deeper keyword discovery."
        />
        <div className="mt-10">
          <PricingCards />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Blog"
          title="SEO-rich content for creators searching for answers"
          description="These starter articles support the landing page keyword strategy and can be expanded into full content marketing pages."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-[2rem] border border-brand-ink/10 bg-white p-6 shadow-card">
              <h3 className="font-display text-2xl font-semibold capitalize">{post.title}</h3>
              <p className="mt-4 text-sm font-semibold text-brand-moss">{post.excerpt}</p>
              <p className="mt-4 text-sm leading-7 text-brand-ink/80">{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default LandingPage;
