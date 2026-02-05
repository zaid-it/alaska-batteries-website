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

let currentCategoryImages = [];
let currentMobileGalleryIndex = 0;
let currentLightboxIndex = 0;
let isMobileLightbox = false;

function updateGallery(category) {
  const rail = document.getElementById("gallery-rail");
  const btns = document.querySelectorAll(".gallery-filter-btn");
  if (!rail) return;

  // Update Global Cache for the slider
  currentCategoryImages = galleryData[category];
  currentMobileGalleryIndex = 0; // Reset mobile gallery index

  // Update Tab UI (also mirror to .filter-btn.active for consistent styling)
  btns.forEach((btn) => {
    const isActive = btn.getAttribute("data-category") === category;
    btn.classList.toggle("active-tab", isActive);
    if (btn.classList.contains("filter-btn")) btn.classList.toggle("active", isActive);
  });

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

  // Update mobile gallery
  updateMobileGallery();
}

function openLightbox(index) {
  const modal = document.getElementById("gallery-lightbox");
  const slider = document.getElementById("lightbox-slider");

  currentLightboxIndex = index;
  isMobileLightbox = window.innerWidth < 768;

  if (isMobileLightbox) {
    renderMobileLightboxSlide();
  } else {
    slider.innerHTML = currentCategoryImages
      .map(
        (item) => `
        <div class="lightbox-slide">
            <img src="${item.src}" alt="${item.title}" draggable="false">
        </div>
    `,
      )
      .join("");
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Use requestAnimationFrame to wait for the browser to render the modal
  requestAnimationFrame(() => {
    if (!isMobileLightbox) {
      const slideWidth = slider.clientWidth;
      slider.scrollLeft = index * slideWidth;
    }
    updateLightboxTitle(index);
  });
}

function renderMobileLightboxSlide() {
  const slider = document.getElementById("lightbox-slider");
  const item = currentCategoryImages[currentLightboxIndex];
  if (!item) return;

  let img = document.getElementById("lightbox-mobile-img");
  if (!img) {
    slider.innerHTML = `
      <div class="lightbox-slide">
          <img id="lightbox-mobile-img" class="lightbox-mobile-img" src="${item.src}" alt="${item.title}" draggable="false">
      </div>
    `;
    return;
  }

  img.classList.add("is-fading");
  requestAnimationFrame(() => {
    img.src = item.src;
    img.alt = item.title || "";
    img.onload = () => img.classList.remove("is-fading");
  });
}

// Update Title based on which image is in view
document.getElementById("lightbox-slider").addEventListener("scroll", function () {
  const index = Math.round(this.scrollLeft / this.offsetWidth);
  updateLightboxTitle(index);
});

function updateLightboxTitle(index) {
  const titleElem = document.getElementById("lightbox-title");
  if (!titleElem) return;
  if (currentCategoryImages[index]) {
    titleElem.innerText = currentCategoryImages[index].title;
  }
}

// Navigation Controls
function nextLightbox() {
  if (isMobileLightbox) {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentCategoryImages.length;
    renderMobileLightboxSlide();
    updateLightboxTitle(currentLightboxIndex);
    return;
  }
  const slider = document.getElementById("lightbox-slider");
  slider.scrollBy({ left: slider.offsetWidth, behavior: "smooth" });
}

function prevLightbox() {
  if (isMobileLightbox) {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
    renderMobileLightboxSlide();
    updateLightboxTitle(currentLightboxIndex);
    return;
  }
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

// Touch Support (for hybrid laptops + mobile swipe)
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
  slider.style.scrollBehavior = "smooth";
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (!isMobileLightbox) return;

  const delta = touchStartX - touchEndX;
  if (Math.abs(delta) < 30) return;

  if (delta > 0) {
    nextLightbox();
  } else {
    prevLightbox();
  }
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

document.addEventListener("DOMContentLoaded", () => {
  updateGallery("corporate");
  enableKineticScroll("gallery-rail");
  enableKineticScroll("lightbox-slider");
  updateMobileGallery();
});

/**
 * Mobile Gallery Functions
 */
function updateMobileGallery() {
  const featureImg = document.getElementById("mobile-feature-img");
  const leftImg = document.getElementById("mobile-left-img");
  const rightImg = document.getElementById("mobile-right-img");
  const counter = document.getElementById("mobile-gallery-counter");
  const total = document.getElementById("mobile-gallery-total");

  const images = currentCategoryImages;
  const totalCount = images.length;

  if (!featureImg || !leftImg || !rightImg || totalCount === 0) return;

  // Set feature image with smooth fade
  featureImg.classList.add("is-fading");
  requestAnimationFrame(() => {
    featureImg.src = images[currentMobileGalleryIndex].src;
    featureImg.onerror = () => (featureImg.src = "https://placehold.co/600x800/111/fff?text=Image");
    featureImg.onload = () => featureImg.classList.remove("is-fading");
  });

  // Set left/right images
  const prevIndex = (currentMobileGalleryIndex - 1 + totalCount) % totalCount;
  const nextIndex = (currentMobileGalleryIndex + 1) % totalCount;

  leftImg.classList.add("is-fading");
  rightImg.classList.add("is-fading");

  requestAnimationFrame(() => {
    leftImg.src = images[prevIndex].src;
    rightImg.src = images[nextIndex].src;

    leftImg.onerror = () => (leftImg.src = "https://placehold.co/400x600/111/fff?text=Image");
    rightImg.onerror = () => (rightImg.src = "https://placehold.co/400x600/111/fff?text=Image");

    leftImg.onload = () => leftImg.classList.remove("is-fading");
    rightImg.onload = () => rightImg.classList.remove("is-fading");
  });

  // Update counter
  counter.innerText = currentMobileGalleryIndex + 1;
  total.innerText = totalCount;
}

function mobileNextGallery() {
  const totalCount = currentCategoryImages.length;
  currentMobileGalleryIndex = (currentMobileGalleryIndex + 1) % totalCount;
  updateMobileGallery();
}

function mobilePrevGallery() {
  const totalCount = currentCategoryImages.length;
  currentMobileGalleryIndex = (currentMobileGalleryIndex - 1 + totalCount) % totalCount;
  updateMobileGallery();
}

function handleMobileImageClick(offset) {
  // Ignore click if it happened right after a swipe
  if (Date.now() - lastSwipeTime < 300) {
    return;
  }

  const totalCount = currentCategoryImages.length;
  let clickedIndex = currentMobileGalleryIndex + offset;
  clickedIndex = ((clickedIndex % totalCount) + totalCount) % totalCount;
  openLightbox(clickedIndex);
}

/**
 * Mobile Featured Image Swipe Support
 */
let lastSwipeTime = 0;

function initMobileFeaturedImageSwipe() {
  const featureContainer = document.getElementById("mobile-feature-image");
  if (!featureContainer) return;

  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;

  featureContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = false;
    },
    { passive: true },
  );

  featureContainer.addEventListener(
    "touchmove",
    (e) => {
      const touchCurrentX = e.changedTouches[0].screenX;
      const delta = Math.abs(touchStartX - touchCurrentX);

      // If moved more than 10px, consider it a swipe
      if (delta > 10) {
        isSwiping = true;
      }
    },
    { passive: true },
  );

  featureContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchStartX - touchEndX;

    // If it was a swipe (moved > 50px)
    if (isSwiping && Math.abs(delta) > 50) {
      e.preventDefault();
      e.stopPropagation();

      lastSwipeTime = Date.now();

      if (delta > 0) {
        // Swiped left - go to next image
        mobileNextGallery();
      } else {
        // Swiped right - go to previous image
        mobilePrevGallery();
      }
    }
  });
}

// Initialize swipe support after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileFeaturedImageSwipe);
} else {
  initMobileFeaturedImageSwipe();
}
