const GOOGLE_SUGGEST_URL = "https://suggestqueries.google.com/complete/search?client=firefox&q=";
const YOUTUBE_SUGGEST_URL = "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=";

const scoreKeyword = (keyword) => {
  const words = keyword.split(" ").length;
  if (words >= 5) {
    return "high";
  }
  if (words >= 3) {
    return "medium";
  }
  return "low";
};

const buildIdeas = (keyword, niche) => ({
  keyword,
  demandLevel: scoreKeyword(keyword),
  contentIdea: `Create a ${niche} short answering "${keyword}" with a strong before/after payoff and a CTA to save the video.`
});

const fetchSuggestions = async (url, niche) => {
  const response = await fetch(`${url}${encodeURIComponent(niche)}`);

  if (!response.ok) {
    throw new Error("Unable to fetch autocomplete suggestions");
  }

  const data = await response.json();
  return Array.isArray(data[1]) ? data[1] : [];
};

export const getSeoIdeas = async (niche, isPro) => {
  const [googleSuggestions, youtubeSuggestions] = await Promise.all([
    fetchSuggestions(GOOGLE_SUGGEST_URL, niche),
    fetchSuggestions(YOUTUBE_SUGGEST_URL, niche)
  ]);

  const combined = [...googleSuggestions, ...youtubeSuggestions]
    .map((keyword) => keyword.trim().toLowerCase())
    .filter(Boolean);

  const ranked = [...new Set(combined)]
    .sort((a, b) => b.length - a.length)
    .slice(0, isPro ? 20 : 8)
    .map((keyword) => buildIdeas(keyword, niche));

  return {
    niche,
    keywords: ranked,
    sources: {
      googleCount: googleSuggestions.length,
      youtubeCount: youtubeSuggestions.length
    }
  };
};
