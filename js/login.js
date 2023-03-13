function logIn(event) {
  event.preventDefault();

  const mySpin = document.querySelector(".spin");

  mySpin.style.display = "inline-block";

  const myEmail = document.getElementById("email").value;
  const myPassword = document.getElementById("password").value;

  if (myEmail === "" || myPassword === "") {
    console.log([myEmail, myPassword]);
    Swal.fire({
      icon: "warning",
      text: "Please fill in all fields",
      confirmButtonColor: "red",
    });
    mySpin.style.display = "none";
  } else {
    let myFormData = new FormData();
    myFormData.append("email", myEmail);
    myFormData.append("password", myPassword);

    let myMethod = {
      method: "POST",
      body: myFormData,
    };
    const uri = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    fetch(uri, myMethod)
      .then((response) => response.json())
      .then((theResult) => {
        console.log(theResult);
        if (theResult.email === myEmail) {
          Swal.fire({
            icon: "success",
            text: `Successfully Logged in`,
            confirmButtonColor: "green",
          });

          mySpin.style.display = "none";
          console.log(theResult.token);

          localStorage.setItem("myToken", `${theResult.token}`);
          console.log(localStorage.getItem("myToken"));

          //   setTimeout(function () {
          //     location.href = "signup.html";
          //   }, 5000);
        } else {
          Swal.fire({
            icon: "error",
            text: `Unsuccessful Login attempt`, //Why doesn't the API response have a Message and Status key?
            confirmButtonColor: "red",
          });
          mySpin.style.display = "none";
        }
      })
      .catch((error) => console.log(`The Error is: `, error));
  }
}
