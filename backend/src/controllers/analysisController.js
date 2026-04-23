import { UsageLog } from "../models/UsageLog.js";
import { analyzeVideoPerformance } from "../services/analysisService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const analyzeVideo = asyncHandler(async (req, res) => {
  const result = analyzeVideoPerformance(req.body);

  await UsageLog.create({
    userId: req.user._id,
    type: "analysis",
    meta: {
      platform: req.body.platform,
      niche: req.body.niche
    }
  });

  res.json(result);
});
