const round = (value) => Number(value.toFixed(2));

export const analyzeVideoPerformance = ({ platform, views, likes, comments, duration, niche }) => {
  const safeViews = Math.max(Number(views), 1);
  const likeRate = round((Number(likes) / safeViews) * 100);
  const commentRate = round((Number(comments) / safeViews) * 100);
  const issues = [];
  const fixes = [];

  if (likeRate < 2) {
    issues.push("Low engagement rate suggests the content did not trigger a strong emotional or curiosity response.");
    fixes.push("Test a more provocative opening line and show the payoff in the first 2 seconds.");
  }

  if (Number(views) < 1000) {
    issues.push(`Your ${platform} likely has a weak hook or low first-second retention because the video never escaped early testing.`);
    fixes.push("Lead with a pattern interrupt, promise a specific result, and remove slow intros.");
  }

  if (Number(duration) > 20) {
    issues.push("Retention risk is high because longer short-form videos need stronger pacing to hold attention.");
    fixes.push("Tighten the script to 12-20 seconds or add faster scene changes every 2-3 seconds.");
  }

  if (commentRate < 0.2) {
    issues.push("Low comment rate means the post is not inviting conversation or controversy.");
    fixes.push("End with a polarizing question or ask viewers to comment their opinion or experience.");
  }

  if (issues.length === 0) {
    issues.push("Core performance signals look healthy, so the next bottleneck may be topic selection, posting consistency, or thumbnail/text overlay quality.");
    fixes.push("Double down on the best-performing topic angle and publish 3-5 variations with different hooks.");
  }

  return {
    summary: `Performance review for ${platform} in the ${niche} niche.`,
    metrics: {
      likeRate,
      commentRate
    },
    issues,
    fixes
  };
};
