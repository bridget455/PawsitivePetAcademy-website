// Fee calculator: discount tiers from the brief, then 15% VAT on the discounted total.
var VAT_RATE = 0.15;

function discountRate(count) {
  if (count > 3) return 0.15;
  if (count === 3) return 0.10;
  if (count === 2) return 0.05;
  return 0;
}

function money(n) {
  return 'R' + n.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('fees-form');
  if (!form) return;

  // Pre-tick a course when arriving from an individual course page (fees.html?course=firstaid)
  var wanted = new URLSearchParams(window.location.search).get('course');
  if (wanted) {
    var pre = form.querySelector('input[name="course"][value="' + wanted + '"]');
    if (pre) pre.checked = true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var error = document.getElementById('error');
    var result = document.getElementById('result');
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var email = document.getElementById('email').value.trim();
    var checked = form.querySelectorAll('input[name="course"]:checked');

    result.hidden = true;
    if (!name || !phone || !email) {
      error.textContent = 'Enter your name, phone number and email address.';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      error.textContent = 'Enter a valid email address.';
      return;
    }
    if (checked.length === 0) {
      error.textContent = 'Select at least one course.';
      return;
    }
    error.textContent = '';

    var subtotal = 0;
    checked.forEach(function (c) { subtotal += Number(c.dataset.fee); });
    var rate = discountRate(checked.length);
    var discount = subtotal * rate;
    var after = subtotal - discount;
    var vat = after * VAT_RATE;
    var total = after + vat;

    document.getElementById('r-name').textContent = name;
    document.getElementById('r-count').textContent = checked.length;
    document.getElementById('r-subtotal').textContent = money(subtotal);
    document.getElementById('r-rate').textContent = Math.round(rate * 100);
    document.getElementById('r-discount').textContent = '-' + money(discount);
    document.getElementById('r-vat').textContent = money(vat);
    document.getElementById('r-total').textContent = money(total);
    result.hidden = false;
  });
});