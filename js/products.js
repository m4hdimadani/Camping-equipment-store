// تغییر عکس اصلی
function changeImg(thumb) {
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    document.getElementById("main-product-img").src = thumb.src;
  }
  
  // تعداد محصول
  const plus = document.getElementById("qty-plus");
  const minus = document.getElementById("qty-minus");
  const qty = document.getElementById("qty-value");
  
  plus.addEventListener("click", () => {
    qty.textContent = parseInt(qty.textContent) + 1;
  });
  
  minus.addEventListener("click", () => {
    if (parseInt(qty.textContent) > 1) {
      qty.textContent = parseInt(qty.textContent) - 1;
    }
  });