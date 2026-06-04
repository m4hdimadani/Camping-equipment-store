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
// اسکرول نوبار

// swapir محصولات پر فروش
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false,
  grabCursor: true,
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      spaceBetween: 14,
    },
    668: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

const swiperOff = new Swiper(".swiper-off", {
  direction: "horizontal",
  loop: false,
  grabCursor: true,
  rtl: true,
  slidesPerView: 3,
  spaceBetween: 24,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 14,
    },
    668: {
      slidesPerView: 2.5,
      spaceBetween: 16,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});








