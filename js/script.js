

// اسکرول نوبار
let lastScrollTop = 0;
const navbar = document.getElementById('main-navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 50) {
    navbar.classList.add('navbar-hidden');
  } else {
    navbar.classList.remove('navbar-hidden');
  }
  
  lastScrollTop = scrollTop;
});
// اسکرول نوبار
