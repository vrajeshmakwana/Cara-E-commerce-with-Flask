// Product data
const products = [
  {
    id: 1,
    name: "Premium Watch",
    image: "/static/uploads/watch.jpg",
    description: "Handcrafted  with embedded details",
    price: 129.99,
    quantity: 1,
  },
  {
    id: 2,
    name: "Designer Leather Handbag",
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "Genuine leather handbag with gold-plated hardware",
    price: 349.99,
    quantity: 1,
  },
  {
    id: 3,
    name: "Italian Leather Shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "Handmade in Italy, premium calfskin leather",
    price: 249.99,
    quantity: 1,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the invoice
  initializeInvoice();
});

// Initialize the invoice with products and calculations
function initializeInvoice() {
  const productItemsContainer = document.getElementById("product-items");

  // Clear any existing items
  productItemsContainer.innerHTML = "";
  console.log(productItemsContainer);

  // Add each product to the table
  products.forEach((product) => {
    const productRow = createProductRow(product);
    productItemsContainer.appendChild(productRow);
  });

  // Calculate and update totals
  updateInvoiceTotals();
}

// Create a table row for a product
function createProductRow(product) {
  const row = document.createElement("tr");
  row.className = "hover:bg-gray-50 transition-colors";

  const itemTotal = product.price * product.quantity;

  row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="h-16 w-16 overflow-hidden rounded mr-4">
            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover product-image">
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">${product.name}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-500">${product.description}</div>
      </td>
      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        ${product.quantity}
      </td>
      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        ₹${product.price}
      </td>
      <td class="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
        ₹${itemTotal}
      </td>
    `;

  return row;
}

// Update the invoice totals
function updateInvoiceTotals() {
  document.getElementById("subtotal").textContent = "₹729.97";
  document.getElementById("tax").textContent = "₹58.40";
  document.getElementById("tot").textContent = " ₹788.37";
}

/**
 * Initialize animations for the invoice page
 */
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to interactive elements
  addHoverEffects();

  // Add scroll animations
  initScrollAnimations();
});

/**
 * Add hover effects to interactive elements
 */
function addHoverEffects() {
  // Get all product images
  const productImages = document.querySelectorAll(".product-image");

  // Add mouseover and mouseout event listeners to product images
  productImages.forEach((image) => {
    image.addEventListener("mouseover", () => {
      image.style.transform = "scale(1.05)";
      image.style.transition = "transform 0.3s ease-in-out";
    });

    image.addEventListener("mouseout", () => {
      image.style.transform = "scale(1)";
    });
  });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // Get all elements to animate on scroll
  const elementsToAnimate = document.querySelectorAll(
    ".animate-fade-in, .animate-slide-up"
  );

  // Create an Intersection Observer to detect when elements are in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add("visible");
          // Stop observing the element once it's animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
    }
  );

  // Observe each element
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Add a pulse animation to the total amount
 */
export function animateTotalAmount() {
  const totalElement = document.getElementById("total");

  // Add pulse animation class
  totalElement.classList.add("animate-pulse");

  // Remove animation class after animation completes
  setTimeout(() => {
    totalElement.classList.remove("animate-pulse");
  }, 1000);
}
