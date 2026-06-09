const cartItems = document.getElementById("cart-items-list");
const cartSummary = document.getElementById("cart-summary");
const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let productCodeToDelete = null;

function addToCart(name, price, img, code) {
  const product = {
    name,
    price,
    img,
    code,
    qty: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.code === code);

  if (existingProduct) {
    existingProduct.qty += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
function removeFromCart(code) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.code !== code);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// باز کردن مودال
function openDeleteModal(code) {
  productCodeToDelete = code;
  deleteModal.classList.add("active");
}
// باز کردن مودال
// دکمه انصراف
cancelDelete.addEventListener("click", () => {
  deleteModal.classList.remove("active");
  productCodeToDelete = null;
});
// دکمه انصراف
// دکمه حذف
confirmDelete.addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.code !== productCodeToDelete);

  localStorage.setItem("cart", JSON.stringify(cart));

  deleteModal.classList.remove("active");
  productCodeToDelete = null;

  renderCart();
});
// دکمه حذف

// محاسبه جزییات محصولات
function updateSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalPrice = 0;

  cart.forEach((product) => {
    totalPrice += Number(product.price.replace(/\./g, "")) * product.qty;
  });

  const discount = Math.floor(totalPrice * 0.1);
  const payable = totalPrice - discount;

  document.getElementById("summary-total").textContent =
    totalPrice.toLocaleString("fa-IR") + " تومان";

  document.getElementById("summary-discount").textContent =
    discount.toLocaleString("fa-IR") + " تومان";

  document.getElementById("summary-payable").textContent =
    payable.toLocaleString("fa-IR") + " تومان";
}
// محاسبه جزییات محصولات

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";
  if (!cart.length) {
    cartSummary.style.display = "none";
    cartItems.innerHTML += `
    <div class='none-product'>
      <h1>سبد خرید شما خالی هست!</h1>
      <p>میتوانید برای مشاهده محصئلات بیشتر به صفحه اصلی مراجعه کنید.</p>
      <a href='/'>
      <button class='none-product-button'>
      بازگشت به صفحه اصلی
      </button>
      </a>
    </div>
 `;
  } else {
    cartSummary.style.display = "block";
    cart.forEach((product) => {
      cartItems.innerHTML += `
      <div class='cart-title'>سبد خرید شما</div>
        <div class="cart-item">
        <div class="cart-item-img">
          <img src="${product.img}" width="100">
         <div class="cart-item-counter">
         <button class="qty-btn" onclick="increaseQty('${product.code}')">+</button>
         <span>${product.qty}</span>
         <button class="qty-btn" onclick="decreaseQty('${product.code}')">-</button>
         </div>
        </div>
        <div>
          <h3>${product.name}</h3>
          <p>${product.price} تومان</p>
          <p>تعداد: ${product.qty}</p>
          <div class="quantity-control">
          <button onclick="openDeleteModal('${product.code}')">
            حذف محصول
          </button>
        </div>
      </div>
      `;
    });
  }
  updateSummary();
}

if (cartItems) {
  renderCart();
}
