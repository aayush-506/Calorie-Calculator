const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."), false);
    }
  },
});

const NUTRITION_EXTRACTION_PROMPT = `You are a nutrition expert. Analyze this image and ALWAYS return a valid JSON object.

IMPORTANT: If the image shows ANY food (a meal, plate, thali, rice, curry, bread, vegetables, meat, snacks, etc.), you MUST return estimated nutrition. Do NOT return the error. Only return {"error": "No nutrition facts found in image"} if the image is completely empty, blurry beyond recognition, or shows zero food (e.g. only a person, only text, or unrelated objects).

When you see FOOD (with or without a nutrition label):
1. Add "food_items": an array of strings naming what you see, e.g. ["rice", "dal", "roti", "chicken curry", "raita"].
2. For the whole visible portion, estimate and include: calories, protein_g, total_fat_g, carbs_g, fiber_g, sodium_mg. Add saturated_fat_g, sugar_g, iron_mg, calcium_mg, etc. if you can estimate.
3. If a nutrition label is visible on packaging, use those exact values instead of estimating.

Return ONLY one JSON object. No markdown, no \`\`\`json, no explanation. Use numbers for nutrients, null or omit unknown keys. Use snake_case for keys.`;

function parseJsonFromResponse(text) {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  const withoutFences = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  try {
    return JSON.parse(withoutFences);
  } catch {
    return null;
  }
}

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided. Use field name 'image'." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Scan service is not configured (missing GEMINI_API_KEY)." });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelId = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const model = genAI.getGenerativeModel({ model: modelId });

    const imagePart = {
      inlineData: {
        mimeType: req.file.mimetype,
        data: req.file.buffer.toString("base64"),
      },
    };

    const result = await model.generateContent([imagePart, { text: NUTRITION_EXTRACTION_PROMPT }]);
    const response = result.response;
    const text = response?.text?.();

    if (!text) {
      return res.status(502).json({
        error: "Could not extract nutrition facts from the image. Try another image or check the content.",
      });
    }

    const json = parseJsonFromResponse(text);
    if (!json) {
      return res.status(502).json({
        error: "Could not parse nutrition data from the response.",
        raw: text.slice(0, 500),
      });
    }

    if (json.error) {
      return res.status(200).json(json);
    }

    return res.status(200).json(json);
  } catch (err) {
    console.error("Scan error:", err);
    const status = err?.response?.status === 429 ? 429 : 502;
    return res.status(status).json({
      error: err?.message || "Scan service failed. Please try again.",
    });
  }
});

module.exports = router;
