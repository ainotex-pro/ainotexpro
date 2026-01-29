// server.js
// npm init -y
// npm i express node-fetch cors dotenv
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if(!OPENAI_KEY) console.warn("OPENAI_API_KEY not set!");

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model="gpt-4o-mini", max_tokens=600 } = req.body;
    if(!messages) return res.status(400).json({ error: "messages required" });

    const payload = { model, messages, max_tokens, temperature: 0.2 };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await r.text();
    // 그냥 그대로 전달 (caller가 JSON 파싱할 수 있도록)
    res.status(r.status).send(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Proxy server running on", PORT));
