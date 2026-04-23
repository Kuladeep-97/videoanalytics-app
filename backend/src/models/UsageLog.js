import mongoose from "mongoose";

const usageLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["analysis", "seo", "hooks"],
      required: true
    },
    meta: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

usageLogSchema.index({ userId: 1, type: 1, createdAt: 1 });

export const UsageLog = mongoose.model("UsageLog", usageLogSchema);
