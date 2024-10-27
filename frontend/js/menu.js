export default function handleHamburger() {
  const hamburgerIconEl = document.querySelector(".mobile-menu-icon");
  const overlayMenuEl = document.getElementById("mobile-menu");
  const exitMenuEl = document.querySelector(".close");

  hamburgerIconEl.addEventListener("click", (e) => {
    e.preventDefault();
    overlayMenuEl.classList.remove("hidden");
  });

  exitMenuEl.addEventListener("click", (e) => {
    e.preventDefault();
    overlayMenuEl.classList.add("hidden");
  });
}

// Call the function to initialize the event listeners
handleHamburger();
