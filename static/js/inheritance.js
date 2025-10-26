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

// Disabled the add to cart functionality because user is not logged in
function msg() {
  alert(
    "Dear user, please log in to your account to add products to your cart and enjoy a seamless shopping experience."
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const searchContainer = document.querySelector(".search-container");

  const searchInput = document.getElementById("search");
  const autocompleteResults = document.getElementById("autocomplete-results");
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const mobile = document.querySelector(".mobile");

  // Sample data for search autocomplete
  // Handle keyboard navigation

  // Function to show autocomplete
  searchInput.addEventListener("input", () => {
    autocompleteResults.classList.toggle("visible");
  });

  document.addEventListener("click", (e) => {
    if (!autocompleteResults.contains(e.target) && e.target !== searchInput) {
      autocompleteResults.classList.remove("visible");
    }
  });

  // ========== It is used to hide the mobile card  in desktop screen and in the mobile screens it is by default visible
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      mobile.style.display = "none";
    } else {
      mobile.style.display = "block";
    }
  });

  // Toggle profile dropdown
  profileToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    profileDropdown.classList.toggle("active");

    // Update ARIA attributes
    const isExpanded = profileDropdown.classList.contains("active");
    profileToggle.setAttribute("aria-expanded", isExpanded);
  });

  // Close profile dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !profileToggle.contains(event.target) &&
      !profileDropdown.contains(event.target)
    ) {
      profileDropdown.classList.remove("active");
      profileToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Handle keyboard navigation
  document.addEventListener("keydown", (event) => {
    // Close dropdowns on Escape key
    if (event.key === "Escape") {
      hideAutocomplete();
      profileDropdown.classList.remove("active");
      profileToggle.setAttribute("aria-expanded", "false");

      // On mobile, collapse the search bar
      if (window.innerWidth <= 576) {
        searchContainer.classList.remove("expanded");
      }
    }
  });

  // Responsive behavior
  window.addEventListener("resize", () => {
    // Reset search container on larger screens
    if (
      window.innerWidth > 576 &&
      searchContainer.classList.contains("expanded")
    ) {
      searchContainer.classList.remove("expanded");
    }
  });
});
