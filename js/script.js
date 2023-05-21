// <<<<<<<<<<<<<<<Function for Registration:>>>>>>>>>>>>>>>>>>>>>>>

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

// <<<<<<<<<<<<<<<Function for Log in:>>>>>>>>>>>>>>>>>>>>>>>

function logIn(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  console.log(getEmail, getPassword);

  if (getEmail === "" && getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "Please, All fields are required",
      confirmButtonColor: "red",
    });
    getSpin.style.display = "none";
  } else {
    const logFormData = new FormData();
    logFormData.append("email", getEmail);
    logFormData.append("password", getPassword);

    const logReg = {
      method: "POST",
      body: logFormData,
    };
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    fetch(url, logReg)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("adminLogData", JSON.stringify(result));
        let getDetails = localStorage.getItem("adminLogData");
        let details = JSON.parse(getDetails);

        if (details.hasOwnProperty("email")) {
          location.href = "dashboards.html";
        } else {
          Swal.fire({
            icon: "alert",
            text: "Login Failed",
            confirmButtonColor: "primary",
          });
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// <<<<<<<<<<<<<<<Dashboard Api Operations>>>>>>>>>>>>>>>>>>>>>>>

function dashboardApi() {
  const getModal = document.querySelector(".pagemodal");
  getModal.style.display = "block";

  const getToken = localStorage.getItem("adminLogData");
  const theToken = JSON.parse(getToken);
  const token = theToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);

  const dashReq = {
    method: "GET",
    headers: dashHeader,
  };

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      const adminID = document.getElementById("adminID");
      const category = document.getElementById("category");
      const learnMat = document.getElementById("learnmat");
      const subCat = document.getElementById("subCat");
      const quiz = document.getElementById("quiz");
      const student = document.getElementById("student");

      adminId.innerText = result.admin_name;
      category.innerText = result.total_number_of_categories;
      learnMat.innerText = result.total_number_of_learningmaterial;
      subCat.innerText = result.total_number_of_subcategories;
      quiz.innerHTML = result.total_number_of_quize;
      student.innerHTML = result.total_number_of_students;

      getModal.style.display = "none";
    });
}

// <<<<<<<<<<<<<<Getting top three students Operations>>>>>>>>>>>>>>>>>>>>>>>

function studentModal(event) {
  event.preventDefault();

  const getModal2 = document.querySelector(".pagemodal");
  getModal2.style.display = "block";

  const getModal = document.getElementById("dash-modal");
  getModal.style.display = "block";

  const getToken = localStorage.getItem("adminLogData");
  const theToken = JSON.parse(getToken);
  const token = theToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);

  const dashReq = {
    method: "GET",
    headers: dashHeader,
  };

  let data = [];
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const getStudent = document.querySelector(".allstudent");
      getModal2.style.display = "none";

      if (result.length === 0) {
        getStudent.innerHTML = "No Records Found!!";
      } else {
        result.map((item) => {
          data += `
        <div class="search-card">
          <div class="d-flex dew">
          <p>Name: </p>
          <p><b>${item.name}</b></p>
          </div>
          <div class="d-flex dew">
          <p>Email: </p>
          <p><b>${item.email}</b></p>
          </div>
          <div class="d-flex dew">
          <p>Phone Number: </p>
          <p><b>${item.phone_number}</b></p>
          </div>
          <div class="d-flex dew">
          <p>Total Score: </p>
          <p><b>${item.total_score}</b></p>
          </div>
          <div class="d-flex dew">
          <p>Position: </p>
          <p><b>${item.position}</b></p>
          </div>
        </div>
        `;
          getStudent.innerHTML = data;
          getModal2.style.display = "none";
        });
      }
    })
    .catch((error) => console.log("error", error));
}

// <<<<<<<<<<<<<<<Close Dashboard Modal function>>>>>>>>>>>>>>>>>>>>>>>
function closeDashModal() {
  const getModal = document.getElementById("dash-modal");

  getModal.style.display = "none";
}

// <<<<<<<<<<<<<<<Get all Students:>>>>>>>>>>>>>>>>>>>>>>>

function getAllStudents() {
  const getModal2 = document.querySelector(".pagemodal");
  getModal2.style.display = "block";

  const getToken = localStorage.getItem("adminLogData");
  const theToken = JSON.parse(getToken);
  const token = theToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);

  const dashReq = {
    method: "GET",
    headers: dashHeader,
  };

  let data = [];
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      const tableDetails = document.getElementById("table-id");

      if (result.length === 0) {
        tableDetails.innerHTML = "No Records Found";
      } else {
        result.map((item) => {
          data += `
          <tr>
          <td>${item.name} </td>
          <td>${item.email} </td>
          <td>${item.phone_number}</td>
          <td>${item.position}</td>
          <td>${item.total_score}</td>
          `;
          tableDetails.innerHTML = data;
          getModal2.style.display = "none";
        });
      }
    })
    .catch((error) => console.log("error", error));
}

// <<<<<<<<<<<<<<<Create Category Functionality>>>>>>>>>>>>>>>>>>>>>>>

function createCategory(event) {
  event.preventDefault();
  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";
  const getCat = document.getElementById("cat").value;
  const getImgCategory = document.getElementById("imcat").files[0];

  if (getCat === "" || getImgCategory === "") {
    Swal.fire({
      icon: "info",
      text: "All files are required",
      confirmButtonColor: "red",
    });

    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("adminLogData");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    const catHeadder = new FormData();
    catHeadder.append("name", getCat);
    catHeadder.append("image", getImgCategory);
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const dashReq = {
      method: "POST",
      body: catHeadder,
      headers: dashHeader,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

    fetch(url, dashReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "green",
          });
          setTimeout(() => {
            location.reload();
          }, 4000);
        } else {
          Swal.fire({
            icon: "error",
            text: `Unsuccessful...`,
            confirmButtonColor: "red",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// <<<<<<<<<<<<<<<Category List Functionality>>>>>>>>>>>>>>>>>>>>>>>

function categoryList() {
  const catList = document.querySelector(".scroll-div"); //Selecting the Div that contains the category lists.

  const getToken = localStorage.getItem("adminLogData"); //Getting the token (inside the userDetail response object during login request) of the active user, s we need it during our API request according to the documentation
  const theToken = JSON.parse(getToken); // the user log is was saved as a string, we are converting it to an object
  const token = theToken.token; // We are saving the token inside the user log object to a token variable for easy use.

  const dashHeader = new Headers(); //Creating a new header for the api request
  dashHeader.append("Authorization", `Bearer ${token}`); //The api request header needs to show the token of the bearer(user) for the request to be treated as valid, we appended that here

  const dashReq = {
    method: "GET",
    headers: dashHeader,
  };

  let myList = []; // knowing that the response from the API endpoint will be a list of objects, we need an empty array to hold the list of objects.

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      if (result.length === 0) {
        //This is the where we handle case where the API response was empty.
        catList.innerHTML = "No Records Found";
      } else {
        result.map((item) => {
          //array.map() is a for loop operation that will iterate over an array and apply the function specified to the .map method on each item of the array.
          myList += `
          <div class="map-div">
          <a href="details.html?name=${item.name}&&id=${item.id}"><img class="map-img" src=${item.image}> </a>
          <p class="map-name" >${item.name}</p>
          <div class="map-dtn-div">
          <button onclick="revealUpdateCatForm(${item.id})" class="btn-primary list-btn">Update</button>
          <button onclick="deleteCat(${item.id})" class="btn-primary list-btn"> Delete</button>
          </div>
          </div>
          `;
          catList.innerHTML = myList;
        });
      }
    })
    .catch((error) => console.log("error", error));
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Start of Update Category Logic>>>>>>>>>>>>>>>>>>>>>

function revealUpdateCatForm(itemId) {
  localStorage.setItem("itemId", itemId);

  const revealModal = document.getElementById("my-modal3");
  revealModal.style.display = "block";

  let myToken = localStorage.getItem("adminLogData");
  let token = JSON.parse(myToken).token;
  console.log("token: " + token);

  let prefHeader = new Headers();
  prefHeader.append("Authorization", `Bearer  ${token}`);

  let options = {
    method: "GET",
    headers: prefHeader,
  };

  let uri =
    `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=` +
    `${itemId}`;

  fetch(uri, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let updateCatName = document.getElementById("updateName");
      let updateCatImg = document.getElementById("updateNameImage");

      updateCatName.setAttribute("value", `${data.name}`);
      updateCatImg.setAttribute("value", `${data.image}`);
    })
    .catch((error) => error.message);
}

function closeModal3() {
  const revealModal = document.getElementById("my-modal3");
  revealModal.style.display = "none";
}

function chooseImg(event) {
  event.preventDefault();
  let innactiveNameDiv = document.querySelector(".getWrapp");
  let activeNameDiv = document.querySelector(".wrapper");

  innactiveNameDiv.style.display = "none";
  activeNameDiv.style.display = "block";
}

function updateCategory(event) {
  event.preventDefault();

  let updateCatName = document.getElementById("updateName").value;
  let updateCatImg2 = document.getElementById("updateImage").files[0];
  let updateCatImg1 = document.getElementById("updateNameImage").value;

  let spinner = document.querySelector(".spin2");
  spinner.style.display = "inline-block";

  if (updateCatName === "" || updateCatImg1 === "") {
    Swal.fire({
      icon: "info",
      text: `All fields are required`,
      confirmButtonColor: "red",
    });

    spinner.style.display = "none";
  } else {
    let myToken = localStorage.getItem("adminLogData");
    let token = JSON.parse(myToken).token;
    console.log("token: " + token);

    let myItemId = localStorage.getItem("itemId");

    let prefHeader = new Headers();
    prefHeader.append("Authorization", `Bearer  ${token}`);

    let formData = new FormData();
    formData.append("name", updateCatName);
    formData.append("image", updateCatImg2);
    formData.append("category_id", myItemId);

    let options = {
      method: "POST",
      headers: prefHeader,
      body: formData,
    };

    let uri = `https://pluralcodesandbox.com/yorubalearning/api/admin/update_category`;

    spinner.style.display = "none";
    fetch(uri, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            text: data.message,
            confirmButtonColor: "green",
          });

          setTimeout(() => {
            location.reload();
          }, 4000);
        } else {
          Swal.fire({
            icon: "info",
            text: data.message.image,
            confirmButtonColor: "red",
          });
        }
      })
      .catch((error) => error.message);
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<End of Update Category Logic>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Delete Category>>>>>>>>>>>>>>>>>>>>>

function deleteCat(id) {
  let myToken = localStorage.getItem("adminLogData");
  let token = JSON.parse(myToken).token;

  let uri =
    `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/` +
    `${id}`;
  let headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  let options = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  fetch(uri, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        Swal.fire({
          icon: "success",
          text: `${data.message}`,
          confirmButtonColor: "green",
        });
        setTimeout(() => {
          location.reload();
        }, 4000);
      } else {
        Swal.fire({
          icon: "info",
          text: `delete was Unsuccessful`,
          confirmButtonColor: "red",
        });
      }
    })
    .catch((error) => (error.message, error));
}

// <<<<<<<<<<<<<<<End of Delete Category>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Missed Classes Started Here>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<Function for SubCategory creation>>>>>>>>>>>>>>>>>>>>>>>

function subCategory(event) {
  event.preventDefault();

  const param = new URLSearchParams(window.location.search);
  const getId = param.get("id");
  console.log(getId);

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const getSubName = document.getElementById("subCatName").value;
  const getSubImg = document.getElementById("subCatImg").files[0];

  if (getSubName === "" || getSubImg === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const getToken = localStorage.getItem("adminLogData");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const subForm = new FormData();
    subForm.append("name", getSubName);
    subForm.append("image", getSubImg);
    subForm.append("category_id", getId);

    const subReq = {
      method: "POST",
      headers: dashHeader,
      body: subForm,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";

    fetch(url, subReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });

          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "warning",
          text: error,
          confirmButtonColor: "#2D85DE",
        });
        getSpin.style.display = "none";
      });
  }
}

// function to get subcategory list
function getSubCategory() {
  const param = new URLSearchParams(window.location.search);
  const getId = param.get("id");

  const getToken = localStorage.getItem("adminLogData");
  const theToken = JSON.parse(getToken);
  const token = theToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${token}`);

  const subReq = {
    method: "GET",
    headers: dashHeader,
  };

  let data = [];
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${getId}`;
  fetch(url, subReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      const getRow = document.querySelector(".row");
      if (result.length === 0) {
        getRow.innerHTML = "No Records found under this Category";
      } else {
        result.map((item) => {
          data += `
               <div class="col-sm-12 col-md-12 col-lg-4">
                  <div class="search-card">
                   <img src="${item.image}" alt="image">
                   <p>${item.name}</p>
                   <button class="update-button" onclick="openSubCatModal(${item.id})">update</button>
                  </div>
               </div>
              `;
          getRow.innerHTML = data;
        });
      }
    })
    .catch((error) => console.log("error", error));
}

function getNameDetails() {
  const params = new URLSearchParams(window.location.search);
  const getName = params.get("name");

  const name = document.querySelector(".det");
  name.innerHTML = getName;
}
// global variable
let mySubId;

function openSubCatModal(subId) {
  const subCatModal = document.getElementById("my-modal-mode");
  subCatModal.style.display = "block";

  mySubId = subId;
}

function updateSubCategory(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";

  let newId = mySubId;

  const upName = document.getElementById("updateSubName").value;
  const upImg = document.getElementById("updateSubImage").files[0];

  if (upName === "" || upImg === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    // get token
    const getToken = localStorage.getItem("adminLogData");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    // authorization
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    // create formdata
    const upData = new FormData();
    upData.append("name", upName);
    upData.append("image", upImg);

    // pass in the subcategory id
    upData.append("subcategory_id", newId);

    const upMethod = {
      method: "POST",
      headers: dashHeader,
      body: upData,
    };

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory`;
    fetch(url, upMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });

          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "warning",
          text: error,
          confirmButtonColor: "#2D85DE",
        });
        getSpin.style.display = "none";
      });
  }
}

function closeModalMode() {
  const subCatModal = document.getElementById("my-modal-mode");
  subCatModal.style.display = "none";
}

function upDateAdmin(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin2");
  getSpin.style.display = "inline-block";

  const upName = document.getElementById("updateName").value;
  const upEmail = document.getElementById("updateEmail").value;

  if (upName === "" || upEmail === "") {
    Swal.fire({
      icon: "success",
      text: "All fields are required",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    // get token
    const getToken = localStorage.getItem("adminLogData");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    // authorization
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);

    const adData = new FormData();
    adData.append("name", upName);
    adData.append("email", upEmail);

    const adReq = {
      method: "POST",
      headers: dashHeader,
      body: adData,
    };

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile`;

    fetch(url, adReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });

          setTimeout(() => {
            location.href = "index.html";
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Missed Classes Ended Here>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Admin Change Password Starts Here>>>>>>>>>>>>>>>>>>>>>

function updatePassword(event) {
  event.preventDefault();

  const upPassBtn = document.getElementById("dButton");
  let curEmail = document.getElementById("updatePassEmail").value;
  let upPass = document.getElementById("updatePassword").value;
  let upConfPass = document.getElementById("confirmPassword").value;

  // Ading the spinner to the button
  let spinner = document.querySelector(".spin");
  spinner.style.display = "inline-block";

  // Getting the Local Storage variables needed
  let adminLog = localStorage.getItem("adminLogData");
  let logData = JSON.parse(adminLog);
  let baseEmail = logData.email;
  let token = logData.token;

  // Validations:
  if (curEmail !== baseEmail) {
    Swal.fire({
      icon: "info",
      text: "Please enter correct Email",
      confirmButtonColor: "red",
    });
  }
  if (upPass !== upConfPass) {
    Swal.fire({
      icon: "info",
      text: "Please Enter Matching Passwords",
      confirmButtonColor: "red",
    });

    // Make my API call
  } else {
    let reqHeader = new Headers();
    reqHeader.append("Authorization", `Bearer ${token}`);
    let reqBody = new FormData();
    reqBody.append("email", baseEmail);
    reqBody.append("password", upPass);
    reqBody.append("password_confirmation", upConfPass);

    let reqOption = {
      method: "POST",
      body: reqBody,
      headers: reqHeader,
    };

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password`;

    fetch(url, reqOption)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status !== "success") {
          Swal.fire({
            icon: "info",
            text: `${data.message}`,
            confirmButtonColor: "red",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: `${data.message}`,
            confirmButtonColor: "Green",
          });
          setTimeout(() => {
            location.href = `index.html`;
          }, 300);
        }

        spinner.style.display = "none";
      })
      .catch((error) => [error.message, error.stack]);

    spinner.style.display = "none";
  }

  upPassBtn.addEventListener("click", updatePassword);
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Admin Change Password Ended Here>>>>>>>>>>>>>>>>>>>>>

//Logout functionality

/*
function logout() {
  // Show a modal window to indicate that the logout process has started
  const modal = document.querySelector(".pagemodal");
  modal.style.display = "block";

  // Get the token from local storage
  const token = JSON.parse(localStorage.getItem("adminLogData")).token;
  console.log(token);

  // Define the headers for the API request
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  // Define the request options for the API request
  const options = {
    method: "GET",
    headers: headers,
  };

  // Define the URL for the API request
  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/logout";

  // Send the API request
  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      // If the logout was successful, show a success message and redirect to the home page after a 3-second delay
      if (result.message === "success") {
        Swal.fire({
          icon: "success",
          text: "Logout Successful",
          confirmButtonColor: "#2D85DE",
        });
        setTimeout(() => {
          localStorage.clear();
          location.href = "index.html";
        }, 3000);
      }
      // If the logout was unsuccessful, show an error message and hide the modal window
      else {
        Swal.fire({
          icon: "info",
          text: "Unsuccessful",
          confirmButtonColor: "#2D85DE",
        });
        modal.style.display = "none";
      }
    })
    .catch((error) => console.log("error", error));
}
*/

/*
function logout() {
  const myModal = document.querySelector(".pagemodal");
  myModal.style.display = "block";
  // getting stored in local staorage
  const getData = localStorage.getItem("adminLogData");
  const myData = JSON.parse(getData);
  const data = myData.token;
  console.log(data);
  const logHeader = new Headers();
  logHeader.append("Authorization", `Bearer ${data}`);
  const logReq = {
    method: "GET",
    headers: logHeader,
  };
  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/logout";
  fetch(url, logReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.message === "success") {
        Swal.fire({
          icon: "success",
          text: "Logout Successful",
          confirmButtonColor: "#2D85DE",
        });
        setTimeout(() => {
          localStorage.clear();
          location.href = "index.html";
        }, 3000);
      } else {
        Swal.fire({
          icon: "info",
          text: "Unsuccessful",
          confirmButtonColor: "#2D85DE",
        });
        myModal.style.display = "none";
      }
    })
    .catch((error) => console.log("error", error));
}
*/

/*
function logout() {
  const myModal = document.querySelector(".pagemodal");
  myModal.style.display = "block";

  // getting the user log details from the localstorage
  const getData = localStorage.getItem("adminLogData");
  const myData = JSON.parse(getData);
  const data = myData.token;
  console.log(data);

  const logHeader = new Headers();
  logHeader.append("Authorization", `Bearer ${data}`);

  const logReg = {
    method: "GET",
    headers: logHeader,
  };

  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/logout";
  fetch(url, logReg)
    .then((response) => {
      return response.json(); // add return statement here
    })
    .then((result) => {
      console.log(result);
      if (result.message === "success") {
        Swal.fire({
          icon: "success",
          text: "Logout Successful",
          confirmButtonColor: "#2D85DE",
        });
        setTimeout(() => {
          localStorage.clear();
          location.href = "index.html";
        }, 3000);
      } else {
        Swal.fire({
          icon: "info",
          text: "Unsuccessful",
          confirmButtonColor: "#2D85DE",
        });

        myModal.style.display = "none";
      }
    })
    .catch((error) => console.log(error)); // add catch statement here
}
*/

function logout() {
  const myModal = document.querySelector(".pagemodal");
  myModal.style.display = "block";

  // getting the user log details from the localstorage
  const getData = localStorage.getItem("adminLogData");
  const myData = JSON.parse(getData);
  const data = myData.token;
  console.log(data);

  const logHeader = new Headers();
  logHeader.append("Authorization", `Bearer ${data}`);
  console.log(logHeader);
  const logReg = {
    method: "GET",
    headers: logHeader,
  };

  const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/logout";
  fetch(url, logReg)
    .then((response) => {
      return response.json();
    })
    // .then((result) => {
    //   console.log(result);
    //   if (result.message === "success") {
    //     Swal.fire({
    //       icon: "success",
    //       text: "Logout Successful",
    //       confirmButtonColor: "#2D85DE",
    //     });
    //     setTimeout(() => {
    //       localStorage.clear();
    //       location.href = "index.html";
    //     }, 3000);
    //   } else {
    //     Swal.fire({
    //       icon: "info",
    //       text: "Unsuccessful",
    //       confirmButtonColor: "#2D85DE",
    //     });

    //     myModal.style.display = "none";
    //   }
    // })
    .then((result) => {
      console.log(result);
      if (result.message === "success") {
        Swal.fire({
          icon: "success",
          text: "Logout Successful",
          confirmButtonColor: "green",
        });
        setTimeout(() => {
          localStorage.clear();
          location.href = "index.html";
        }, 4000);
      } else {
        Swal.fire({
          icon: "alert",
          text: "Unsuccessful Logout",
          confirmButtonColor: "red",
        });
        myModal.style.display = "none";
      }
    })
    .catch((error) => console.log(error));
}
