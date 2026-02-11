// ===== SCROLL ANIMATIONS =====
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach((el) => {
    observer.observe(el);
  });

  // Page transition animation
  document.body.classList.add("page-transition");
});

// ===== BATTERY FINDER MODAL =====
function openBatteryFinder() {
  const modal = document.createElement("div");
  modal.id = "batteryFinderModal";
  modal.className = "fixed inset-0 bg-black/80 z-[999] flex items-center justify-center p-4 animate-fadeIn";

  modal.innerHTML = `
    <div class="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-8 animate-slideUp">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-black uppercase tracking-tighter">Find Your Perfect <span class="text-[#cc001b]">Battery</span></h2>
        <button onclick="closeBatteryFinder()" class="text-gray-400 hover:text-black text-2xl">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-black uppercase mb-3 text-gray-700">What's Your Primary Use?</label>
          <div class="space-y-3">
            <button onclick="selectUse('automotive')" class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left flex items-start gap-4">
              <i class="fa-solid fa-car text-[#cc001b] text-2xl flex-shrink-0 mt-1"></i>
              <div>
                <p class="font-bold uppercase text-lg">Automotive</p>
                <p class="text-base text-gray-500">Cars, Bikes, Trucks</p>
              </div>
            </button>
            <button onclick="selectUse('solar')" class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left flex items-start gap-4">
              <i class="fa-solid fa-sun text-[#cc001b] text-2xl flex-shrink-0 mt-1"></i>
              <div>
                <p class="font-bold uppercase text-lg">Solar</p>
                <p class="text-base text-gray-500">Renewable Energy</p>
              </div>
            </button>
            <button onclick="selectUse('industrial')" class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left flex items-start gap-4">
              <i class="fa-solid fa-industry text-[#cc001b] text-2xl flex-shrink-0 mt-1"></i>
              <div>
                <p class="font-bold uppercase text-lg">Industrial</p>
                <p class="text-base text-gray-500">UPS, Backup Systems</p>
              </div>
            </button>
            
          </div>
        </div>

        <div class="pt-6 border-t border-gray-200">
          
          <div class="flex gap-4">
            <button onclick="closeBatteryFinder()" class="flex-1 px-6 py-3 border-2 border-gray-200 font-bold uppercase text-sm rounded-lg hover:border-[#cc001b] transition-all">Cancel</button>
            <a href="dry-charge.html" class="flex-1 px-6 py-3 bg-[#cc001b] text-white font-bold uppercase text-sm rounded-lg hover:bg-black transition-all text-center">View All Batteries</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeBatteryFinder();
  });
}

function selectUse(type) {
  const typeMap = {
    automotive: "dry-charge.html#Automotive",
    solar: "dry-charge.html#Solar",
    industrial: "dry-charge.html#Industrial",
    other: "dry-charge.html",
  };
  window.location.href = typeMap[type];
}

function closeBatteryFinder() {
  const modal = document.getElementById("batteryFinderModal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "auto";
  }
}

// ===== Responsive Banner Images (desktop/mobile) =====
(function () {
  const MOBILE_BREAKPOINT = 640; // px — change if you prefer a different cutoff

  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  function updateBanners() {
    document.querySelectorAll("img[data-mobile]").forEach((img) => {
      // store original as data-desktop if not present
      //if (!img.dataset.desktop) img.dataset.desktop = img.getAttribute("src") || "";

      const mobileSrc = img.dataset.mobile;
      const desktopSrc = img.dataset.desktop;
      const useMobile = window.innerWidth <= MOBILE_BREAKPOINT;

      const desired = useMobile ? mobileSrc : desktopSrc;
      if (desired && img.src.indexOf(desired) === -1) {
        img.src = desired;
      }
    });
  }

  const debouncedUpdate = debounce(updateBanners, 120);
  window.addEventListener("resize", debouncedUpdate);
  window.addEventListener("orientationchange", debouncedUpdate);
  // Run once after DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateBanners);
  } else {
    updateBanners();
  }
})();
