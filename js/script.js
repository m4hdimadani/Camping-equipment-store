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
const hamburgerBtnsMobile = document.querySelectorAll(".hamburger-icon-navbar-div-mobil ");
const hamburgerBtns = document.querySelectorAll(".hamburger-icon-navbar-div ");
const menuNavbar = document.querySelector(".hamburger-menu-navbar");
const crossNavbar = document.querySelector(".cross-icon");
const overlay = document.querySelector(".overlay");

hamburgerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    menuNavbar.classList.add("active");
    overlay.classList.add("active");
  });
});
hamburgerBtnsMobile.forEach(btn => {
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