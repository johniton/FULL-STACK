// import express from "express";
// import path from "path";
// import fetch from "node-fetch";
// import { fileURLToPath } from "url";

// const app = express();
// const port = 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Static frontend
// app.use(express.static(path.join(__dirname, "../public")));

// // Weather route (uses real API)
// app.get("/api/weather", async (req, res) => {
//   const city = "Mapusa"; // You can change the city here
//   const apiKey = "3eec17587d990dc97fc29f10a46a241c"; // <-- Your OpenWeatherMap API key

//   try {
//     const apiRes = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//     );
//     const data = await apiRes.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch weather data" });
//   }
// });

// app.listen(port, () => {
//   console.log(`✅ Server running at http://localhost:${port}`);
// });
import express from "express";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static frontend
app.use(express.static(path.join(__dirname, "../public")));

// Weather route (returns both current and forecast)
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = "3eec17587d990dc97fc29f10a46a241c";

  console.log("🔍 API hit with lat:", lat, "lon:", lon);

  try {
    let baseUrl = "https://api.openweathermap.org/data/2.5";
    let currentUrl, forecastUrl;

    if (lat && lon) {
      currentUrl = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      forecastUrl = `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      const city = "Mapusa";
      currentUrl = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
      forecastUrl = `${baseUrl}/forecast?q=${city}&appid=${apiKey}&units=metric`;
    }

    console.log("🌍 Fetching from:", currentUrl);
    
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    console.log("✅ Fetched data. Sending to client...");

    res.json({
      current: currentData,
      forecast: forecastData,
    });
  } catch (err) {
    console.error("❌ Server fetch error:", err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});



app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
