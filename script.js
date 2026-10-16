(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var form = document.getElementById("inquiry-form");
  if (!form) return;

  var statusBox = document.getElementById("form-status");
  var submitBtn = document.getElementById("submit-btn");
  var originalLabel = submitBtn.textContent;

  var rules = {
    name: function (v) { return v.trim() ? "" : "Please enter your name."; },
    email: function (v) {
      if (!v.trim()) return "Please enter your email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.";
    },
    phone: function (v) {
      if (!v.trim()) return "Please enter your phone number.";
      return v.replace(/\D/g, "").length >= 7 ? "" : "Please enter a valid phone number.";
    },
    details: function (v) { return v.trim() ? "" : "Please tell us about your project."; }
  };

  function setFieldError(name, message) {
    var input = form.elements[name];
    var err = document.getElementById(name + "-error");
    if (message) {
      input.setAttribute("aria-invalid", "true");
      err.textContent = message;
      err.hidden = false;
    } else {
      input.removeAttribute("aria-invalid");
      err.textContent = "";
      err.hidden = true;
    }
  }

  function validate() {
    var firstBad = null;
    Object.keys(rules).forEach(function (name) {
      var msg = rules[name](form.elements[name].value);
      setFieldError(name, msg);
      if (msg && !firstBad) firstBad = form.elements[name];
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  Object.keys(rules).forEach(function (name) {
    form.elements[name].addEventListener("blur", function () {
      setFieldError(name, rules[name](form.elements[name].value));
    });
  });

  function showStatus(type, message) {
    statusBox.className = "form-status " + type;
    statusBox.textContent = message;
    statusBox.hidden = false;
    statusBox.focus();
  }

  function encode(formData) {
    var parts = [];
    formData.forEach(function (value, key) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    });
    return parts.join("&");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    statusBox.hidden = true;

    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Netlify Forms accepts a urlencoded POST to the site root, including form-name.
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(new FormData(form))
    })
      .then(function (response) {
        // Only treat a 2xx response from the submission system as success.
        if (!response.ok) {
          throw new Error("Submission rejected with status " + response.status);
        }
        form.reset();
        showStatus("success", "Thank you! Your inquiry was received. We will contact you using the email or phone number you provided.");
      })
      .catch(function () {
        showStatus("error", "Sorry, your inquiry could not be sent. Please try again, or contact us directly at dylanr_28@icloud.com or 640-230-0225 (or eletriceel23@icloud.com or 609-240-9085).");
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
  });
})();
