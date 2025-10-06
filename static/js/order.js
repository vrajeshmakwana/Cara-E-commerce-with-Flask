// Sample order data
// const orders = [
//   {
//     id: "ORD-2023-8761",
//     date: "May 15, 2023",
//     status: "delivered",
//     products: [
//       {
//         id: "PRD-001",
//         name: "Wireless Bluetooth Headphones",
//         price: "$89.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$89.99",
//   },
//   {
//     id: "ORD-2023-7492",
//     date: "June 2, 2023",
//     status: "shipped",
//     products: [
//       {
//         id: "PRD-002",
//         name: "Smart Watch Series 5",
//         price: "$199.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//       {
//         id: "PRD-003",
//         name: "Watch Charging Dock",
//         price: "$29.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$229.98",
//   },
//   {
//     id: "ORD-2023-6543",
//     date: "June 10, 2023",
//     status: "pending",
//     products: [
//       {
//         id: "PRD-004",
//         name: "Ergonomic Office Chair",
//         price: "$249.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$249.99",
//   },
//   {
//     id: "ORD-2023-5432",
//     date: "June 15, 2023",
//     status: "cancelled",
//     products: [
//       {
//         id: "PRD-005",
//         name: "Smartphone Gimbal Stabilizer",
//         price: "$79.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$79.99",
//   },
//   {
//     id: "ORD-2023-4321",
//     date: "June 20, 2023",
//     status: "delivered",
//     products: [
//       {
//         id: "PRD-006",
//         name: "Wireless Charging Pad",
//         price: "$39.99",
//         quantity: 2,
//         image:
//           "https://images.unsplash.com/photo-1608751819407-8c8672b95444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$79.98",
//   },
//   {
//     id: "ORD-2023-3210",
//     date: "June 25, 2023",
//     status: "shipped",
//     products: [
//       {
//         id: "PRD-007",
//         name: "Mechanical Keyboard",
//         price: "$129.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$129.99",
//   },
//   {
//     id: "ORD-2023-2109",
//     date: "July 1, 2023",
//     status: "pending",
//     products: [
//       {
//         id: "PRD-008",
//         name: "Wireless Gaming Mouse",
//         price: "$59.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//       {
//         id: "PRD-009",
//         name: "Mouse Pad XL",
//         price: "$19.99",
//         quantity: 1,
//         image:
//           "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//       },
//     ],
//     total: "$79.98",
//   },
// ];

// DOM elements
const ordersContainer = document.getElementById("ordersContainer");
const searchInput = document.getElementById("orderSearch");
const searchBtn = document.getElementById("searchBtn");
const statusFilter = document.getElementById("statusFilter");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearFiltersBtn = document.getElementById("clearFilters");
const resetSearchBtn = document.getElementById("resetSearch");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

// Current filter state
let currentFilters = {
  status: "all",
  searchTerm: "",
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderOrders(orders);
  setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
  // Search button click
  searchBtn.addEventListener("click", () => {
    currentFilters.searchTerm = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  // Search input enter key
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      currentFilters.searchTerm = searchInput.value.trim().toLowerCase();
      applyFilters();
    }
  });

  // Status filter dropdown change
  statusFilter.addEventListener("change", () => {
    currentFilters.status = statusFilter.value;

    // Sync the filter buttons with dropdown
    filterButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.status === currentFilters.status
      );
    });

    applyFilters();
  });

  // Filter buttons click
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Update filter state
      currentFilters.status = btn.dataset.status;

      // Sync the dropdown with buttons
      statusFilter.value = currentFilters.status;

      applyFilters();
    });
  });

  // Clear filters button
  clearFiltersBtn.addEventListener("click", resetFilters);

  // Reset search button
  resetSearchBtn.addEventListener("click", resetFilters);
}

// Apply current filters to the orders list
function applyFilters() {
  const { status, searchTerm } = currentFilters;

  // Filter orders based on current filters
  const filteredOrders = orders.filter((order) => {
    // Status filter
    const statusMatch = status === "all" || order.status === status;

    // Search term filter
    let searchMatch = true;
    if (searchTerm) {
      searchMatch =
        order.id.toLowerCase().includes(searchTerm) ||
        order.products.some((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
    }

    return statusMatch && searchMatch;
  });

  // Update the UI
  renderOrders(filteredOrders);
  updateResultsInfo(filteredOrders);
}

// Reset all filters to default
function resetFilters() {
  // Reset filter state
  currentFilters = {
    status: "all",
    searchTerm: "",
  };

  // Reset UI elements
  searchInput.value = "";
  statusFilter.value = "all";

  // Reset filter buttons
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.status === "all");
  });

  // Apply the reset filters
  applyFilters();
}

// Update the results count info
function updateResultsInfo(filteredOrders) {
  const { status, searchTerm } = currentFilters;
  const count = filteredOrders.length;

  // Hide/show no results message
  if (count === 0) {
    noResults.classList.remove("hidden");
    resultCount.textContent = "No orders found";
  } else {
    noResults.classList.add("hidden");

    // Construct result message
    let message = `Showing ${count} `;

    if (status !== "all") {
      message += `${status} `;
    }

    message += `order${count !== 1 ? "s" : ""}`;

    if (searchTerm) {
      message += ` matching "${searchTerm}"`;
    }

    resultCount.textContent = message;
  }
}

// Render orders to the DOM
function renderOrders(ordersToRender) {
  // Clear the container
  ordersContainer.innerHTML = "";

  // Add each order
  ordersToRender.forEach((order) => {
    const orderCard = createOrderCard(order);
    ordersContainer.appendChild(orderCard);
  });
}

// Create an order card element
function createOrderCard(order) {
  const orderCard = document.createElement("div");
  orderCard.className = "order-card";

  // Order header
  const orderHeader = document.createElement("div");
  orderHeader.className = "order-header";

  const orderInfo = document.createElement("div");

  const orderId = document.createElement("div");
  orderId.className = "order-id";
  orderId.textContent = order.id;

  const orderDate = document.createElement("div");
  orderDate.className = "order-date";
  orderDate.textContent = order.date;

  orderInfo.appendChild(orderId);
  orderInfo.appendChild(orderDate);

  const statusBadge = document.createElement("div");
  statusBadge.className = `status-badge status-${order.status}`;
  statusBadge.textContent =
    order.status.charAt(0).toUpperCase() + order.status.slice(1);

  orderHeader.appendChild(orderInfo);
  orderHeader.appendChild(statusBadge);

  orderCard.appendChild(orderHeader);

  // Products
  order.products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.className = "order-product";

    const productImage = document.createElement("img");
    productImage.className = "product-image";
    productImage.src = product.image;
    productImage.alt = product.name;

    const productDetails = document.createElement("div");
    productDetails.className = "product-details";

    const productName = document.createElement("div");
    productName.className = "product-name";
    productName.textContent = product.name;

    const productPrice = document.createElement("div");
    productPrice.className = "product-price";
    productPrice.textContent = product.price;

    const productQuantity = document.createElement("div");
    productQuantity.className = "product-quantity";
    productQuantity.textContent = `Quantity: ${product.quantity}`;

    productDetails.appendChild(productName);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(productQuantity);

    productEl.appendChild(productImage);
    productEl.appendChild(productDetails);

    orderCard.appendChild(productEl);
  });

  // Order footer
  const orderFooter = document.createElement("div");
  orderFooter.className = "order-footer";

  const orderTotal = document.createElement("div");
  orderTotal.className = "order-total";
  orderTotal.textContent = `Total: ${order.total}`;

  const orderActions = document.createElement("div");
  orderActions.className = "order-actions";

  const viewDetailsBtn = document.createElement("button");
  viewDetailsBtn.className = "action-btn btn-primary";
  viewDetailsBtn.textContent = "View Details";

  const trackOrderBtn = document.createElement("button");
  trackOrderBtn.className = "action-btn btn-secondary";
  trackOrderBtn.textContent = "Track Order";

  orderActions.appendChild(viewDetailsBtn);

  // Only show track button for shipped or pending orders
  if (order.status === "shipped" || order.status === "pending") {
    orderActions.appendChild(trackOrderBtn);
  }

  orderFooter.appendChild(orderTotal);
  orderFooter.appendChild(orderActions);

  orderCard.appendChild(orderFooter);

  return orderCard;
}
