window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

const flexSwitchCheck = document.body.querySelector("#flexSwitchCheck");
const layoutSidenav_content = document.body.querySelector(
  "#layoutSidenav_content"
);
const sidenav = document.body.querySelector(".sb-sidenav");
const topNav = document.body.querySelector(".sb-topnav");
const mode = document.body.querySelector("#mode");
const text_color = document.body.querySelector(".text_colour");
const resetField1 = document.body.querySelector(".resetField1");
const resetField2 = document.body.querySelector(".resetField2");
const resetField3 = document.body.querySelector(".resetField3");

const toggleMode = () => {
  if (mode.innerHTML === "Light Mode") {
    topNav.classList.remove("navbar-light");
    topNav.classList.remove("bg-light");
    layoutSidenav_content.classList.remove("light_side_content");
    text_color.classList.remove("light");
    sidenav.classList.remove("sb-sidenav-light");
    resetField1.classList.remove("text-black");
    resetField2.classList.remove("text-black");
    resetField3.classList.remove("text-black");
    
    resetField1.classList.add("text-white");
    resetField2.classList.add("text-white");
    resetField3.classList.add("text-white");
    topNav.classList.add("navbar-dark");
    topNav.classList.add("bg-dark");
    layoutSidenav_content.classList.add("dark_side_content");
    text_color.classList.add("dark");
    sidenav.classList.add("sb-sidenav-dark");

    mode.innerHTML = "Dark Mode";
  } else {
    topNav.classList.add("navbar-light");
    resetField3.classList.add("text-black");
    resetField2.classList.add("text-black");
    resetField1.classList.add("text-black");
    topNav.classList.add("bg-light");
    layoutSidenav_content.classList.add("light_side_content");
    text_color.classList.add("light");
    sidenav.classList.add("sb-sidenav-light");

    text_color.classList.remove("dark");
    resetField3.classList.remove("text-white");
    resetField2.classList.remove("text-white");
    resetField1.classList.remove("text-white");
    topNav.classList.remove("navbar-dark");
    topNav.classList.remove("bg-dark");
    layoutSidenav_content.classList.remove("dark_side_content");
    sidenav.classList.remove("sb-sidenav-dark");

    mode.innerHTML = "Light Mode";
  }
};

setTimeout(function() {
  bootstrap.Alert.getOrCreateInstance(document.querySelector(".alert")).close();
}, 2000)

flexSwitchCheck.addEventListener("click", toggleMode);

var upload = document.getElementById("upload");
var imageResult = document.getElementById("imageResult");
var infoArea = document.getElementById("upload-label");

upload.addEventListener("change", showFileName);
function showFileName(event) {
  var upload = event.srcElement;
  var fileName = upload.files[0].name;
  infoArea.textContent = "File name: " + fileName;
}

upload.addEventListener("change", function () {
  readURL(upload);
});

function readURL(upload) {
  if (upload.files && upload.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        imageResult.setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(upload.files[0]);
  }
}
