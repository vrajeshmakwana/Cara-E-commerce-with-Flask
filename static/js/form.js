const userForm = document.querySelector(".user-form");
const userBtn = document.querySelector(".user");
const adminBtn = document.querySelector(".admin");
const adminForm = document.querySelector(".admin-form");
const container = document.querySelector(".container");
const eyeBtn2 = document.querySelector(".ri-eye-off-fill");
const user_eye_btn = document.querySelector("#btn");
const adminpassword = document.querySelector("#adminpassword");

const userpassword = document.querySelector("#userpassword");

document.addEventListener("DOMContentLoaded", () => {
  sessionStorage.removeItem("JWT");
});

function toggleForm(type) {
  if (type === "admin") {
    container.style.height = "auto";
    userBtn.classList.remove("active");
    userForm.classList.remove("active");
    adminBtn.classList.add("active");
    adminForm.classList.add("active");
  } else {
    container.style.height = "auto";
    adminBtn.classList.remove("active");
    adminForm.classList.remove("active");
    userBtn.classList.add("active");
    userForm.classList.add("active");
  }
}
// ================== User Eye Button ===================== //
user_eye_btn.addEventListener("click", () => {
  if (userpassword.type == "password") {
    userpassword.type = "text";
    user_eye_btn.classList.toggle("ri-eye-fill");
    user_eye_btn.classList.toggle("ri-eye-off-fill");
  } else {
    user_eye_btn.classList.toggle("ri-eye-off-fill");
    user_eye_btn.classList.toggle("ri-eye-fill");
    userpassword.type = "password";
  }
});

// -------------------- Admin eye functionality -------------------- //
eyeBtn2.addEventListener("click", () => {
  if (adminpassword.type == "password") {
    adminpassword.type = "text";
    eyeBtn2.classList.toggle("ri-eye-fill");
    eyeBtn2.classList.toggle("ri-eye-off-fill");
  } else {
    eyeBtn2.classList.toggle("ri-eye-off-fill");
    eyeBtn2.classList.toggle("ri-eye-fill");
    adminpassword.type = "password";
  }
});
