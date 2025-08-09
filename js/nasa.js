  
    function toggleMenu() {
      document.getElementById('nav-links').classList.toggle('show');
    }

    const apiKey = "2XTKr0zgeGPPcxAwKWi9W0ZbzeOPqNajDd320Fq2";
    let currentDate = new Date();

    // Set max date on date input to today (to avoid future dates)
    const dateInput = document.getElementById('date-input');
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.max = todayStr;

    // Initialize date input to today
    dateInput.value = todayStr;

    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }

    function fetchImage(dateStr) {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateStr}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.media_type !== "image") {
            document.getElementById('nasa-image').src = '';
            document.getElementById('nasa-image').alt = "No image available";
            document.getElementById('description').innerText = "Media is not an image.";
            document.getElementById('title').innerText = data.title || "No title";
            document.getElementById('date').innerText = `Date: ${data.date || dateStr}`;
            return;
          }

          document.getElementById('title').innerText = data.title;
          document.getElementById('date').innerText = `Date: ${data.date}`;
          document.getElementById('nasa-image').src = data.url;
          document.getElementById('nasa-image').alt = data.title;
          document.getElementById('description').innerText = data.explanation;
        })
        .catch(error => {
          console.error("NASA API Error:", error);
          document.getElementById('description').innerText = "Failed to load NASA image.";
          document.getElementById('nasa-image').src = '';
          document.getElementById('title').innerText = "Error";
          document.getElementById('date').innerText = "";
        });
    }

    function previousDate() {
      currentDate.setDate(currentDate.getDate() - 1);
      const newDateStr = formatDate(currentDate);
      dateInput.value = newDateStr; // update date picker input
      fetchImage(newDateStr);
    }

    function nextDate() {
      const today = new Date();
      if (currentDate < today) {
        currentDate.setDate(currentDate.getDate() + 1);
        const newDateStr = formatDate(currentDate);
        dateInput.value = newDateStr; // update date picker input
        fetchImage(newDateStr);
      }
    }

    // New function: fetch image based on user input date
    function searchByDate() {
      const inputDateStr = dateInput.value;
      if (!inputDateStr) {
        alert("Please select a date.");
        return;
      }
      const inputDate = new Date(inputDateStr);
      const today = new Date();
      if (inputDate > today) {
        alert("Date cannot be in the future.");
        return;
      }
      currentDate = inputDate; // update currentDate
      fetchImage(inputDateStr);
    }

    // Load today's image on load
    fetchImage(formatDate(currentDate));
  