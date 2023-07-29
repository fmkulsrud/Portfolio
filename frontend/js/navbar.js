export function activeNavbar() {
    // Get the current URL without the domain name
    const currentPath = new URL(window.location.href).pathname;
  
    // Select the navbar list
    const navbarList = document.getElementById("navbar-list");
  
    // Get all the anchor tags inside the navbar list
    const navLinks = navbarList.getElementsByTagName("a");
  
    // Loop through the anchor tags and check if their href matches the current URL
    for (let i = 0; i < navLinks.length; i++) {
      const link = navLinks[i];
      const href = link.getAttribute("href");
  
      // Convert the href to an absolute URL
      const absoluteHref = new URL(href, window.location.origin).pathname;
  
      // Compare the absolute href of the link with the current URL
      if (absoluteHref === currentPath) {
        // If there is a match, add a CSS class to the parent list item
        link.parentNode.classList.add("active");
        break; // Exit the loop if we found a match
      }
    }
  }
  