import { UsageLog } from "../models/UsageLog.js";

export const enforceAnalysisQuota = async (req, res, next) => {
  if (req.user.plan === "pro") {
    return next();
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const count = await UsageLog.countDocuments({
    userId: req.user._id,
    type: "analysis",
    createdAt: { $gte: todayStart }
  });

  if (count >= 3) {
    return res.status(403).json({
      message: "Free plan limit reached. Upgrade to Pro for unlimited analyses."
    });
  }

  next();
};
