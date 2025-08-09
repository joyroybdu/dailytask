
    async function getWeather() {
      const city = document.getElementById('cityInput').value.trim();
      const resultDiv = document.getElementById('weatherResult');
      const errorDiv = document.getElementById('errorMsg');
      resultDiv.innerHTML = '';
      errorDiv.textContent = '';

      if (!city) {
        errorDiv.textContent = '⚠️ Please enter a city or place.';
        return;
      }

      const API_KEY = '9d78b20cdd6f44bda3d151134250808';
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found.");

        const data = await response.json();
        const { name, region, country } = data.location;
        const { temp_c, condition, wind_kph, humidity, feelslike_c, uv } = data.current;

        resultDiv.innerHTML = `
          <p><strong>📍 Location:</strong> ${name}, ${region}, ${country}</p>
          <p><strong>🌡️ Temperature:</strong> ${temp_c}°C (Feels like ${feelslike_c}°C)</p>
          <p><strong>🌀 Condition:</strong> ${condition.text} <img src="${condition.icon}" alt="icon" /></p>
          <p><strong>💨 Wind:</strong> ${wind_kph} kph</p>
          <p><strong>💧 Humidity:</strong> ${humidity}%</p>
          <p><strong>🔆 UV Index:</strong> ${uv}</p>
        `;
      } catch (error) {
        errorDiv.textContent = "❌ " + error.message;
      }
    }

    document.getElementById('cityInput').addEventListener("keyup", function (e) {
      if (e.key === "Enter") getWeather();
    });
  