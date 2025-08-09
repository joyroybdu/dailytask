const API_KEY = "ylP4osew4D6wvk1rbHqf1xUNWrXaJ3Lt";
const fetchBtn = document.getElementById("fetchBtn");
const resultsDiv = document.getElementById("results");

let allHolidays = [];
let currentPage = 1;
const itemsPerPage = 100;

fetchBtn.addEventListener("click", () => {
  const country = document.getElementById("country").value.toUpperCase();
  const year = document.getElementById("year").value;

  if (!country || !year) {
    alert("Please enter both country code and year.");
    return;
  }

  const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.meta.code !== 200 || !data.response.holidays.length) {
        resultsDiv.innerHTML = "<p>No holidays found or error in response.</p>";
        return;
      }

      allHolidays = data.response.holidays;
      currentPage = 1;
      displayPage(currentPage);
      renderPagination();
    })
    .catch(err => {
      console.error("Error fetching holidays:", err);
      resultsDiv.innerHTML = "<p>Error fetching holiday data.</p>";
    });
});

function displayPage(page) {
  resultsDiv.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, allHolidays.length);
  const holidaysToDisplay = allHolidays.slice(startIndex, endIndex);

  holidaysToDisplay.forEach(holiday => {
    const div = document.createElement("div");
    div.className = "holiday-card";
    div.innerHTML = `
      <h4>${holiday.name}</h4>
      <p>${holiday.date.iso}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

function renderPagination() {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";

  const totalPages = Math.ceil(allHolidays.length / itemsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      renderPagination();
    }
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      renderPagination();
    }
  };

  paginationDiv.appendChild(prevBtn);
  paginationDiv.appendChild(document.createTextNode(` Page ${currentPage} of ${totalPages} `));
  paginationDiv.appendChild(nextBtn);

  // Remove old pagination
  const oldPagination = document.querySelector(".pagination");
  if (oldPagination) oldPagination.remove();

  // Append new pagination
  resultsDiv.after(paginationDiv);
}
