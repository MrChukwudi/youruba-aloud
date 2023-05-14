let button = document.getElementById("button");
// Create event listener for form submission
button.addEventListener("click", (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Define regular expressions for validation
  const usernameRegex = /^[\w]+$/; // Username contains only word characters (letters, numbers, and underscore)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password contains at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least 8 characters long
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/; // Email contains at least one dot (.)

  // Get the input values
  const userName = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Perform validation
  if (!usernameRegex.test(userName)) {
    console.log(
      "Invalid username. Username must contain only letters, numbers, and underscore."
    );
  }

  if (userName.length < 5) {
    console.log("Invalid username. Username must be 5 characters or more.");
  }

  if (!emailRegex.test(email)) {
    console.log("Invalid email. Email must contain at least one dot (.)");
  }

  if (password !== confirmPassword) {
    console.log("Passwords do not match.");
  }

  if (!passwordRegex.test(password)) {
    console.log(
      "Invalid password. Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long."
    );
  }

  // If all validations pass, you can proceed with form submission
  let arr = [email, password, confirmPassword, userName];
  console.log(arr);
  localStorage.setItem("my Values", JSON.stringify(arr));

  console.log("Form submitted successfully!");
  // this.reset(); // Reset the form fields
});
