// ===== BACK TO TOP BUTTON =====
document.addEventListener("DOMContentLoaded", function () {
  // Create back to top button if it doesn't exist
  if (!document.getElementById("backToTop")) {
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.setAttribute("aria-label", "Back to top");
    document.body.appendChild(backToTopBtn);
  }

  const backToTopBtn = document.getElementById("backToTop");

  // Show button on scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top smoothly
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ===== SCROLL ANIMATIONS =====
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button onclick="selectUse('automotive')" class="p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left group">
              <i class="fa-solid fa-car text-[#cc001b] text-xl mb-2"></i>
              <p class="font-bold uppercase text-sm">Automotive</p>
              <p class="text-xs text-gray-500">Cars, Bikes, Trucks</p>
            </button>
            <button onclick="selectUse('solar')" class="p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left">
              <i class="fa-solid fa-sun text-[#cc001b] text-xl mb-2"></i>
              <p class="font-bold uppercase text-sm">Solar</p>
              <p class="text-xs text-gray-500">Renewable Energy</p>
            </button>
            <button onclick="selectUse('industrial')" class="p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left">
              <i class="fa-solid fa-industry text-[#cc001b] text-xl mb-2"></i>
              <p class="font-bold uppercase text-sm">Industrial</p>
              <p class="text-xs text-gray-500">UPS, Backup Systems</p>
            </button>
            <button onclick="selectUse('other')" class="p-4 border-2 border-gray-200 rounded-lg hover:border-[#cc001b] hover:bg-red-50 transition-all text-left">
              <i class="fa-solid fa-circle-question text-[#cc001b] text-xl mb-2"></i>
              <p class="font-bold uppercase text-sm">Not Sure</p>
              <p class="text-xs text-gray-500">Need Guidance</p>
            </button>
          </div>
        </div>

        <div class="pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 mb-4">
            <i class="fa-solid fa-lightbulb text-[#cc001b] mr-2"></i>
            Based on your selection, our experts will recommend the perfect battery for your needs.
          </p>
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
