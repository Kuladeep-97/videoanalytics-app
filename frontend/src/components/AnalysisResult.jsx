function AnalysisResult({ data }) {
  if (!data) return null;

  // 🔥 CLEAN TEXT (removes AI junk)
  const clean = (text) =>
    text
      ?.replace(/\*\*/g, "")
      ?.replace(/["']/g, "")
      ?.replace(/\d+\.\s*/g, "")
      ?.trim();

  // 🔥 SPLIT INTO BLOCKS
  const sections = data.result?.split("\n\n") || [];

  return (
    <section className="rounded-[2rem] border border-brand-ink/10 bg-white p-6 shadow-card space-y-6">
      
      <h3 className="font-display text-2xl font-semibold text-brand-ink">
        Video Analysis
      </h3>

      {/* 📊 METRICS */}
      {data.metrics && (
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-moss">
            Performance Metrics
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              ["Like Rate", data.metrics.likeRate + "%"],
              ["Comment Rate", data.metrics.commentRate + "%"],
              ["Engagement", data.metrics.engagementScore + "%"],
              ["Hook Quality", data.metrics.hookQuality]
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-brand-sand/50 p-3">
                <p className="text-xs text-brand-ink/60">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🎧 TRANSCRIPT */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-moss">
          Transcript
        </p>
        <p className="mt-2 text-sm text-brand-ink/75 whitespace-pre-wrap">
          {data.transcript || "No transcript available"}
        </p>
      </div>

      {/* 🔥 INSIGHTS (CLEANED OUTPUT) */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-coral">
          Insights
        </p>

        <div className="mt-3 space-y-3">
          {sections.map((block, i) => (
            <div
              key={i}
              className="bg-brand-sand/40 rounded-xl p-4 text-sm text-brand-ink"
            >
              {clean(block)}
            </div>
          ))}
        </div>
      </div>

      {/* 💡 HIGHLIGHT: IMPROVED HOOK */}
      {data.result && (
        <div className="bg-brand-coral/10 border border-brand-coral/20 p-4 rounded-xl">
          <p className="text-xs uppercase text-brand-coral font-semibold mb-1">
            Suggested Hook
          </p>
          <p className="text-sm font-medium">
            {clean(
              data.result.match(/improved hook:(.*)/i)?.[1] || ""
            )}
          </p>
        </div>
      )}
    </section>
  );
}

export default AnalysisResult;