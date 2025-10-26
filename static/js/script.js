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
  const searchIcon = document.querySelector(".search-icon");
  const autocompleteResults = document.getElementById("autocomplete-results");
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const mobile = document.querySelector(".mobile");

  // By clicking on Product Redirecting to Product Details Webpage
  const productdivs = document.querySelectorAll(".pro");
  productdivs.forEach((productdiv) => {
    let pid = productdiv.getAttribute("data-product-id");
    let Token = window.location.href;
    Token = Token.split("/")[4];

    productdiv.onclick = () => {
      window.location.href = `http://127.0.0.1:5000/dashboard/${Token}/product/${pid}`;
    };
  });

  // Toggle search box on icon click (mobile only)
  searchIcon.addEventListener("click", function (e) {
    // Only toggle on mobile screens
    if (window.innerWidth <= 768) {
      searchInput.classList.toggle("active");
      // search box is focused and developer gets back to original screen then it displays the search bar responsively
      if (searchInput.classList.contains("active")) {
        window.addEventListener("resize", () => {
          if (window.innerWidth > 768) {
            searchInput.style.width = "100%";
            searchContainer.style.flex = "0 1 500px";
          }
        });
      }
      // Focus input when opening
      if (searchInput.classList.contains("active")) {
        searchContainer.style.flex = "0";
        autocompleteResults.style.display = "block";
        searchInput.style.width = "14rem";
        mobile.style.opacity = "0";
        setTimeout(() => {
          searchInput.focus();
        }, 400); // Wait for animation to complete
      } else {
        searchInput.style.width = "100%";
        searchContainer.style.flex = "0 1 500px";

        mobile.style.opacity = "1";

        searchInput.blur();
      }
    }
  });

  document.addEventListener("click", (event) => {
    // Hiding the search results when user stops searching
    const isClickInside = event.target.closest("#autocomplete-results");
    if (!isClickInside) {
      autocompleteResults.classList.add("hide");
    }
  });

  searchInput.addEventListener("input", () => {
    // Displaying the search results when user stops searching
    autocompleteResults.classList.remove("hide");
  });

  //
  // ========== It is used to hide the mobile card  in desktop screen and in the mobile screens it is by default visible
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      mobile.style.display = "none";
    } else {
      mobile.style.display = "flex";
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
});

// =============== These variable is created to check whether a product is aleready added to the cart or not //
let cartItems = [];

async function AddToCart(event, ProductId) {
  let productId = event.getAttribute("data-product-id");
  let productImage = event.getAttribute("data-product-image");
  let productName = event.getAttribute("data-product-name");
  let productPrice = event.getAttribute("data-product-price");
  let productQuantity = event.getAttribute("data-product-quantity");
  // Product Card details
  const productdivs = document.querySelectorAll(".pro");

  // Now when pressing on Add to Cart button then restricting to redirect it from product details webpage
  productdivs.forEach((productdiv) => {
    productdiv.onclick = () => {
      window.location.href = "#";
    };
  });

  if (cartItems.find((item) => item.id === ProductId)) {
    console.log(cartItems);

    alert("Your Product is already added to the cart");
    let pdata = cartItems.find((item) => item.id === ProductId);
    console.log(pdata.quantity, pdata.price);

    // ============ Updating product Quantity ========== //

    pdata.quantity = parseInt(pdata.quantity);
    pdata.price = parseInt(78 * pdata.quantity);
    let sendData = {
      id: ProductId,
      quantity: pdata.quantity,
      price: pdata.price,
    };
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify(sendData),
    };

    let response2 = await fetch("http://127.0.0.1:5000/submit", options);
    let data2 = await response2.json();
    console.log(data2);
    let count = await fetch(`http://127.0.0.1:5000/get-data/${user_id}`);
    let result_item = count.json();
    result_item.then((value) => {
      console.log(value);

      document.getElementById("update").innerHTML = value;
    });
  } else {
    cartItems.push({
      id: ProductId,
      image: productImage,
      name: productName,
      price: productPrice,
      quantity: productQuantity,
    });

    let productData = {
      id: productId,
      image: productImage,
      name: productName,
      price: parseFloat(productPrice),
      quantity: productQuantity,
    };

    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify(productData),
    };

    let response = await fetch("http://127.0.0.1:5000/submit", options);

    if (response.status === 200) {
      alert("Product added to the Cart Successfully");
    } else {
      alert(" Sorry Something went wrong Please Try again later...");
    }
    let data = await response.json();
    user_id = event.getAttribute("data-user-id");
    let count = await fetch(
      `http://127.0.0.1:5000/get-data/${user_id}`,
      options
    );
    console.log(count);

    let result_item = count.json();
    result_item
      .then((value) => {
        console.log(value);

        document.getElementById("update").innerHTML = value;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// ============= When deleted a record and go back to home page displaying the current products
async function co() {
  user_id = e.target.getAttribute("data-user-id");
  console.log(user_id);
  let count1 = await fetch(`http://127.0.0.1:5000/get-data?id=${user_id}`);
  let result_item = count1.json();

  result_item.then((value) => {
    document.getElementById("update").innerHTML = value;
  });
}

// document.querySelector("#RemoveData").addEventListener("click",co)
// ================= Generate Arrival products card dynamically ================================ //

const section2 = document.querySelector(".p2");
const arproducts = [
  { proImgUrl: "/static/images/products/n1.jpg" },
  { proImgUrl: "/static/images/products/n2.jpg" },
  { proImgUrl: "/static/images/products/n3.jpg" },
  { proImgUrl: "/static/images/products/n4.jpg" },
  { proImgUrl: "/static/images/products/n5.jpg" },
  { proImgUrl: "/static/images/products/n6.jpg" },
  { proImgUrl: "/static/images/products/n7.jpg" },
  { proImgUrl: "/static/images/products/n8.jpg" },
];

for (arpro of arproducts) {
  const arihtml = `<div class="pro">
                <img src="${arpro.proImgUrl}"
                    onclick="window.location.href='/home/Arrival Detail Section/Arrival1 Detail WebPage/aproduct1.html'"
                    alt="Error">
                <div class="des">
                    <span>addidas</span>
                    <h5>Cartoon Astronaut T-Shirts</h5>
                    <div class="star">
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                    </div>
                    <h4>$78</h4>
                </div>
                <a href="#"><i class="ri-shopping-cart-line" id="cart"></i></a>
            </div>`;

  section2.querySelector(".pro2").insertAdjacentHTML("beforeend", arihtml);
}
