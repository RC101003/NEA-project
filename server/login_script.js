document.addEventListener("DOMContentLoaded", function() {
  const signUpForm = document.getElementById("sign-up-form");
  const signInForm = document.getElementById("sign-in-form");

  signUpForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("sign-up-username").value;
    const email = document.getElementById("sign-up-email").value;
    const password = document.getElementById("sign-up-password").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/signup");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert("Account created successfully!");
      } else {
        alert("Error creating account.");
      }
    };
    xhr.send(JSON.stringify({ username, email, password }));
  });

  signInForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("sign-in-username").value;
    const password = document.getElementById("sign-in-password").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/login");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert("Login successful!");
      } else {
        alert("Error logging in.");
      }
    };
    xhr.send(JSON.stringify({ username, password }));
  });
});
