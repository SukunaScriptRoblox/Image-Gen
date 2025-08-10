import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Unlimited Image Generator API is running!");
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt, width = 512, height = 512 } = req.body;

    const response = await axios.post(
  "https://openrouter.ai/api/v1/images",
  {
    prompt: prompt,
    width: width,
    height: height
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
      "Content-Type": "application/json"
    }
  }
);
    res.json({ url: response.data.data[0].url });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 API running on port ${process.env.PORT || 3000}`);
});
