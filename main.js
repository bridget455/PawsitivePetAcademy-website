// Toggle the mobile menu
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('menu-btn');
  var list = document.getElementById('nav-list');
  if (btn && list) {
    btn.addEventListener('click', function () {
      list.classList.toggle('open');
      btn.textContent = list.classList.contains('open') ? '✕' : '☰';
    });
  }
});