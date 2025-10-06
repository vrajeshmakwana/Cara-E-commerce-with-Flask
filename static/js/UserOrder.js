// Order data
const orderData = {
  orderNumber: "#1008",
  orderDate: "14 Jan.",
  total: "85.99 €",
  customer: "Emily Morgan",
  status: "Shipped",
  estimatedDelivery: "17 Jan. - 19 Jan.",
  trackingNumber: "US9876543210",
  courier: "USPS",
  shippingAddress: {
    name: "Emily Morgan",
    street: "123 Main Street",
    city: "Philadelphia",
    state: "PA",
    zip: "19101",
    country: "United States",
  },
  timeline: [
    {
      status: "Order Placed",
      date: "14 Jan.",
      time: "10:30 AM",
      completed: true,
      icon: "fas fa-shopping-cart",
      description: "Your order has been successfully placed",
    },
    {
      status: "Processing",
      date: "14 Jan.",
      time: "2:15 PM",
      completed: false,
      icon: "fas fa-cog",
      description: "Order is being prepared for shipment",
    },
    {
      status: "Shipped",
      date: "15 Jan.",
      time: "9:45 AM",
      completed: false,
      icon: "fas fa-truck",
      description: "Package is on its way to destination",
    },
    {
      status: "Out for Delivery",
      date: "17 Jan.",
      time: "",
      completed: false,
      icon: "fas fa-shipping-fast",
      description: "Package is out for final delivery",
    },
    {
      status: "Delivered",
      date: "17 Jan. - 19 Jan.",
      time: "",
      completed: false,
      icon: "fas fa-check-circle",
      description: "Package delivered successfully",
    },
  ],
};
// Now handling the timeline by fetching order status using backend
let timeline_status = document
  .getElementById("skeleton-loader")
  .getAttribute("data-status");

let status_index = orderData.timeline.findIndex(
  (status) => status.status.toLowerCase() === timeline_status
);

if (timeline_status === "pending") {
  orderData.timeline[0].current = true;
} else {
  orderData.timeline[status_index].current = true;

  // The progress bar width is defined after the main dynamic code generation so that progress bar element is found
  for (let i = 0; i <= status_index; i++) {
    orderData.timeline[i].completed = true;
  }
}

// Main content generation
function generateMainContent() {
  return `
        <div class="min-h-screen bg-white">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-40">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div class="flex items-center space-x-3 sm:space-x-4">
                            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-2 sm:p-3 rounded-xl shadow-lg">
                                <i class="fas fa-box text-white text-lg sm:text-xl"></i>
                            </div>
                            <div>
                                <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Order Tracking</h1>
                                <p class="text-sm sm:text-base text-blue-600">Track your order status and delivery</p>
                            </div>
                        </div>
                        <div class="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg border border-blue-100">
                            <i class="fas fa-info-circle text-blue-500"></i>
                            <span class="text-blue-700 font-medium">Need help? Contact support</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <!-- Order Summary Card -->
                <div class="bg-white rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div class="text-center group">
                            <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                                <i class="fas fa-calendar-alt text-blue-600 text-base sm:text-lg"></i>
                            </div>
                            <h3 class="text-xs sm:text-sm font-medium text-blue-500 uppercase tracking-wide">Order Placed</h3>
                            <p class="text-sm sm:text-lg font-semibold text-blue-900 mt-1">${
                              orderData.orderDate
                            }</p>
                        </div>
                        <div class="text-center group">
                            <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-100 to-emerald-200 rounded-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                                <i class="fas fa-euro-sign text-green-600 text-base sm:text-lg"></i>
                            </div>
                            <h3 class="text-xs sm:text-sm font-medium text-green-500 uppercase tracking-wide">Total Amount</h3>
                            <p class="text-sm sm:text-lg font-semibold text-green-900 mt-1">${
                              orderData.total
                            }</p>
                        </div>
                        <div class="text-center group">
                            <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-100 to-yellow-200 rounded-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                                <i class="fas fa-user text-orange-600 text-base sm:text-lg"></i>
                            </div>
                            <h3 class="text-xs sm:text-sm font-medium text-orange-500 uppercase tracking-wide">Ship To</h3>
                            <p class="text-sm sm:text-lg font-semibold text-orange-900 mt-1">${
                              orderData.customer
                            }</p>
                        </div>
                        <div class="text-center group">
                            <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-100 to-pink-200 rounded-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                                <i class="fas fa-hashtag text-purple-600 text-base sm:text-lg"></i>
                            </div>
                            <h3 class="text-xs sm:text-sm font-medium text-purple-500 uppercase tracking-wide">Order Number</h3>
                            <p class="text-sm sm:text-lg font-semibold text-purple-900 mt-1">${
                              orderData.orderNumber
                            }</p>
                        </div>
                    </div>
                </div>

                <!-- Status Banner -->
                <div class="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white animate-slide-up shadow-2xl">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 gap-4">
                        <div class="flex items-center space-x-3 sm:space-x-4">
                            <div class="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl animate-bounce-gentle">
                                <i class="fas fa-truck text-xl sm:text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="text-lg sm:text-2xl font-bold">Order Status: ${
                                  orderData.status
                                }</h2>
                                <p class="text-green-100 mt-1 text-sm sm:text-base">Estimated Delivery: ${
                                  orderData.estimatedDelivery
                                }</p>
                            </div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-xl w-full sm:w-auto">
                            <div class="flex items-center space-x-2">
                                <i class="fas fa-barcode"></i>
                                <span class="font-medium text-sm sm:text-base">Tracking: ${
                                  orderData.trackingNumber
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Horizontal Timeline -->
                <div class="bg-white rounded-2xl shadow-xl border border-purple-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 animate-fade-in">
                    <div class="flex items-center space-x-3 mb-6 sm:mb-8">
                        <div class="bg-gradient-to-r from-blue-100 to-purple-100 p-2 sm:p-3 rounded-xl">
                            <i class="fas fa-route text-blue-600 text-base sm:text-lg"></i>
                        </div>
                        <h3 class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Order Timeline</h3>
                    </div>
                    
                    <!-- Desktop Timeline -->
                    <div class="hidden sm:block relative">
                        <!-- Progress Line Background -->
                        <div class="absolute top-6 sm:top-8 left-6 sm:left-8 right-6 sm:right-8 h-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"></div>
                        
                        <!-- Animated Progress Line -->
                        <div id="progress" class="absolute top-6 sm:top-8 left-6 sm:left-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-2000 ease-out "></div>
                        
                        <!-- Timeline Items -->
                        <div class="flex justify-between relative z-10">
                            ${orderData.timeline
                              .map(
                                (item, index) => `
                                <div class="flex flex-col items-center timeline-item group" style="animation-delay: ${
                                  index * 200
                                }ms">
                                    <!-- Icon Circle -->
                                    <div class="relative mb-3 sm:mb-4">
                                        <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 ${
                                          item.current
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-pulse-ring"
                                            : item.completed
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                            : "bg-gradient-to-r from-blue-200 to-purple-200 text-blue-500"
                                        }">
                                            <i class="${
                                              item.icon
                                            } text-sm sm:text-lg"></i>
                                        </div>
                                        ${
                                          item.current
                                            ? `
                                            <div class="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping"></div>
                                        `
                                            : ""
                                        }
                                        ${
                                          item.completed
                                            ? `
                                            <div class="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                                <i class="fas fa-check text-white text-xs"></i>
                                            </div>
                                        `
                                            : ""
                                        }
                                    </div>
                                    
                                    <!-- Content -->
                                    <div class="text-center max-w-24 sm:max-w-32">
                                        <h4 class="font-semibold text-blue-900 mb-1 text-xs sm:text-sm">${
                                          item.status
                                        }</h4>
                                        <p class="text-xs text-blue-600 mb-1">${
                                          item.date
                                        }</p>
                                        ${
                                          item.time
                                            ? `<p class="text-xs text-blue-500">${item.time}</p>`
                                            : ""
                                        }
                                        ${
                                          item.description
                                            ? `
                                              <!-- Tooltip -->
                                              <div class="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                                        ${item.description}
                                        <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                    </div>`
                                            : ""
                                        }
                                        ${
                                          item.current
                                            ? '<span class="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium mt-2 animate-pulse">Current</span>'
                                            : ""
                                        }
                                    </div>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>

                    <!-- Mobile Timeline -->
                    <div class="block sm:hidden space-y-4">
                        ${orderData.timeline
                          .map(
                            (item, index) => `
                            <div class="flex items-center space-x-4 p-3 rounded-xl ${
                              item.current
                                ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                                : item.completed
                                ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                                : "bg-blue-50 border border-blue-200"
                            }" style="animation-delay: ${index * 200}ms">
                                <div class="relative">
                                    <div class="w-12 h-12 rounded-full flex items-center justify-center ${
                                      item.current
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse-ring"
                                        : item.completed
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                        : "bg-gradient-to-r from-blue-200 to-purple-200 text-blue-500"
                                    }">
                                        <i class="${item.icon} text-sm"></i>
                                    </div>
                                    ${
                                      item.completed
                                        ? `
                                        <div class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                            <i class="fas fa-check text-white text-xs"></i>
                                        </div>
                                    `
                                        : ""
                                    }
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-blue-900 text-sm">${
                                      item.status
                                    }</h4>
                                    <p class="text-xs text-blue-600">${
                                      item.date
                                    } ${item.time}</p>
                                    <p class="text-xs text-blue-500 ">${
                                      item.description
                                    }</p>
                                    ${
                                      item.current
                                        ? '<span class="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium mt-2">Current Status</span>'
                                        : ""
                                    }
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <!-- Enhanced Shipping Info -->
                    <div class="lg:col-span-1">
                        <div class="bg-white rounded-2xl shadow-xl border border-orange-100 p-4 sm:p-6 animate-fade-in">
                            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
                                <div class="bg-gradient-to-r from-orange-100 to-yellow-100 p-2 sm:p-3 rounded-xl">
                                    <i class="fas fa-shipping-fast text-orange-600 text-base sm:text-lg"></i>
                                </div>
                                <h3 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">Shipping Info</h3>
                            </div>
                            
                            <div class="space-y-3 sm:space-y-4">
                                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-300">
                                    <span class="text-blue-700 font-medium text-sm sm:text-base">Courier</span>
                                    <span class="font-bold text-blue-900 text-sm sm:text-base">${
                                      orderData.courier
                                    }</span>
                                </div>
                                <div class="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow duration-300">
                                    <span class="text-green-700 font-medium text-sm sm:text-base">Tracking Number</span>
                                    <span class="font-mono text-xs sm:text-sm font-bold text-blue-600">${
                                      orderData.trackingNumber
                                    }</span>
                                </div>
                            </div>

                            <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-200">
                                <h4 class="font-bold text-blue-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                                    <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                    Delivery Address
                                </h4>
                                <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-xl border border-blue-100">
                                    <div class="text-blue-700 space-y-1 text-sm sm:text-base">
                                        <p class="font-semibold text-blue-900">${
                                          orderData.shippingAddress.name
                                        }</p>
                                        <p>${
                                          orderData.shippingAddress.street
                                        }</p>
                                        <p>${orderData.shippingAddress.city}, ${
    orderData.shippingAddress.state
  } ${orderData.shippingAddress.zip}</p>
                                        <p class="font-medium">${
                                          orderData.shippingAddress.country
                                        }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Enhanced Map and Actions -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Map -->
                        <div class="bg-white rounded-2xl shadow-xl border border-green-100 p-4 sm:p-6 animate-fade-in">
                            <div class="flex items-center space-x-3 mb-4 sm:mb-6">
                                <div class="bg-gradient-to-r from-green-100 to-emerald-100 p-2 sm:p-3 rounded-xl">
                                    <i class="fas fa-map-marker-alt text-green-600 text-base sm:text-lg"></i>
                                </div>
                                <h3 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Delivery Location</h3>
                            </div>
                            
                            <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 h-48 sm:h-64 lg:h-80 group">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.14291136767!2d-75.27108034629062!3d39.98799330050168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b7d8d4b54beb%3A0x89f514d88c3e58c1!2sPhiladelphia%2C%20PA%2C%20USA!5e0!3m2!1sen!2sus!4v1705666800000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style="border:0;"
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                    class="rounded-xl transition-transform duration-300 group-hover:scale-105">
                                </iframe>
                                <div class="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:bg-white transition-colors duration-300 cursor-pointer">
                                    <i class="fas fa-expand text-blue-600 hover:text-purple-600 transition-colors duration-300 text-sm sm:text-base"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Enhanced Quick Actions -->
                        <div class="bg-white rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6 animate-fade-in">
                            <h3 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">Quick Actions</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <button class="group flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    <i class="fas fa-download group-hover:animate-bounce text-sm sm:text-base"></i>
                                    <span class="font-medium text-sm sm:text-base">Download Invoice</span>
                                </button>
                                <button class="group flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    <i class="fas fa-headset group-hover:animate-bounce text-sm sm:text-base"></i>
                                    <span class="font-medium text-sm sm:text-base">Contact Support</span>
                                </button>
                                <button class="group flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    <i class="fas fa-share-alt group-hover:animate-bounce text-sm sm:text-base"></i>
                                    <span class="font-medium text-sm sm:text-base">Share Tracking</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Enhanced Footer -->
            <footer class="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-12 sm:mt-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div class="text-center">
                        <div class="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl inline-block mb-3 sm:mb-4">
                            <i class="fas fa-box text-xl sm:text-2xl"></i>
                        </div>
                        <p class="text-base sm:text-lg font-medium mb-2">&copy; 2024 Order Tracking System. All rights reserved.</p>
                        <p class="text-blue-100 text-sm sm:text-base">Questions? Contact our support team 24/7</p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

// Initialize the page with skeleton loader
setTimeout(() => {
  document.querySelector("#app").innerHTML = generateMainContent();

  // Hide skeleton loader and show main content
  setTimeout(() => {
    document.getElementById("skeleton-loader").style.opacity = "0";
    document.getElementById("app").style.opacity = "1";

    setTimeout(() => {
      document.getElementById("skeleton-loader").style.display = "none";
    }, 500);
  }, 100);

  // Add enhanced interactivity
  setTimeout(() => {
    // Enhanced button interactions
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const buttonText = e.target.textContent || e.target.innerText;
        console.log(`Clicked: ${buttonText.trim()}`);

        // Enhanced visual feedback
        button.style.transform = "scale(0.95)";
        setTimeout(() => {
          button.style.transform = "scale(1.05)";
          setTimeout(() => {
            button.style.transform = "scale(1)";
          }, 100);
        }, 100);
      });
    });

    // Defining Progress Bar width in order to match the circle and show the exact progress
    let progress_bar = document.getElementById("progress");
    if (progress_bar) {
      console.log(timeline_status);

      if (timeline_status === "Shipped") {
        progress_bar.style.width = "44%";
      } else if (timeline_status === "processing") {
        progress_bar.style.width = "22%";
      } else if (timeline_status === "delivered") {
        progress_bar.style.width = "91%";
      } else {
        progress_bar.style.width = "0%";
      }
    }

    // Timeline item hover effects
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-8px)";
        item.style.transition = "transform 0.3s ease";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0)";
      });
    });

    // Enhanced real-time status updates
    setInterval(() => {
      const currentStatus = document.querySelector(".animate-pulse-ring");
      if (currentStatus) {
        currentStatus.style.boxShadow = "0 0 30px rgba(59, 130, 246, 0.6)";
        setTimeout(() => {
          currentStatus.style.boxShadow = "none";
        }, 1500);
      }
    }, 4000);
  }, 200);
}, 2500); // 2.5 second loading simulation
