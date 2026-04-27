const express = require("express");
const cors = require("cors");
const TikTokScraper = require("tiktok-scraper");

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  try {
    const data = await TikTokScraper.getVideoMeta(req.query.url);
    const v = data.collector[0];

    res.json({
      title: v.text,
      audio: v.musicMeta.musicUrl,
      cover: v.covers.default
    });

  } catch {
    res.json({ error: "Gagal ambil data" });
  }
});

app.listen(process.env.PORT || 3000);