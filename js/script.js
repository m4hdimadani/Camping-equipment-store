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
  slidesPerView: 4,
  breakpoints: {
    375: {
      slidesPerView: 1.5,
      spaceBetween: 14,
      centeredSlides: false,
    },
  },

});
// swapir محصولات پر فروش
