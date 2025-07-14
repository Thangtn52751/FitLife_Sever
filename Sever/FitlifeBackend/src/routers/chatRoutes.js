const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/consult", async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Câu hỏi không hợp lệ." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Bạn là bác sĩ AI chuyên tư vấn sức khỏe. Chỉ trả lời câu hỏi liên quan đến sức khỏe. Câu hỏi người dùng: "${question}"`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (err) {
    console.error("❌ Lỗi Gemini:", err);
    res.status(500).json({ error: "Không thể tư vấn lúc này. Hãy thử lại sau." });
  }
});

module.exports = router;