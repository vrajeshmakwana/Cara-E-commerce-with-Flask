const bar = document.getElementById("bar");
const bar2 = document.getElementById("close");
const nav = document.getElementById("navbar");


// =============== Enabling the menu bar functionality It is common for all pages ============================ //
bar.addEventListener("click", () => {
  nav.classList.add("open");
});

bar2.addEventListener("click", () => {
  nav.classList.remove("open");
});

