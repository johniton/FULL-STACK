document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(data => {
        const weatherDiv = document.getElementById("weather");
        if (data.main) {
          weatherDiv.innerHTML = `
            <p>Location: ${data.name}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
          `;
        } else {
          weatherDiv.textContent = "Failed to load weather data.";
        }
      })
      .catch(err => {
        console.error("API error:", err);
        document.getElementById("weather").textContent = "Error fetching data.";
      });
  });
  