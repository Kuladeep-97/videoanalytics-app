import { getSeoIdeas } from "../services/seoService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const fetchSeoIdeas = asyncHandler(async (req, res) => {
  const { niche } = req.query;
  const data = await getSeoIdeas(niche, req.user.plan === "pro");
  res.json(data);
});
