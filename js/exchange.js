
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/';
    const baseCurrencyEl = document.getElementById('base-currency');
    const targetCurrencyEl = document.getElementById('target-currency');
    const amountEl = document.getElementById('amount');
    const resultEl = document.getElementById('converted-result');

   
    function toggleMenu() {
      const navLinks = document.getElementById('nav-links');
      navLinks.classList.toggle('show');
    }

    // Populate currency dropdowns
    async function populateCurrencies() {
      const response = await fetch(apiUrl + 'USD');
      const data = await response.json();
      const currencies = Object.keys(data.rates);

      currencies.forEach(currency => {
        baseCurrencyEl.innerHTML += `<option value="${currency}">${currency}</option>`;
        targetCurrencyEl.innerHTML += `<option value="${currency}">${currency}</option>`;
      });

      baseCurrencyEl.value = 'USD';
      targetCurrencyEl.value = 'BDT';

      convert();
    }

    // Convert currency
    async function convert() {
      const base = baseCurrencyEl.value;
      const target = targetCurrencyEl.value;
      const amount = amountEl.value;

      const response = await fetch(apiUrl + base);
      const data = await response.json();
      const rate = data.rates[target];
      const converted = (amount * rate).toFixed(2);
      resultEl.innerText = `${amount} ${base} = ${converted} ${target}`;
    }

    // Swap currencies
    function swapCurrencies() {
      const temp = baseCurrencyEl.value;
      baseCurrencyEl.value = targetCurrencyEl.value;
      targetCurrencyEl.value = temp;
      convert();
    }

    // Event listeners
    baseCurrencyEl.addEventListener('change', convert);
    targetCurrencyEl.addEventListener('change', convert);
    amountEl.addEventListener('input', convert);

    // Load
    populateCurrencies();
