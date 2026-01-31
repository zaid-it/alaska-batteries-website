/**
 * Gallery Engine - Production Version
 */

const galleryData = {
  corporate: [
    { src: "assets/gallery/corp/corp-1.jpg" },
    { src: "assets/gallery/corp/corp-2.jpg" },
    { src: "assets/gallery/corp/corp-3.jpg" },
    { src: "assets/gallery/corp/corp-5.jpg" },
    { src: "assets/gallery/corp/corp-6.jpg" },
    { src: "assets/gallery/corp/corp-8.jpg" },
    { src: "assets/gallery/corp/corp-9.jpg" },
    { src: "assets/gallery/corp/corp-10.jpg" },
  ],
  dealer: [
    { src: "assets/gallery/dealer/d-1.jpg" },
    { src: "assets/gallery/dealer/d-2.jpg" },
    { src: "assets/gallery/dealer/d-3.jpg" },
    { src: "assets/gallery/dealer/d-4.jpg" },
    { src: "assets/gallery/dealer/d-5.jpg" },
    { src: "assets/gallery/dealer/d-6.jpg" },
    { src: "assets/gallery/dealer/d-7.jpg" },
    { src: "assets/gallery/dealer/d-8.jpg" },
    { src: "assets/gallery/dealer/d-9.jpg" },
    { src: "assets/gallery/dealer/d-10.jpg" },
    { src: "assets/gallery/dealer/d-11.jpg" },
  ],
};

function updateGallery(category) {
  const rail = document.getElementById("gallery-rail");
  const btns = document.querySelectorAll(".gallery-filter-btn");
  if (!rail) return;

  // Update Tabs
  btns.forEach((btn) => btn.classList.toggle("active-tab", btn.getAttribute("data-category") === category));

  // Clear and Fill
  rail.innerHTML = "";
  galleryData[category].forEach((item) => {
    const card = document.createElement("div");
    card.className = "gallery-card flex-none";
    card.onclick = () => openLightbox(item.src);

    card.innerHTML = `
            <img src="${item.src}" alt="${item.title}" onerror="this.src='https://placehold.co/600x800/111/fff?text=Image'">
            <div class="gallery-overlay"></div>
            
        `;

    card.onmousedown = (e) => {
      card.dataset.mouseDownX = e.clientX;
    };
    card.onmouseup = (e) => {
      const delta = Math.abs(e.clientX - (card.dataset.mouseDownX || 0));
      // If the mouse moved more than 5 pixels, don't open the modal
      if (delta < 5) {
        openLightbox(index);
      }
    };
    rail.appendChild(card);
  });

  // Reset scroll to start
  rail.scrollTo({ left: 0, behavior: "smooth" });
}

// Lightbox logic
function openLightbox(src, title) {
  const modal = document.getElementById("gallery-lightbox");
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-title").innerText = title;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("gallery-lightbox").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

document.addEventListener("DOMContentLoaded", () => updateGallery("corporate"));
let currentCategoryImages = [];

function updateGallery(category) {
  const rail = document.getElementById("gallery-rail");
  const btns = document.querySelectorAll(".gallery-filter-btn");
  if (!rail) return;

  // Update Global Cache for the slider
  currentCategoryImages = galleryData[category];

  // Update Tab UI
  btns.forEach((btn) => btn.classList.toggle("active-tab", btn.getAttribute("data-category") === category));

  rail.innerHTML = "";
  currentCategoryImages.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card flex-none";
    card.onclick = () => openLightbox(index); // Pass index to open at specific spot

    card.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <div class="gallery-overlay"></div>
            
        `;
    rail.appendChild(card);
  });
}

function openLightbox(index) {
  const modal = document.getElementById("gallery-lightbox");
  const slider = document.getElementById("lightbox-slider");

  slider.innerHTML = currentCategoryImages
    .map(
      (item) => `
        <div class="lightbox-slide">
            <img src="${item.src}" alt="${item.title}" draggable="false">
        </div>
    `,
    )
    .join("");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Use requestAnimationFrame to wait for the browser to render the modal
  requestAnimationFrame(() => {
    const slideWidth = slider.clientWidth;
    slider.scrollLeft = index * slideWidth;
    updateLightboxTitle(index);
  });
}

// Update Title based on which image is in view
document.getElementById("lightbox-slider").addEventListener("scroll", function () {
  const index = Math.round(this.scrollLeft / this.offsetWidth);
  updateLightboxTitle(index);
});

function updateLightboxTitle(index) {
  const titleElem = document.getElementById("lightbox-title");
  if (currentCategoryImages[index]) {
    titleElem.innerText = currentCategoryImages[index].title;
  }
}

// Navigation Controls
function nextLightbox() {
  const slider = document.getElementById("lightbox-slider");
  slider.scrollBy({ left: slider.offsetWidth, behavior: "smooth" });
}

function prevLightbox() {
  const slider = document.getElementById("lightbox-slider");
  slider.scrollBy({ left: -slider.offsetWidth, behavior: "smooth" });
}

function handleLightboxClick(e) {
  // Close only if clicking the backdrop, not the image/buttons
  if (e.target.id === "lightbox-slider" || e.target.classList.contains("lightbox-slide")) {
    closeLightbox();
  }
}

function closeLightbox() {
  document.getElementById("gallery-lightbox").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextLightbox();
  if (e.key === "ArrowLeft") prevLightbox();
});
let isDragging = false;
let startX;
let scrollLeft;

const slider = document.getElementById("lightbox-slider");

// Mouse Down - Start Dragging
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.scrollBehavior = "auto"; // Remove smooth during drag for precision
});

// Mouse Leave/Up - Stop Dragging
slider.addEventListener("mouseleave", () => {
  isDragging = false;
});

slider.addEventListener("mouseup", () => {
  isDragging = false;
  slider.style.scrollBehavior = "smooth";

  // Re-enable snapping by calculating nearest slide
  const index = Math.round(slider.scrollLeft / slider.offsetWidth);
  slider.scrollTo({ left: index * slider.offsetWidth, behavior: "smooth" });
});

// Mouse Move - The Actual Movement
slider.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Multiplier for speed
  slider.scrollLeft = scrollLeft - walk;
});

// Touch Support (for hybrid laptops)
slider.addEventListener("touchstart", () => {
  slider.style.scrollBehavior = "smooth";
});
/**
 * Universal Kinetic Scroll Logic
 * Works for any horizontal container
 */
function enableKineticScroll(containerId) {
  const ele = document.getElementById(containerId);
  if (!ele) return;

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    // Disable scroll-snap during drag for smoothness
    ele.style.scrollSnapType = "none";
    ele.style.scrollBehavior = "auto";

    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    ele.scrollLeft = pos.left - dx;
    ele.scrollTop = pos.top - dy;
  };

  const mouseUpHandler = function () {
    // Re-enable scroll-snap and smooth behavior
    ele.style.scrollSnapType = "x mandatory";
    ele.style.scrollBehavior = "smooth";

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  ele.addEventListener("mousedown", mouseDownHandler);
}

// Initialize for both components
document.addEventListener("DOMContentLoaded", () => {
  enableKineticScroll("gallery-rail");
  enableKineticScroll("lightbox-slider");
});
