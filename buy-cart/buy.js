// ===== سبد خرید =====

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, img, code) {
  const cart = getCart();
  const existing = cart.find((i) => i.code === code);
  if (existing) existing.qty += 1;
  else cart.push({ name, price, img, code, qty: 1 });
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  const el = document.getElementById("cart-count");
  if (!el) return;
  el.textContent = total;
  total > 0 ? el.classList.add("show") : el.classList.remove("show");
}

function increaseQty(code) {
  const cart = getCart();
  const item = cart.find((i) => i.code === code);
  if (item) item.qty += 1;
  saveCart(cart);
  updateCartCount();
  updateItemUI(code, item ? item.qty : 1);
  updateSummary();
}

function decreaseQty(code) {
  let cart = getCart();
  const item = cart.find((i) => i.code === code);
  if (!item) return;
  item.qty -= 1;
  if (item.qty <= 0) {
    openDeleteModal(code);
    return;
  }
  saveCart(cart);
  updateCartCount();
  updateItemUI(code, item.qty);
  updateSummary();
}

// آپدیت فقط عدد و قیمت — بدون render کامل
function updateItemUI(code, qty) {
  const cart = getCart();
  const product = cart.find((i) => i.code === code);
  if (!product) return;

  const qtyEl = document.querySelector(`[data-code="${code}"] .qty-display`);
  const priceEl = document.querySelector(`[data-code="${code}"] .price-final`);

  if (qtyEl) qtyEl.textContent = qty;
  if (priceEl) {
    const unitPrice = Number(product.price.replace(/\./g, ""));
    priceEl.textContent = (unitPrice * qty).toLocaleString("fa-IR") + " تومان";
  }
}

function updateSummary() {
  const cart = getCart();
  let totalPrice = 0;

  cart.forEach((product) => {
    totalPrice += Number(product.price.replace(/\./g, "")) * product.qty;
  });

  const discount = Math.floor(totalPrice * 0.1);
  const payable = totalPrice - discount;

  const totalEl = document.getElementById("summary-total");
  const discountEl = document.getElementById("summary-discount");
  const payableEl = document.getElementById("summary-payable");

  if (totalEl) totalEl.textContent = totalPrice.toLocaleString("fa-IR") + " تومان";
  if (discountEl) discountEl.textContent = discount.toLocaleString("fa-IR") + " تومان";
  if (payableEl) payableEl.textContent = payable.toLocaleString("fa-IR") + " تومان";
}

// مودال حذف
let productCodeToDelete = null;

function openDeleteModal(code) {
  productCodeToDelete = code;
  document.getElementById("deleteModal").classList.add("active");
}

document.getElementById("cancelDelete")?.addEventListener("click", () => {
  document.getElementById("deleteModal").classList.remove("active");
  productCodeToDelete = null;
});

document.getElementById("confirmDelete")?.addEventListener("click", () => {
  let cart = getCart();
  cart = cart.filter((i) => i.code !== productCodeToDelete);
  saveCart(cart);
  document.getElementById("deleteModal").classList.remove("active");
  productCodeToDelete = null;
  updateCartCount();
  renderCart();
});

function renderCart() {
  const cartItemsEl = document.getElementById("cart-items-list");
  const cartSummary = document.getElementById("cart-summary");
  if (!cartItemsEl) return;

  const cart = getCart();
  cartItemsEl.innerHTML = "";

  if (!cart.length) {
    if (cartSummary) cartSummary.style.display = "none";
    cartItemsEl.innerHTML = `
      <div class="none-product">
        <h1>سبد خرید شما خالی هست!</h1>
        <p>می‌توانید برای مشاهده محصولات بیشتر به صفحه اصلی مراجعه کنید.</p>
        <a href="../index.html">
          <button class="none-product-button">بازگشت به صفحه اصلی</button>
        </a>
      </div>`;
    return;
  }

  if (cartSummary) cartSummary.style.display = "block";

  cartItemsEl.innerHTML += `<div class="cart-title">سبد خرید شما</div>`;

  cart.forEach((product) => {
    const unitPrice = Number(product.price.replace(/\./g, ""));
    const totalItemPrice = unitPrice * product.qty;
    const originalPrice = Math.round(unitPrice * 1.3);

    cartItemsEl.innerHTML += `
      <div class="cart-item" data-code="${product.code}">
        <div class="cart-item-img">
          <img src="${product.img}" width="80" />
          <div class="cart-item-counter">
            <button class="qty-btn" onclick="increaseQty('${product.code}')">+</button>
            <span class="qty-display">${product.qty}</span>
            <button class="qty-btn" onclick="decreaseQty('${product.code}')">-</button>
          </div>
        </div>
        <div>
          <h3>${product.name}</h3>
          <p class="product-code">کد محصول : ${product.code}</p>
          <p class="product-delivery">آماده ارسال تا 2 روز دیگر</p>
          <div class="cart-item-prices">
            <span class="price-badge">%10</span>
            <span class="price-final">${totalItemPrice.toLocaleString("fa-IR")} تومان</span>
            <span class="price-original">${originalPrice.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div class="quantity-control">
            <button onclick="openDeleteModal('${product.code}')">حذف محصول</button>
          </div>
        </div>
      </div>`;
  });

  updateSummary();
}

// اجرا
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});