const menuListEl = document.getElementById("menuList");
menuListEl.style.maxHeight = "0px";

function toggleMenu() {
  if(menuListEl.style.maxHeight == "0px") {
    menuListEl.style.maxHeight = "130px"
  }
  else {
    menuListEl.style.maxHeight = "0px"
  }
}
const rootEl = document.querySelector(":root"),
themeEl = document.querySelector("#theme");
let changedTheme = false;
const toggleTheme = () => {
  if(changedTheme === false) {
    rootEl.style.cssText = "--text-black: #fafafa; --bg-white: #020202;";
    changedTheme = true;
    console.log("changed")
  }
  else {
    rootEl.style.cssText = "--text-black: #020202; --bg-white: #fafafa;";
    changedTheme = false;
    console.log("back")
  }
}
themeEl.addEventListener("click", toggleTheme);


