(function () {
  function attachConfirmation(formSelector, statusId, successText) {
    var form = document.querySelector(formSelector);
    if (!form) return;
    var status = document.getElementById(statusId);
    if (!status) {
      status = document.createElement("p");
      status.id = statusId;
      status.className = "muted";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      form.appendChild(status);
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = successText;
      status.style.color = "#FFCB9A";
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    attachConfirmation('main form[action="#"]', "contact-status", "Thank you! Your message has been received.");
    attachConfirmation("#feedback-form", "feedback-status", "Thank you for your feedback!");
  });
})();
