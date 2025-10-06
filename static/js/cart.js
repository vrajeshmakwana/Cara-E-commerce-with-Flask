// ======================== Cart Removing Item when Click on remove button ============== //
let removeBtn = document.querySelectorAll("#remove");
let removeTableData = document.querySelectorAll("#RemoveData");
let table = document.querySelector("#table");
const CheckoutBtn = document.querySelector(".pay");
const CartTotal = document.querySelector("#Carttotal");

function hasCartTotal() {
  console.log("button is clicked");
  //   First replacing the rupee symbol  and then converting the string it into integer
  if (parseInt(CartTotal.textContent.replace("₹", "")) === 0) {
    CheckoutBtn.querySelector("a").href = "#";
    alert("Your cart is empty. Please add items before checkout");
  }
}

CheckoutBtn.addEventListener("click", hasCartTotal);

//  Now updating the price as the quantity is being updated
const AllQuantityBtn = document.querySelectorAll("#ProductQuantity");
// Getting product total td tag
const cartTotal = document.getElementById("Carttotal");
function handleSubTotal() {
  const productPrice = document.querySelectorAll(".productPrice");
  const SubTotalHtml = document.getElementById("proTot");
  let CartSubTotal = 0;

  productPrice.forEach((element) => {
    CartSubTotal =
      CartSubTotal + parseFloat(element.textContent.replace("₹", ""));
  });
  SubTotalHtml.textContent = `₹${CartSubTotal.toFixed(2)}`;
  console.log(CartSubTotal);
}
// Calling to display whenever first time after adding the products the user visits the cart
handleSubTotal();

AllQuantityBtn.forEach((QuantityBtn) => {
  QuantityBtn.addEventListener("input", async () => {
    let UpdatedQuantity = QuantityBtn.value;
    let pid = QuantityBtn.getAttribute("data-pid");
    const productTotal = document.getElementsByClassName(
      `productTotal${pid}`
    )[0];
    console.log(productTotal);

    let data = {
      pid: pid,
      UpdatedQuantity: UpdatedQuantity,
    };
    const response = await fetch("http://127.0.0.1:5000/cartUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const details = await response.json();
    console.log(details);
    productTotal.textContent = "₹" + parseInt(details.ProductTotal).toFixed(2);
    CartTotal.textContent = `₹${parseFloat(details.Total).toFixed(2)}`;
  });
});

// ========== These is used to remove data from the database and displaying appropriate message =============== //
removeBtn.forEach((value) =>
  value.addEventListener("click", async (e) => {
    e.preventDefault();
    let pid = e.target.getAttribute("data-pid");

    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify(pid),
    };

    let result = confirm(
      "Are you sure you want to remove Cartoon T-Shirt  from your cart"
    );
    if (result) {
      let response = await fetch("http://127.0.0.1:5000/removeItem", option);
      let data = await response.json();
      const Total = document.getElementById("Carttotal");
      alert("Item is Removed Successfully");

      if (response.ok) {
        let deleterow = document.getElementById("row" + pid);
        console.log(deleterow);
        Total.textContent = `₹${parseInt(data.total).toFixed(2)}`;
        deleterow.classList.add("fade-out");
        deleterow.remove();
        handleSubTotal();
        let cartItemsCount = await fetch("http://127.0.0.1:5000/CountItem", {
          method: "POST",
        });
        let ItemsCount = await cartItemsCount.json();
        if (ItemsCount.ProductCounts === 0) {
          table.innerHTML ="<h4 id='EmptyCart'>Your Cart is Currently Empty</h4>";
        }
      } else {
        alert("Something Went Wrong");
      }
    }
  })
);
