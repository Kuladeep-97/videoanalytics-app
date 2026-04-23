import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import OpenAI from "openai";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const processVideo = async (req, res) => {
  try {
    // 🔍 DEBUG (KEEP THIS FOR NOW)
    console.log("==== DEBUG START ====");
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("==== DEBUG END ====");

    // 🚨 FILE CHECK (but show real error)
    if (!req.file) {
      return res.status(400).json({
        message: "Video file is required",
        debug: {
          body: req.body,
          contentType: req.headers["content-type"],
        },
      });
    }

    const videoPath = req.file.path;
    const audioPath = path.resolve("uploads", `${Date.now()}-audio.wav`);

    // ✅ METRICS
    const viewsNum = Number(req.body.views) || 0;
    const likesNum = Number(req.body.likes) || 0;
    const commentsNum = Number(req.body.comments) || 0;
    const durationNum = Number(req.body.duration) || 0;

    const likeRate = viewsNum > 0 ? (likesNum / viewsNum) * 100 : 0;
    const commentRate = viewsNum > 0 ? (commentsNum / viewsNum) * 100 : 0;
    const engagementScore =
      viewsNum > 0 ? ((likesNum + commentsNum) / viewsNum) * 100 : 0;

    let hookQuality = "Average";
    if (likeRate < 2) hookQuality = "Weak";
    else if (likeRate > 5) hookQuality = "Strong";

    let interactionQuality = "Average";
    if (commentRate < 0.5) interactionQuality = "Low";
    else if (commentRate > 2) interactionQuality = "High";

    // 🎧 EXTRACT AUDIO
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .outputOptions([
          "-vn",
          "-acodec pcm_s16le",
          "-ar 16000",
          "-ac 1",
        ])
        .save(audioPath)
        .on("end", resolve)
        .on("error", reject);
    });

    // 🧠 TRANSCRIBE
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "gpt-4o-mini-transcribe",
    });

    const transcript = transcription.text;

    // 🔥 ANALYZE
    const analysis = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a viral short-form content expert.
Analyze engagement metrics and explain why videos fail.
Be concise and actionable.`,
        },
        {
          role: "user",
          content: `
Metrics:
Views: ${viewsNum}
Likes: ${likesNum}
Comments: ${commentsNum}
Like Rate: ${likeRate.toFixed(2)}%
Comment Rate: ${commentRate.toFixed(2)}%
Engagement Score: ${engagementScore.toFixed(2)}%

Hook quality: ${hookQuality}
Interaction: ${interactionQuality}

Transcript:
${transcript}

Give:
1. Hook score (0-10)
2. Why it failed
3. Better hook
4. 3 viral titles
5. Caption
6. Suggestions
`,
        },
      ],
    });

    res.json({
      transcript,
      result: analysis.choices[0].message.content,
      metrics: {
        likeRate,
        commentRate,
        engagementScore,
        hookQuality,
        interactionQuality,
      },
    });

    // cleanup
    fs.unlink(audioPath, () => {});
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({
      error: "Video processing failed",
      details: err.message,
    });
  }
};