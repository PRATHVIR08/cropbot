import express from "express";
console.log("🔥 SERVER.JS FILE LOADED 🔥");

import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

// ✅ VERY IMPORTANT (without this POST body will not work)
app.use(cors());
app.use(express.json());

// ✅ Test route (check backend)
app.get("/", (req, res) => {
  res.send("CropBot backend is running 🌱");
});

// ✅ Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ CHAT ROUTE (THIS IS WHAT POSTMAN CALLS)
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `You are an agriculture expert. Answer clearly.\nQuestion: ${message}`
    );

    const reply = result.response.text();
    res.json({ reply });

  } catch (error) {
    console.log("🔥 GEMINI ERROR 🔥");
    console.log(error);
    res.status(500).json({ reply: "Backend error ❌" });
  }
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
