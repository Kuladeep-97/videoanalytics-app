import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { request } from "../api/client";
import AnalysisResult from "../components/AnalysisResult";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  platform: "Reels",
  views: "",
  likes: "",
  comments: "",
  duration: 15,
  niche: ""
};

function DashboardPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState(initialForm);
  const [analysis, setAnalysis] = useState(null);
  const [seo, setSeo] = useState(null);
  const [ai, setAi] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const maybeConfirmUpgrade = async () => {
      if (searchParams.get("billing") !== "success") return;

      try {
        await request("/payments/confirm", {
          method: "POST",
          body: JSON.stringify({ provider: "stripe" })
        });
        window.history.replaceState({}, "", "/dashboard?upgraded=1");
        window.location.reload();
      } catch {}
    };

    maybeConfirmUpgrade();
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: ["views", "likes", "comments", "duration"].includes(name)
        ? value === "" ? "" : Number(value)
        : value
    }));

    setError("");
  };

  const handleVideoUpload = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");

      if (!file) {
        setError("Upload a video first");
        return;
      }

      if (
        form.views === "" ||
        form.likes === "" ||
        form.comments === "" ||
        Number(form.views) <= 0
      ) {
        setError("Enter valid metrics");
        return;
      }

      const formData = new FormData();
      formData.append("video", file);
      formData.append("views", form.views);
      formData.append("likes", form.likes);
      formData.append("comments", form.comments);
      formData.append("duration", form.duration);
      formData.append("platform", form.platform);
      formData.append("niche", form.niche);

      const res = await fetch("http://localhost:5000/api/videos/analyze", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("wmvf_token")}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Analysis failed");

      setAnalysis(data);
      setSeo(null);
      setAi(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeo = async () => {
    setLoading(true);
    const data = await request("/ai/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: `Give SEO topics:\n\n${analysis?.transcript}`
      })
    });
    setSeo(data);
    setLoading(false);
  };

  const handleAi = async () => {
    setLoading(true);
    const data = await request("/ai/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt: `Generate viral hooks:\n\n${analysis?.transcript}`
      })
    });
    setAi(data);
    setLoading(false);
  };

  const cleanText = (text) =>
    text
      ?.replace(/\*\*/g, "")
      ?.replace(/["']/g, "")
      ?.replace(/\d+\.\s*/g, "")
      ?.trim();

  const formatList = (text) =>
    text?.split("\n").filter((l) => l.trim() !== "");

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {user?.name}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT PANEL */}
        <div className="bg-white rounded-2xl p-6 shadow space-y-4">
          <h2 className="text-lg font-semibold">Run a video diagnosis</h2>

          {/* PLATFORM SELECT */}
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="Reels">Instagram Reels</option>
            <option value="Shorts">YouTube Shorts</option>
            <option value="TikTok">TikTok</option>
          </select>

          <input
            name="niche"
            placeholder="Niche"
            value={form.niche}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />

          {["views", "likes", "comments", "duration"].map((field) => (
            <input
              key={field}
              type="number"
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              className="border rounded-lg p-2"
            />
          ))}

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded-lg"
            >
              Analyze
            </button>

            <button
              onClick={handleSeo}
              disabled={!analysis}
              className="border px-4 py-2 rounded-lg"
            >
              SEO
            </button>

            <button
              onClick={handleAi}
              disabled={!analysis}
              className="border px-4 py-2 rounded-lg"
            >
              Hooks
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          <AnalysisResult data={analysis} />

          {seo && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">SEO Ideas</h3>
              <ul className="space-y-2">
                {formatList(seo.result).map((line, i) => (
                  <li key={i} className="bg-gray-50 p-3 rounded-lg text-sm">
                    {cleanText(line)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ai && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-3">Hooks & Captions</h3>
              <ul className="space-y-2">
                {formatList(ai.result).map((line, i) => (
                  <li key={i} className="bg-gray-50 p-3 rounded-lg text-sm">
                    {cleanText(line)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;