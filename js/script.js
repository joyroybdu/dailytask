// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

// Redirect function for card click
function goTo(page) {
  window.location.href = page;
}
