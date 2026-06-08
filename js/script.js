// اسکرول نوبار
let lastScrollTop = 0;
const navbar = document.getElementById("main-navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 50) {
    navbar.classList.add("navbar-hidden");
  } else {
    navbar.classList.remove("navbar-hidden");
  }
  lastScrollTop = scrollTop;
});

// همبرگر منو
const hamburgerBtnsMobile = document.querySelectorAll(
  ".hamburger-icon-navbar-div-mobil "
);
const hamburgerBtns = document.querySelectorAll(".hamburger-icon-navbar-div ");
const menuNavbar = document.querySelector(".hamburger-menu-navbar");
const crossNavbar = document.querySelector(".cross-icon");
const overlay = document.querySelector(".overlay");

hamburgerBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuNavbar.classList.add("active");
    overlay.classList.add("active");
  });
});
hamburgerBtnsMobile.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuNavbar.classList.add("active");
    overlay.classList.add("active");
  });
});

crossNavbar.addEventListener("click", () => {
  menuNavbar.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  menuNavbar.classList.remove("active");
  overlay.classList.remove("active");
});

// swiper محصولات پرفروش
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false,
  grabCursor: true,
  breakpoints: {
    0: { slidesPerView: 1.5, spaceBetween: 14 },
    668: { slidesPerView: 3, spaceBetween: 16 },
    1025: { slidesPerView: 4, spaceBetween: 24 },
  },
});

// swiper محصولات تخفیف دار
const swiperOff = new Swiper(".swiper-off", {
  direction: "horizontal",
  loop: false,
  grabCursor: true,
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 14 },
    668: { slidesPerView: 2.5, spaceBetween: 16 },
    1025: { slidesPerView: 3, spaceBetween: 24 },
  },
});

// سرچ کردن
// داده محصولات - از HTML بخون یا اینجا تعریف کن
const products = [
  {
    name: "کوله پشتی",
    img: "./img/product/61mbnbBi2CL._AC_SL1500_-removebg-preview 1.png",
    price: "2.500.000",
    type: "product-img",
    url: "../products/backpack.html",
  },
  {
    name: "میز",
    img: "./img/product/download-removebg-preview 2.png",
    price: "2.500.000",
    type: "product-img-table",
    url: "../products/tant.html",
  },
  {
    name: "ماگ",
    img: "./img/product/mug image.png",
    price: "2.500.000",
    type: "product-img-table",
    url: "../products/mug.html",
  },
  {
    name: "عینک",
    img: "./img/product/sunset-reflection-sunglasses-nature-elegance-generated-by-ai-removebg-preview 1.png",
    price: "2.500.000",
    type: "product-img-glass",
    url: "../products/sunglasses.html",
  },
];

const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();

  if (value === "") {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    return;
  }

  const filtered = products.filter((p) => p.name.includes(value));

  if (filtered.length === 0) {
    searchResults.innerHTML = `<div class="search-no-result">محصولی یافت نشد</div>`;
  } else {
    searchResults.innerHTML = filtered
      .map(
        (p) => `
    <a href="${p.url}" class="search-result-item">
      <img src="${p.img}" alt="${p.name}" />
      <div class="search-result-info">
        <p class="search-result-name">${p.name}</p>
        <p class="search-result-price">${p.price} <span>تومان</span></p>
      </div>
    </a>
  `
      )
      .join("");
  }

  searchResults.style.display = "block";
});

// بستن با کلیک بیرون
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    searchResults.style.display = "none";
  }
});
// سرچ کردن

// modal auth
const authOverlay = document.getElementById("auth-overlay");
const authModal = document.getElementById("auth-modal");
const authClose = document.getElementById("auth-close");
const authBack = document.getElementById("auth-back");
const authSubmit = document.getElementById("auth-submit");
const otpSubmit = document.getElementById("otp-submit");
const authInput = document.getElementById("auth-input");
const authError = document.getElementById("auth-error");


document.querySelectorAll("#btn-register, #btn-login").forEach(btn => {
  btn.addEventListener("click", (e) => { e.preventDefault(); openAuth(); });
});

function openAuth() {
  authModal.classList.add("active");
  authOverlay.classList.add("active");
  step1.classList.remove("hidden");
  step2.classList.add("hidden");
  authInput.value = "";
  authError.classList.remove("show");
  authInput.classList.remove("error");
}
function closeAuth() {
  authModal.classList.remove("active");
  authOverlay.classList.remove("active");
}

authClose.addEventListener("click", closeAuth);
authOverlay.addEventListener("click", closeAuth);

function isValid(val) {
  return /^09[0-9]{9}$/.test(val) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

authSubmit.addEventListener("click", () => {
  const val = authInput.value.trim();
  if (!val || !isValid(val)) {
    authError.classList.add("show");
    authInput.classList.add("error");
    return;
  }
  authError.classList.remove("show");
  authInput.classList.remove("error");
  document.getElementById("otp-desc").textContent = `کد ۶ رقمی ارسال شده به ${val} را وارد کنید`;
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});
// modal auth
