const chatInput = document.getElementById("chatInput");
const imageInput = document.getElementById("imageInput");
const fileName = document.getElementById("fileName");
const toneButtons = document.querySelectorAll(".tone-button");
const replyList = document.getElementById("replyList");
const statusMessage = document.getElementById("statusMessage");
const generateTextBtn = document.getElementById("generateTextBtn");
const generateImageBtn = document.getElementById("generateImageBtn");
const replyToScore = document.getElementById("replyToScore");
const scoreBtn = document.getElementById("scoreBtn");
const scoreResult = document.getElementById("scoreResult");

let selectedTone = "Flirty";
let latestSourceText = "";

function setStatus(message) {
  statusMessage.textContent = message;
}

function renderReplies(replies) {
  replyList.innerHTML = "";
  replies.forEach((reply, index) => {
    const card = document.createElement("article");
    card.className = "reply-card";
    const text = document.createElement("p");
    text.textContent = reply.text;

    const footer = document.createElement("footer");
    const label = document.createElement("strong");
    label.textContent = `Reply ${index + 1}`;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.textContent = "Copy";

    footer.append(label, copyButton);
    card.append(text, footer);
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(reply.text);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1000);
      replyToScore.value = reply.text;
    });
    replyList.appendChild(card);
  });
}

async function handleJsonResponse(response) {
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.detail || "Request failed.");
  }
  return payload;
}

async function generateFromText() {
  const messageText = chatInput.value.trim();
  if (!messageText) {
    setStatus("Paste a conversation first.");
    return;
  }

  setStatus("Generating replies...");
  try {
    const payload = await handleJsonResponse(
      await fetch("/api/generate/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_text: messageText, tone: selectedTone }),
      }),
    );
    latestSourceText = payload.source_text;
    renderReplies(payload.replies);
    setStatus(`Generated 3 ${selectedTone.toLowerCase()} replies.`);
  } catch (error) {
    setStatus(error.message);
  }
}

async function generateFromImage() {
  const file = imageInput.files[0];
  if (!file) {
    setStatus("Choose an image first.");
    return;
  }

  setStatus("Reading screenshot and generating replies...");
  try {
    const formData = new FormData();
    formData.append("tone", selectedTone);
    formData.append("image", file);
    const payload = await handleJsonResponse(
      await fetch("/api/generate/image", {
        method: "POST",
        body: formData,
      }),
    );
    latestSourceText = payload.source_text;
    chatInput.value = payload.source_text;
    renderReplies(payload.replies);
    setStatus("OCR complete. Replies generated from screenshot.");
  } catch (error) {
    setStatus(error.message);
  }
}

async function scoreReply() {
  const replyText = replyToScore.value.trim();
  const conversationText = chatInput.value.trim() || latestSourceText;
  if (!conversationText || !replyText) {
    setStatus("Add both conversation text and a reply to score.");
    return;
  }

  setStatus("Scoring reply...");
  try {
    const payload = await handleJsonResponse(
      await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_text: conversationText,
          reply_text: replyText,
        }),
      }),
    );
    scoreResult.classList.remove("hidden");
    scoreResult.innerHTML = `<strong>${payload.score}/10</strong><p>${payload.verdict}</p>`;
    setStatus("Reply scored.");
  } catch (error) {
    setStatus(error.message);
  }
}

toneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toneButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedTone = button.dataset.tone;
  });
});

imageInput.addEventListener("change", () => {
  fileName.textContent = imageInput.files[0]?.name || "No image selected";
});

generateTextBtn.addEventListener("click", generateFromText);
generateImageBtn.addEventListener("click", generateFromImage);
scoreBtn.addEventListener("click", scoreReply);
