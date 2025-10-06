//// Sample order data

const orders = [
  {
    id: "ORD-4359155241",
    customer: {
      name: "Vrajesh Makwana",
      email: "vrajeshmakwana93@gmail.com",
      avatar: "VM",
    },
    date: "01-04-2025",
    time: "16:49:45",
    status: "pending",
    items: [
      {
        id: 1,
        name: "Premium T-Shirt",
        price: 29.99,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 2,
        name: "Denim Jeans",
        price: 59.99,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
      subtotal: 119.97,
      shipping: 5.99,
      tax: 10.8,
      total: 136.76,
    },
  },
  {
    id: "ORD-770613942",
    customer: {
      name: "Vrajesh Makwana",
      email: "vrajeshmakwana93@gmail.com",
      avatar: "VM",
    },
    date: "02-04-2025",
    time: "20:14:49",
    status: "processing",
    items: [
      {
        id: 3,
        name: "Wireless Headphones",
        price: 79.99,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    payment: {
      method: "PayPal",
      email: "vrajeshmakwana93@gmail.com",
      subtotal: 79.99,
      shipping: 0,
      tax: 7.2,
      total: 87.19,
    },
  },
  {
    id: "ORD-919242306",
    customer: {
      name: "Vrajesh Makwana",
      email: "vrajeshmakwana93@gmail.com",
      avatar: "VM",
    },
    date: "17-04-2025",
    time: "19:48:53",
    status: "shipped",
    items: [
      {
        id: 4,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 5,
        name: "Watch Band",
        price: 24.99,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "5678",
      subtotal: 249.97,
      shipping: 5.99,
      tax: 22.5,
      total: 278.46,
    },
  },
  {
    id: "ORD-168870269",
    customer: {
      name: "Vrajesh Makwana",
      email: "vrajeshmakwana93@gmail.com",
      avatar: "VM",
    },
    date: "17-04-2025",
    time: "20:00:29",
    status: "delivered",
    items: [
      {
        id: 6,
        name: "Running Shoes",
        price: 89.99,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "9876",
      subtotal: 89.99,
      shipping: 5.99,
      tax: 8.1,
      total: 104.08,
    },
  },
  {
    id: "ORD-785189016",
    customer: {
      name: "Vrajesh Makwana",
      email: "vrajeshmakwana93@gmail.com",
      avatar: "VM",
    },
    date: "17-04-2025",
    time: "20:02:23",
    status: "cancelled",
    items: [
      {
        id: 7,
        name: "Bluetooth Speaker",
        price: 49.99,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      {
        id: 8,
        name: "Power Bank",
        price: 29.99,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/5706279/pexels-photo-5706279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    ],
    shipping: {
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      subtotal: 79.98,
      shipping: 5.99,
      tax: 7.2,
      total: 93.17,
    },
  },
];

// DOM elements
const tableBody = document.getElementById("orders-table-body");
const cardView = document.getElementById("card-view");
const tableViewBtn = document.getElementById("table-view-btn");
const cardViewBtn = document.getElementById("card-view-btn");
const tableViewContainer = document.getElementById("table-view");
const orderModal = document.getElementById("order-modal");
const closeModalBtn = document.getElementById("close-modal");
const orderDetailsContent = document.getElementById("order-details-content");
const statusModal = document.getElementById("status-modal");
const closeStatusModalBtn = document.getElementById("close-status-modal");
const cancelStatusUpdateBtn = document.getElementById("cancel-status-update");
const statusForm = document.getElementById("status-form");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const selectAllCheckbox = document.getElementById("select-all");
const bulkActionsBtn = document.getElementById("bulk-actions-btn");
const selectedCountEl = document.getElementById("selected-count");
const orderSearchInput = document.getElementById("order-search");
const statusFilter = document.getElementById("status-filter");
const dateFilter = document.getElementById("date-filter");

// Current view state
let currentView = "table";
let selectedOrders = [];
let currentOrderId = 1;

// Modal necessary variables
let no_of_items = document.getElementById("itemCount");
let OrderField = document.getElementById("OrderField");
let OrderedDate = document.getElementById("Datetime");
let pimg = document.getElementById("ProductImg");
let pname = document.getElementById("ProductName");
let psubprice = document.getElementById("ProductSubPrice");
let pprice = document.getElementById("ProductPrice");
let subTotal = document.getElementById("Subtotal");
let Shipping = document.getElementById("Shipping");
let Tax = document.getElementById("Tax");
let statusSymbols = document.getElementById("statusSymbols");
let Total = document.getElementById("Total");
let GenerateInvoice = document.getElementById("generate-invoice");
let PrintOrder = document.getElementById("print-order");
// Main parent tag in which the modal dynamic data is added
const parentTag = document.getElementById("main");

// Status color mapping
const statusColors = {
  pending: "status-pending",
  processing: "status-processing",
  shipped: "status-shipped",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
};

// Format date for display
function formatDate(dateStr) {
  const parts = dateStr.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(parts[1]) - 1]} ${parts[0]}, ${parts[2]}`;
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Render table rows
function renderTableRows() {
  cardView.classList.add("hidden");

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      showToast(
        "Edit functionality will be implemented in the next update.",
        "info"
      );
    });
  });
  // Add event listeners to action buttons
  document.querySelectorAll(".view-btn").forEach((btn) => {
    // Call back function is given for a reason
    btn.addEventListener("click", () => openOrderModal());
    btn.addEventListener("click", () => {
      // Fetching data from the database of user orders
      let id = btn.getAttribute("data-cid");
      let order_id = btn.getAttribute("data-id");
      async function fetchOrders() {
        let data = await fetch(
          `http://127.0.0.1:5000/fetchOrders/${id}/${order_id}`
        );
        let response = data.json();

        response.then((res) => {
          parentTag.innerHTML = "";
          if (res[order_id].length <= 1) {
            no_of_items.textContent = res[order_id][0].Quantity + " items";
            OrderField.textContent = order_id;
            OrderedDate.textContent = res[order_id][0].Datetime.replace(
              "GMT",
              ""
            );

            // Defining the subtotal shipping price and the Tax
            subTotal.textContent =
              "₹" + parseFloat(res[order_id][0].Product_Price).toFixed(2);
            Shipping.textContent = "₹" + 0;
            Tax.textContent = "₹" + 150;
            Total.textContent =
              "₹" +
              parseFloat(res[order_id][0].Product_Price).toFixed(2) *
                res[order_id][0].Quantity;

            let pc = `
      <div id="product" class="product-item p-4">
        <div class="flex">
          <img src="${res[order_id][0].Product_Image}" alt="${
              res[order_id][0].Product_Name
            }" class="product-image">
          <div class="ml-4 flex-1">
            <div class="flex justify-between">
              <h5 class="font-medium">${res[order_id][0].Product_Name}</h5>
              <span style="margin-left: 10px;">₹${parseFloat(
                res[order_id][0].Product_Price * res[order_id][0].Quantity
              ).toFixed(2)}</span>
            </div>
            <p class="text-sm text-slate-500">₹ ${parseFloat(
              res[order_id][0].Product_Price
            ).toFixed(2)} × ${res[order_id][0].Quantity}</p>
          </div>
        </div>
      </div>
      `;
            parentTag.insertAdjacentHTML("afterbegin", pc);
            console.log(parentTag);
          } else {
            // Loop over products and insert each one
            Final_Price = 0;
            subPrice = 0;
            totalItems = 0;
            for (let i = 0; i < res[order_id].length; i++) {
              let { Product_Image, Product_Name, Product_Price, Quantity } =
                res[order_id][i];
              Final_Price = Final_Price + Product_Price * Quantity;
              totalItems = totalItems + Quantity;
              subPrice = subPrice + parseFloat(Product_Price);

              let productContent = `
      <div id="product" class="product-item p-4">
        <div class="flex">
          <img src="${Product_Image}" alt="${Product_Name}" class="product-image">
          <div class="ml-4 flex-1">
            <div class="flex justify-between">
              <h5 class="font-medium">${Product_Name}</h5>
              <span style="margin-left: 10px;">₹${(
                Product_Price * Quantity
              ).toFixed(2)}</span>
            </div>
            <p class="text-sm text-slate-500">₹ ${parseFloat(
              Product_Price
            ).toFixed(2)} × ${Quantity}</p>
          </div>
        </div>
      </div>
      `;
              OrderField.textContent = order_id;
              OrderedDate.textContent = res[order_id][0].Datetime.replace(
                "GMT",
                ""
              );

              // Defining the subtotal shipping price and the Tax
              no_of_items.textContent = totalItems + " items";
              subTotal.textContent = "₹" + subPrice;
              Shipping.textContent = "₹" + 0;
              Tax.textContent = "₹" + 150;
              Total.textContent = "₹" + Final_Price;

              parentTag.insertAdjacentHTML("afterbegin", productContent);
            }
          }
        });
      }
      fetchOrders();
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      showToast(
        "Edit functionality will be implemented in the next update.",
        "info"
      )
    );
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this order?")) {
        showToast("Order successfully deleted!", "success");
        // In a real app, you'd delete the order from the database here
      }
    });
  });

  // Add event listeners to checkboxes
  document.querySelectorAll(".order-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
}

// Render card view
function renderCardView() {
  cardView.classList.remove("hidden");
  cardView.style.marginTop = "2rem";
  // Add event listeners to view buttons
  cardView.querySelectorAll(".btn-secondary").forEach((btn) => {
    btn.addEventListener("click", () => openOrderModal());
  });

  //   // Add event listeners to edit buttons
  cardView.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      showToast(
        "Edit functionality will be implemented in the next update.",
        "info"
      )
    );
  });
}

// =============== Updating status of a order using javascript ================= //
function viewOrder(orderID) {
  const savedStatus = localStorage.getItem(`updated-${orderID}`);
  statusSymbols.innerHTML =
    savedStatus ||
    `<div class="mb-6 absolute -left-[25px] w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
     <i class="fas fa-check text-xs text-green-500"></i>
    </div>
    <p class="text-sm font-medium">Order Placed</p>
    <p class="text-xs text-slate-500">April 1, 2025 at 16:49 PM</p>`;
}

function UpdateOrderStatus() {
  document.querySelectorAll("#Update-btn").forEach((btn) => {
    const status = document.getElementById("new-status").value;
    let userOrderId = btn.getAttribute("data-id");

    async function UpdatingStatus() {
      let res = await fetch("http://127.0.0.1:5000/UpdateStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status, OrderID: userOrderId }),
      });
      let result = await res.json();
      showToast(result.message, result.type);
      statusSymbols.innerHTML = "";
      statusSymbols.insertAdjacentHTML(
        "beforeend",
        `${
          result.status == "pending"
            ? `
     <div id="statusSymbols" class="mb-6 relative">
                            <div
                                class="mt-6 mb-6 absolute -left-[25px] w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                                <i class="fas fa-check text-xs text-green-500"></i>
                            </div>
                            <p class="text-sm font-medium">Order Placed</p>
                            <p class="text-xs text-slate-500">April 1, 2025 at 16:49 PM</p>
                        </div>
        `
            : ""
        }

        ${
          result.status == "processing"
            ? `
            <div class="mb-6 relative">
                            <div
                                class="mt-6 mb-6 absolute -left-[25px] w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                                <i class="fas fa-check text-xs text-green-500"></i>
                            </div>
                            <p class="text-sm font-medium">Order Placed</p>
                            <p class="text-xs text-slate-500">April 1, 2025 at 16:49 PM</p>
            </div>
        <div class="mt-6 mb-6 relative">
          <div class="absolute -left-[25px] w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
            <i class="fas fa-cog text-xs text-blue-500"></i>
          </div>
          <p class="text-sm font-medium">Processing</p>
          <p class="text-xs text-slate-500">April 2, 2025 at 09:24 AM</p>
        </div>
        `
            : ""
        }
        
        ${
          result.status === "shipped" || result.status === "delivered"
            ? `
             <div class="mb-6 relative">
                            <div
                                class="mt-6 mb-6 absolute -left-[25px] w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                                <i class="fas fa-check text-xs text-green-500"></i>
                            </div>
                            <p class="text-sm font-medium">Order Placed</p>
                            <p class="text-xs text-slate-500">April 1, 2025 at 16:49 PM</p>
            </div>
        <div class="mt-6 mb-6 relative">
          <div class="absolute -left-[25px] w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
            <i class="fas fa-cog text-xs text-blue-500"></i>
          </div>
          <p class="text-sm font-medium">Processing</p>
          <p class="text-xs text-slate-500">April 2, 2025 at 09:24 AM</p>
        </div>
        <div class="mb-6 relative">
          <div class="absolute -left-[25px] w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-500 flex items-center justify-center">
            <i class="fas fa-truck text-xs text-slate-500"></i>
          </div>
          <p class="text-sm font-medium">Shipped</p>
          <p class="text-xs text-slate-500">April 3, 2025 at 11:30 AM</p>
        </div>
        `
            : ""
        }
        
        ${
          result.status === "delivered"
            ? `
      
        <div class="mt-6 mb-6 relative">
          <div class="absolute -left-[25px] w-6 h-6 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
            <i class="fas fa-check-circle text-xs text-green-500"></i>
          </div>
          <p class="text-sm font-medium">Delivered</p>
          <p class="text-xs text-slate-500">April 5, 2025 at 14:20 PM</p>
        </div>
        `
            : ""
        }
        
        ${
          result.status === "cancelled"
            ? `
        <div class="mb-6 relative">
          <div class="absolute -left-[25px] w-6 h-6 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
            <i class="fas fa-times text-xs text-red-500"></i>
          </div>
          <p class="text-sm font-medium">Cancelled</p>
          <p class="text-xs text-slate-500">April 2, 2025 at 10:15 AM</p>
        </div>
        `
            : ""
        }`
      );
      localStorage.setItem(`updated-${userOrderId}`, statusSymbols.innerHTML);
    }

    UpdatingStatus();
  });
}

function updateViewOrder(oid) {
  console.log(oid);
}

const btn = document.querySelectorAll("#view-btn");

// ========= Fetching user data and displayed it on the modal
btn.forEach((b) => {
  b.addEventListener("click", () => {
    // Fetching data from the database of user orders
    let id = b.getAttribute("data-cid");
    let order_id = b.getAttribute("data-id");
    async function fetchOrders() {
      let data = await fetch(
        `http://127.0.0.1:5000/fetchOrders/${id}/${order_id}`
      );
      let response = data.json();

      response.then((res) => {
        // Setting data-id in update status to verify and update particular order status
        document.querySelectorAll("#Update-btn").forEach((btn) => {
          btn.setAttribute("data-id", order_id);
        });

        parentTag.innerHTML = "";
        if (res[order_id].length <= 1) {
          no_of_items.textContent = res[order_id][0].Quantity;
          OrderField.textContent = order_id;
          OrderedDate.textContent = res[order_id][0].Datetime.replace(
            "GMT",
            ""
          );

          // Defining the subtotal shipping price and the Tax

          subTotal.textContent =
            "₹" + parseFloat(res[order_id][0].Product_Price).toFixed(2);
          Shipping.textContent = "₹" + 0;
          Tax.textContent = "₹" + 150;
          Total.textContent =
            "₹" +
            parseFloat(res[order_id][0].Product_Price).toFixed(2) *
              res[order_id][0].Quantity;

          let pc = `
  <div id="product" class="product-item p-4">
    <div class="flex">
      <img src="${res[order_id][0].Product_Image}" alt="${
            res[order_id][0].Product_Name
          }" class="product-image">
      <div class="ml-4 flex-1">
        <div class="flex justify-between">
          <h5 class="font-medium">${res[order_id][0].Product_Name}</h5>
          <span style="margin-left: 10px;">₹${parseFloat(
            res[order_id][0].Product_Price * res[order_id][0].Quantity
          ).toFixed(2)}</span>
        </div>
        <p class="text-sm text-slate-500">₹ ${parseFloat(
          res[order_id][0].Product_Price
        ).toFixed(2)} × ${res[order_id][0].Quantity}</p>
      </div>
    </div>
  </div>
  `;
          parentTag.insertAdjacentHTML("afterbegin", pc);
        } else {
          // Loop over products and insert each one
          Final_Price = 0;
          subPrice = 0;
          for (let i = 0; i < res[order_id].length; i++) {
            let { Product_Image, Product_Name, Product_Price, Quantity } =
              res[order_id][i];
            Final_Price = Final_Price + Product_Price * Quantity;
            subPrice = subPrice + parseFloat(Product_Price);

            let productContent = `
  <div id="product" class="product-item p-4">
    <div class="flex">
      <img src="${Product_Image}" alt="${Product_Name}" class="product-image">
      <div class="ml-4 flex-1">
        <div class="flex justify-between">
          <h5 class="font-medium">${Product_Name}</h5>
          <span style="margin-left: 10px;">₹${(
            Product_Price * Quantity
          ).toFixed(2)}</span>
        </div>
        <p class="text-sm text-slate-500">₹ ${parseFloat(Product_Price).toFixed(
          2
        )} × ${Quantity}</p>
      </div>
    </div>
  </div>
  `;
            OrderField.textContent = order_id;
            OrderedDate.textContent = res[order_id][0].Datetime.replace(
              "GMT",
              ""
            );

            // Defining the subtotal shipping price and the Tax

            subTotal.textContent = "₹" + subPrice;
            Shipping.textContent = "₹" + 0;
            Tax.textContent = "₹" + 150;
            Total.textContent = "₹" + Final_Price;

            parentTag.insertAdjacentHTML("afterbegin", productContent);
          }
        }
      });
    }
    fetchOrders();
  });
});

// Open order modal
function openOrderModal() {
  orderModal.classList.remove("hidden");
}

// Close order modal
function closeOrderModal() {
  orderModal.classList.add("hidden");
  document.body.style.overflow = "";
  currentOrderId = null;
}

// Open status modal
function openStatusModal() {
  // if (!currentOrderId) return;

  // const order = orders.find((o) => o.id === currentOrderId);
  // if (!order) return;

  // document.getElementById("new-status").value = order.status;
  statusModal.classList.remove("hidden");
}

// Close status modal
function closeStatusModal() {
  statusModal.classList.add("hidden");
}

// Handle checkbox change
function handleCheckboxChange() {
  const checkedBoxes = document.querySelectorAll(".order-checkbox:checked");
  const checkedIds = Array.from(checkedBoxes).map((cb) => cb.dataset.id);

  selectedOrders = checkedIds;
  selectedCountEl.textContent = selectedOrders.length;

  if (selectedOrders.length > 0) {
    bulkActionsBtn.removeAttribute("disabled");
  } else {
    bulkActionsBtn.setAttribute("disabled", "true");
    selectAllCheckbox.checked = false;
  }
}

// Handle select all checkbox
function handleSelectAll() {
  const isChecked = selectAllCheckbox.checked;

  document.querySelectorAll(".order-checkbox").forEach((cb) => {
    cb.checked = isChecked;
  });

  if (isChecked) {
    selectedOrders = orders.map((o) => o.id);
    selectedCountEl.textContent = selectedOrders.length;
    bulkActionsBtn.removeAttribute("disabled");
  } else {
    selectedOrders = [];
    selectedCountEl.textContent = "0";
    bulkActionsBtn.setAttribute("disabled", "true");
  }
}

// Show toast notification
function showToast(message, type = "success") {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll(".toast");
  existingToasts.forEach((toast) => {
    toast.remove();
  });

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: '<i class="fas fa-check-circle text-green-500"></i>',
    error: '<i class="fas fa-exclamation-circle text-red-500"></i>',
    warning: '<i class="fas fa-exclamation-triangle text-amber-500"></i>',
    info: '<i class="fas fa-info-circle text-blue-500"></i>',
  };

  const titles = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
  };

  toast.innerHTML = `
    <div class="toast-icon">
      ${icons[type]}
    </div>
    <div class="toast-content">
      <p class="toast-title">${titles[type]}</p>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  document.body.appendChild(toast);

  // Add event listener to close button
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove();
  });

  // Auto remove toast after 5 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

// Filter orders
function filterOrders() {
  const searchTerm = orderSearchInput.value.toLowerCase();
  const statusValue = statusFilter.value;
  const dateValue = dateFilter.value;

  let filteredOrders = orders;

  // Filter by search term
  if (searchTerm) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order.customer.email.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by status
  if (statusValue) {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === statusValue
    );
  }

  // Filter by date
  if (dateValue) {
    const dateObj = new Date(dateValue);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    filteredOrders = filteredOrders.filter(
      (order) => order.date === formattedDate
    );
  }

  // Render the filtered orders
  if (currentView === "table") {
    renderTableRows(filteredOrders);
  } else {
    renderCardView(filteredOrders);
  }
}

// Toggle between table and card view
function toggleView(view) {
  if (view === currentView) return;

  currentView = view;

  if (view === "table") {
    tableViewBtn.classList.add("active");
    cardViewBtn.classList.remove("active");
    tableViewContainer.classList.remove("hidden");
    cardView.classList.add("hidden");
    renderTableRows();
  } else {
    tableViewBtn.classList.remove("active");
    cardViewBtn.classList.add("active");
    tableViewContainer.classList.add("hidden");
    cardView.classList.remove("hidden");
    renderCardView();
  }
}

// Generate invoice (mock functionality)
function generateInvoice() {
  showToast("Invoice generated successfully!", "success");
}

// Print order details (mock functionality)
function printOrder() {
  showToast("Printing order details...", "info");
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderTableRows();

  // View toggle
  tableViewBtn.addEventListener("click", () => toggleView("table"));
  cardViewBtn.addEventListener("click", () => toggleView("card"));

  // Modal events
  closeModalBtn.addEventListener("click", closeOrderModal);
  document
    .getElementById("generate-invoice")
    .addEventListener("click", generateInvoice);
  document.getElementById("print-order").addEventListener("click", printOrder);
  document
    .getElementById("update-status")
    .addEventListener("click", openStatusModal);

  // Status modal events
  closeStatusModalBtn.addEventListener("click", closeStatusModal);
  cancelStatusUpdateBtn.addEventListener("click", closeStatusModal);
  statusForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newStatus = document.getElementById("new-status").value;

    // Update order status (in a real app, you'd update the database)
    const orderIndex = orders.findIndex((o) => o.id === currentOrderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = newStatus;

      // Re-render views
      if (currentView === "table") {
        renderTableRows();
      } else {
        renderCardView();
      }

      showToast("Order status updated successfully!", "success");
    }

    closeStatusModal();
    closeOrderModal();
  });

  // Select all checkbox
  selectAllCheckbox.addEventListener("change", handleSelectAll);

  // Search and filter
  orderSearchInput.addEventListener("input", filterOrders);
  statusFilter.addEventListener("change", filterOrders);
  dateFilter.addEventListener("change", filterOrders);

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === orderModal) {
      closeOrderModal();
    }

    if (e.target === statusModal) {
      closeStatusModal();
    }
  });
});
