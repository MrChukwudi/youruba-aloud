// Function for registration:

function signUp(event) {
  event.preventDefault(); //Prevents any form of refreshing the page

  const getSpin = document.querySelector(".spin"); //to get the spin spinning upon clicking
  getSpin.style.display = "inline-block";

  //To get the values of my inputs
  const getName = document.getElementById("name").value;
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;
  const getConfirmPassword = document.getElementById("confirmPassword").value;
  console.log([getName, getEmail, getPassword, getConfirmPassword]);

  //   to implement the validation: Case of empty values
  if (
    getName === "" ||
    getEmail === "" ||
    getPassword === "" ||
    getConfirmPassword === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  }

  //   to implement the validation: Case of password confirmation
  if (getConfirmPassword !== getPassword) {
    Swal.fire({
      icon: "info",
      text: "Passwords do not match",
      confirmButtonColor: "cool",
    });
    getSpin.style.display = "none";
  }

  //   Using the else block to make the API call:
  else {
    const signFormData = new FormData(); //to create a new FormData object as the API document stipulated that we're sending Form Data and not Raw Data
    signFormData.append("name", getName);
    signFormData.append("email", getEmail);
    signFormData.append("password", getPassword);
    signFormData.append("password_confirmation", getConfirmPassword);

    const signMethod = {
      method: "POST",
      body: signFormData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "green",
          });

          getSpin.style.display = "none";

          setTimeout(() => {
            location.href = "index.html";
          }, 5000);
        } else {
          Swal.fire({
            icon: "info",
            text: `Registration not successful!`,
            confirmButtonColor: "red",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";
// save my token in local storage:
