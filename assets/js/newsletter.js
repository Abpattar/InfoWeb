(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("newsletter-form");
    var input = document.getElementById("newsletter-email");
    var status = document.getElementById("newsletter-status");
    if (!form || !input || !status) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.style.color = "#FFCB9A";
        return;
      }
      status.textContent = "Subscribed " + email + " for monthly InfoWeb updates.";
      status.style.color = "#D1E8E2";
      input.value = "";
    });
  });
})();
