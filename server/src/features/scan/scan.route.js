const express = require("express");
const multer = require("multer");
const axios = require("axios");

const router = express.Router();

// 25MB limit for modern mobile camera photos
const MAX_FILE_SIZE = 25 * 1024 * 1024; 
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

/**
 * AI Scan Route
 * - Upgraded to support Gemini 2.5 and raw Access Tokens (AQ. prefix)
 * - Handles Multer errors explicitly
 */
router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "Photo too large. Max limit is 25MB." });
      }
      return res.status(400).json({ error: "Upload error: " + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const modelId = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    return res.status(503).json({ error: "AI service not configured." });
  }

  try {
    let textResult = "";

    // Unified Authentication for new "AQ." and legacy "AIza" API keys
    // We use the recommended 'x-goog-api-key' header which supports both formats
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`,
      {
        contents: [{
          parts: [
            { text: NUTRITION_EXTRACTION_PROMPT },
            {
              inline_data: {
                mime_type: req.file.mimetype,
                data: req.file.buffer.toString("base64"),
              },
            },
          ],
        }],
      },
      {
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    
    textResult = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResult) {
      throw new Error("Empty response from AI engine.");
    }

    const decoded = parseJsonFromResponse(textResult);
    if (!decoded) {
      return res.status(502).json({ error: "Could not parse nutrition data.", raw: textResult.slice(0, 200) });
    }

    return res.status(200).json(decoded);

  } catch (err) {
    console.error("Scan detailed error:", err.response?.data || err.message);
    const apiError = err.response?.data?.error;
    const statusCode = err.response?.status || 502;
    
    return res.status(statusCode).json({
      error: apiError?.message || "AI Analysis failed.",
      details: apiError?.status || err.message,
      reason: apiError?.reason || "Check your API credentials and model permissions."
    });
  }
});

module.exports = router;
