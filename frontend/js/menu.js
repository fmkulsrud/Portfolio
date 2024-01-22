export default function handleHambuger() {
  const hamburgerIconEl = document.querySelector(".mobile-menu-icon");
  const overlayMenuEl = document.querySelector(".overlay-menu");
  const exitMenuEl = document.querySelector(".close");

  /* e er en naturlig oppførsel, men å bruke prevent så nullstiller vi.*/
  hamburgerIconEl.addEventListener("click", (e) => {
    e.preventDefault();
    overlayMenuEl.classList.remove("hidden");
  });
  exitMenuEl.addEventListener("click", (e) => {
    e.preventDefault();
    overlayMenuEl.classList.add("hidden");
  });
}
