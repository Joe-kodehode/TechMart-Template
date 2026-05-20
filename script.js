/* ─── Manual theme toggle ─────────────────────── */
const themeBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme"); // 'dark' or 'light' or null

/* 1.  apply saved choice (if any) */
if (savedTheme === "dark") {
  document.body.dataset.theme = "dark";
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙"; // site starts in light mode
}

/* 2.  toggle on click */
themeBtn.addEventListener("click", () => {
  const dark = document.body.dataset.theme === "dark";
  if (dark) {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "🌙";
  } else {
    document.body.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "☀️";
  }
});

/* ──────────────────────────────────────────────
   PRODUCT CAROUSEL – always scroll one full card
   ────────────────────────────────────────────── */
const grid = document.querySelector(".product-grid");
const leftBtn = document.getElementById("scroll-left");
const rightBtn = document.getElementById("scroll-right");

function getCardWidth() {
  /* first visible card sets the stride */
  return grid.querySelector(".product-card").offsetWidth;
}

function scrollOne(dir = 1) {
  grid.scrollBy({ left: dir * getCardWidth(), behavior: "smooth" });
}

/* click handlers */
leftBtn.onclick = () => scrollOne(-1);
rightBtn.onclick = () => scrollOne(1);

/* keep stride correct if viewport changes (e.g. phone rotation) */
window.addEventListener("resize", () => {
  /* optional: snap grid to the nearest whole card after resize */
  const mod = grid.scrollLeft % getCardWidth();
  grid.scrollLeft -= mod; // quick-snap
});

// Horizontal product scroll
//  const grid = document.querySelector(".product-grid");
//  document.getElementById("scroll-left").onclick = () => grid.scrollBy({ left: -300, behavior: 'smooth' });
//  document.getElementById("scroll-right").onclick = () => grid.scrollBy({ left: 300, behavior: 'smooth' });

// const grid = document.querySelector(".product-grid");
// const leftBtn  = document.getElementById("scroll-left");
// const rightBtn = document.getElementById("scroll-right");

// function getCardWidth() {
//   return grid.querySelector(".product-card").offsetWidth;
// }

// leftBtn.onclick  = () => grid.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
// rightBtn.onclick = () => grid.scrollBy({ left:  getCardWidth(), behavior: "smooth" });

// Hamburger menu toggle

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

function toggleMenu() {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
}

hamburger.addEventListener("click", toggleMenu);

navMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") toggleMenu(); // close after choosing a link
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("open")) toggleMenu();
});

//  const hamburger = document.getElementById("hamburger");
//  const navMenu = document.getElementById("nav-menu");
//  hamburger.addEventListener("click", () => navMenu.classList.toggle("open"));

// Contact form dialog
const contactForm = document.getElementById("contactForm");
const contactDialog = document.getElementById("contactDialog");
const closeDialogBtn = document.getElementById("closeDialog");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  contactDialog.showModal();
});
closeDialogBtn.addEventListener("click", () => {
  contactDialog.close();
  contactForm.reset();
});

// Gallery Image Popup
const gallery = document.querySelector(".auto-scroll-gallery");
gallery.onclick = (e) => {
  if (e.target.tagName === "IMG") {
    const popup = document.createElement("div");
    popup.style =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:10000;";
    popup.innerHTML = `<img src="${e.target.src}" style="max-width:90%;max-height:90%" />`;
    popup.onclick = () => popup.remove();
    document.body.appendChild(popup);
  }
};

//Gallery image scroll infinite repetitive
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".gallery-track");
  const images = Array.from(track.children);
  const imageWidth = images[0].offsetWidth + 10; // 10px gap

  let offset = 0;

  function scrollGallery() {
    offset -= 1; // Adjust scroll speed here
    track.style.transform = `translateX(${offset}px)`;

    // If the first image has completely scrolled out of view
    if (Math.abs(offset) >= imageWidth) {
      // Move the first image to the end
      track.appendChild(track.firstElementChild);
      // Reset the offset
      offset += imageWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    requestAnimationFrame(scrollGallery);
  }

  scrollGallery();
});

//Gallery scroll pause on hover
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".auto-scroll-gallery");
  const track = gallery.querySelector(".gallery-track");
  let scrollSpeed = 1;
  let isPaused = false;

  function loopScroll() {
    if (!isPaused) {
      gallery.scrollLeft += scrollSpeed;
      if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
        gallery.scrollLeft = 0;
      }
    }
    requestAnimationFrame(loopScroll);
  }

  loopScroll();

  // Pause on hover
  gallery.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  // Resume on mouse leave
  gallery.addEventListener("mouseleave", () => {
    isPaused = false;
  });
});
