// 1. GLOBAL SCOPE
let currentBatteryId = null;
let compareFirstId = null;
let lastFiltered = [];

// Define updateStage globally so it's ready before DOMContentLoaded triggers
window.updateStage = function (id, shouldScroll = false) {
  currentBatteryId = id;
  const battery = batteryData.find((b) => b.id === id);
  if (!battery) return;

  // UI Updates
  const stageName = document.getElementById("stage-name");
  const stageTech = document.getElementById("stage-tech");
  const stagePlates = document.getElementById("stage-plates");
  const stagePower = document.getElementById("stage-power");
  const stageAh = document.getElementById("stage-ah");
  const stageWarranty = document.getElementById("stage-warranty");
  const stageUses = document.getElementById("stage-uses");
  const stageImage = document.getElementById("stage-image");
  const tagsContainer = document.getElementById("stage-tags");

  if (stageName) stageName.innerText = battery.model;
  if (stageTech) stageTech.innerText = battery.tech;
  if (stagePlates) stagePlates.innerText = battery.plates;
  if (stagePower) stagePower.innerText = battery.p + "V";
  if (stageAh) stageAh.innerText = battery.ah + " AH";
  if (stageWarranty) stageWarranty.innerText = battery.warranty;
  if (stageUses) stageUses.innerText = battery.uses;
  if (stageImage) stageImage.src = battery.image;

  if (tagsContainer) {
    tagsContainer.innerHTML = battery.categories.map((tag) => `<span class="bg-gray-100 px-3 py-1 text-[100%] font-black uppercase rounded-md">${tag}</span>`).join("");
  }

  if (shouldScroll) {
    const topElement = document.getElementById("top");
    if (topElement) topElement.scrollIntoView({ behavior: "smooth" });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("batterySearch");
  const clearBtn = document.getElementById("clearSearch");
  const suggestionsBox = document.getElementById("search-suggestions");
  const thumbGrid = document.getElementById("thumb-grid");

  // --- 2. DRAG TO SCROLL LOGIC (Fixed) ---
  if (thumbGrid) {
    let isDown = false;
    let startX;
    let scrollLeft;

    thumbGrid.addEventListener("mousedown", (e) => {
      isDown = true;
      thumbGrid.classList.add("active");
      startX = e.pageX - thumbGrid.offsetLeft;
      scrollLeft = thumbGrid.scrollLeft;
    });

    thumbGrid.addEventListener("mouseleave", () => {
      isDown = false;
      thumbGrid.classList.remove("active");
    });

    thumbGrid.addEventListener("mouseup", () => {
      isDown = false;
      thumbGrid.classList.remove("active");
    });

    thumbGrid.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - thumbGrid.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast speed
      thumbGrid.scrollLeft = scrollLeft - walk;
    });
  }

  // --- SEARCH & CLEAR LOGIC ---
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase().trim();
      if (clearBtn) clearBtn.classList.toggle("hidden", term.length === 0);
      applyFilters();
      updateSuggestions(term);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      searchInput.value = "";
      clearBtn.classList.add("hidden");
      if (suggestionsBox) suggestionsBox.classList.add("hidden");
      applyFilters();
      searchInput.focus();
    });
  }

  // --- CATEGORY FILTERING ---
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      this.classList.add("active");
      applyFilters();
    });
  });

  // --- FIX: UPDATED APPLY FILTERS ---
  function applyFilters() {
    const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const activeCat = document.querySelector(".filter-btn.active")?.getAttribute("data-cat") || "All";

    const filtered = batteryData.filter((b) => {
      const searchStr = `${b.model} ${b.tech} ${b.ah} ${b.plates} ${b.categories.join(" ")}`.toLowerCase();
      const matchesSearch = searchStr.includes(term);
      const matchesCat = activeCat === "All" || b.categories.includes(activeCat);
      return matchesSearch && matchesCat;
    });

    lastFiltered = filtered;
    renderThumbnails(filtered);

    // FIX: Update the main stage if filtered results exist
    if (filtered.length > 0) {
      window.updateStage(filtered[0].id, false);
    }
  }

  function renderThumbnails(data) {
    if (!thumbGrid) return;

    if (data.length === 0) {
      thumbGrid.innerHTML = `<div class="text-gray-400 font-bold p-4 w-full text-center">No batteries found.</div>`;
      return;
    }

    // Show a compact preview row (first 8 items) in the thumb area
    const preview = data.slice(0, 8);
    thumbGrid.innerHTML = preview
      .map(
        (b) => `
            <div onclick="window.updateStage('${b.id}', true)" 
                 class="thumb-card product-thumb cursor-pointer shrink-0 border-2 border-transparent p-2 rounded-md hover:border-gray-200 transition-colors select-none">
                <img src="${b.image}" alt="${b.model}" class="h-20 w-auto object-contain pointer-events-none">
                <p class="text-[100%] font-black uppercase mt-2 text-center">${b.model}</p>
            </div>`,
      )
      .join("");
  }

  // Gallery modal functions
  window.openGalleryModal = function (data) {
    const modal = document.getElementById("gallery-modal");
    const grid = document.getElementById("gallery-grid");
    if (!modal || !grid) return;
    const list = Array.isArray(data) ? data : lastFiltered.length ? lastFiltered : batteryData;
    renderGalleryGrid(list);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.closeGalleryModal = function () {
    const modal = document.getElementById("gallery-modal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  function renderGalleryGrid(list) {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;
    if (!list || list.length === 0) {
      grid.innerHTML = `<div class="text-gray-400 p-4">No results.</div>`;
      return;
    }

    grid.innerHTML = list
      .map(
        (b) => `
          <div onclick="(function(){window.updateStage('${b.id}', true); window.closeGalleryModal();})()" class="bg-white border border-gray-100 p-4 rounded-md cursor-pointer hover:shadow-lg transition-all">
            <div class="h-40 flex items-center justify-center mb-3">
              <img src="${b.image}" class="h-full w-auto object-contain pointer-events-none" />
            </div>
            <h4 class="font-black uppercase text-[90%] text-center">${b.model}</h4>
            <p class="text-[80%] text-gray-400 text-center mt-1">${b.plates} Plates | ${b.ah} AH</p>
          </div>`,
      )
      .join("");
  }

  // Wire the View All button if present
  const viewAllBtn = document.getElementById("view-all-btn");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => openGalleryModal(lastFiltered.length ? lastFiltered : batteryData));
  }

  // --- SUGGESTIONS LOGIC ---
  window.updateSuggestions = function (term) {
    if (!suggestionsBox) return;
    if (term.length < 1) {
      suggestionsBox.classList.add("hidden");
      return;
    }

    const matches = batteryData.filter((b) => b.model.toLowerCase().includes(term) || b.ah.toString().includes(term) || b.plates.toString().includes(term)).slice(0, 6);

    if (matches.length > 0) {
      suggestionsBox.innerHTML = matches
        .map(
          (m) => `
                <div onclick="selectSuggestion('${m.model}')" class="p-4 hover:bg-gray-50 cursor-pointer flex justify-between border-b border-gray-100">
                    <div class="flex flex-col">
                        <span class="font-black text-[100%] uppercase">${m.model}</span>
                        <span class="text-[80%] text-gray-400 font-bold uppercase">${m.plates} Plates</span>
                    </div>
                    <span class="text-[100%] text-[#cc001b] font-black">${m.ah} AH</span>
                </div>`,
        )
        .join("");
      suggestionsBox.classList.remove("hidden");
    } else {
      suggestionsBox.classList.add("hidden");
    }
  };

  window.selectSuggestion = function (name) {
    const searchInput = document.getElementById("batterySearch");
    const suggestionsBox = document.getElementById("search-suggestions");
    const clearBtn = document.getElementById("clearSearch");

    if (searchInput) searchInput.value = name;
    if (suggestionsBox) suggestionsBox.classList.add("hidden");
    if (clearBtn) clearBtn.classList.remove("hidden");

    const selectedBattery = batteryData.find((b) => b.model === name);

    if (selectedBattery) {
      window.updateStage(selectedBattery.id, true);
    }
    applyFilters();
  };

  // Setup Stage Compare Button
  const stageBtn = document.getElementById("stage-compare-btn");
  if (stageBtn) {
    stageBtn.onclick = () => {
      if (currentBatteryId) window.openCompareSelection(currentBatteryId);
    };
  }

  // Initial Render
  renderThumbnails(batteryData);
  if (batteryData.length > 0 && !currentBatteryId) {
    window.updateStage(batteryData[0].id);
  }

  // --- BANNER CAROUSEL ---
  const heroImg = document.getElementById("hero-banner-img");
  const textBox = document.getElementById("hero-text-box");
  const subTitle = document.getElementById("hero-subtitle");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const contentMap = {
    All: {
      img: "assets/solutions/solutions-hero.png",
      mobile_img: "assets/solutions/mobile/solutions-hero-mobile.png",
      title: 'Dry <span class="text-[#cc001b]">Charge</span>',
      sub: "Pakistan's only Graphite Enhanced Lead-Acid Battery.",
    },
    Automotive: {
      img: "assets/solutions/automotive.png",
      mobile_img: "assets/solutions/mobile/automotive-mobile.png",
      title: "Automotive",
      sub: "Reliable Power for Every Journey.",
    },
    Solar: {
      img: "assets/solutions/solar.png",
      mobile_img: "assets/solutions/mobile/solar-mobile.png",
      title: "Solar",
      sub: "Sustainable Energy You can rely on.",
    },
    Industrial: {
      img: "assets/solutions/industrial.png",
      mobile_img: "assets/solutions/mobile/industrial-mobile.png",
      title: "Industrial",
      sub: "Built for Heavy Duty Performance.",
    },
  };

  let autoScrollInterval;
  let categories = Object.keys(contentMap);
  let currentIndex = 0;

  function triggerAnimations() {
    // Animation removed - keeping simple and clean
  }

  function updateHero(cat) {
    const data = contentMap[cat];
    // Choose image based on viewport width (640px breakpoint matches animations.js)
    const isMobile = window.innerWidth <= 640;
    const imageSrc = isMobile && data.mobile_img ? data.mobile_img : data.img;
    heroImg.src = imageSrc;
    document.getElementById("hero-title").innerHTML = data.title;
    subTitle.innerText = data.sub;
  }

  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % categories.length;
      updateHero(categories[currentIndex]);
    }, 3500);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-cat");
      updateHero(category);

      // Auto-scroll logic: only for "All"
      if (category === "All") {
        startAutoScroll();
      } else {
        clearInterval(autoScrollInterval);
      }
    });
  });

  // Start UI
  triggerAnimations();
  startAutoScroll();
});

// --- MODAL & COMPARISON LOGIC ---

window.openCompareSelection = function (firstId) {
  compareFirstId = firstId;
  const firstBattery = batteryData.find((b) => b.id === firstId);
  const modal = document.getElementById("compare-modal");

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    document.getElementById("compare-render-area").innerHTML = `
            <div class="max-w-xl mx-auto">
                <h3 class="text-lg font-bold uppercase mb-6 tracking-tighter text-black">Compare With...</h3>
                <div class="flex items-center gap-2 mb-6 bg-gray-50 p-2 rounded-md">
                    <div class="bg-[#cc001b] text-white px-3 py-1 rounded-md text-[100%] font-black uppercase">${firstBattery.model}</div>
                    <div class="text-gray-400 text-xs font-bold italic px-1">VS</div>
                    <div class="text-gray-400 text-[100%] font-black animate-pulse">Select Second Battery</div>
                </div>
                <div class="relative mb-4">
                    <input type="text" id="modalSearch" oninput="filterModalList()" placeholder="Search Plates, AH or Model..." autofocus
                           class="w-full bg-gray-100 border-none rounded-md py-4 pl-5 pr-12 outline-none font-bold text-sm uppercase focus:bg-white focus:ring-2 focus:ring-[#cc001b]">
                </div>
                <div id="modal-list-results" class="space-y-2 max-h-[40vh] overflow-y-auto pr-1"></div>
            </div>
        `;
    filterModalList();
  }
};

window.filterModalList = function () {
  const term = document.getElementById("modalSearch")?.value.toLowerCase().trim() || "";
  const listArea = document.getElementById("modal-list-results");
  if (!listArea) return;

  const matches = batteryData.filter((b) => b.id !== compareFirstId && (b.model.toLowerCase().includes(term) || b.ah.toString().includes(term) || b.plates.toString().includes(term)));

  listArea.innerHTML = matches
    .map(
      (b) => `
        <div onclick="executeComparison('${b.id}')" class="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-[#cc001b] transition-all group">
            <div class="flex items-center gap-3">
                <img src="${b.image}" class="h-8 w-auto object-contain pointer-events-none">
                <div>
                    <p class="font-black text-[100%] uppercase leading-tight">${b.model}</p>
                    <p class="text-[80%] text-gray-400 font-bold uppercase">${b.plates} Plates</p>
                </div>
            </div>
            <span class="text-[100%] font-black text-gray-400 group-hover:text-[#cc001b]">${b.ah} AH</span>
        </div>
    `,
    )
    .join("");
};

window.executeComparison = function (secondId) {
  const b1 = batteryData.find((x) => x.id === compareFirstId);
  const b2 = batteryData.find((x) => x.id === secondId);
  const specs = [
    { l: "Plates", k: "plates" },
    { l: "Voltage", k: "p", s: "V" },
    { l: "Ampere", k: "ah", s: " AH" },
    { l: "Warranty", k: "warranty" },
  ];

  document.getElementById("compare-render-area").innerHTML = `
        <div class="max-w-2xl mx-auto">
            <button onclick="openCompareSelection('${compareFirstId}')" class="mb-6 text-[100%] font-normal uppercase text-gray-400 hover:text-[#cc001b] flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> Change
            </button>
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="text-center p-4 bg-white rounded-md border border-gray-100">
                    <img src="${b1.image}" class="h-30 mx-auto mb-2 object-contain">
                    <h4 class="text-[100%] font-bold uppercase">${b1.model}</h4>
                </div>
                <div class="text-center p-4 bg-white border-2 border-[#cc001b] rounded-md shadow-lg">
                    <img src="${b2.image}" class="h-30 mx-auto mb-2 object-contain">
                    <h4 class="text-[100%] font-bold uppercase">${b2.model}</h4>
                </div>
            </div>
            <div class="grid gap-1">
                ${specs
                  .map(
                    (s) => `
                    <div class="grid grid-cols-3 items-center py-2 border-b border-gray-50">
                        <span class="font-bold text-2xl text-center">${b1[s.k]}${s.s || ""}</span>
                        <span class="text-[100%] font-bold uppercase text-gray-600 text-center tracking-tighter">${s.l}</span>
                        <span class="font-bold text-2xl text-center text-[#cc001b]">${b2[s.k]}${s.s || ""}</span>
                    </div>`,
                  )
                  .join("")}
            </div>
        </div>
    `;
};

window.closeCompareModal = () => {
  const modal = document.getElementById("compare-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "auto";
};

// FIX: CLICK OUTSIDE MODAL TO CLOSE
window.addEventListener("click", (e) => {
  const modal = document.getElementById("compare-modal");
  if (modal && modal.classList.contains("active") && e.target === modal.firstElementChild) {
    window.closeCompareModal();
  }
});

window.scrollCatalog = function (direction) {
  const grid = document.getElementById("thumb-grid");
  if (grid) {
    const scrollAmount = grid.clientWidth * 0.5;
    grid.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }
};
// Function to render the catalog grid
function renderGrid(products) {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "group bg-white border border-gray-100 p-6 hover:shadow-2xl hover:border-[#cc001b] transition-all duration-500 cursor-pointer flex flex-col items-center text-center";

    card.onclick = () => {
      updateStage(product);
      document.getElementById("details-anchor").scrollIntoView({ behavior: "smooth" });
    };

    card.innerHTML = `
            <div class="h-40 w-full mb-6 overflow-hidden">
                <img src="${product.image}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
            </div>
            <h4 class="text-xl font-black uppercase tracking-tighter">${product.model}</h4>
            <p class="text-[10px] font-bold text-gray-400 uppercase mt-2">${product.plates} Plates | ${product.ah} Ah</p>
        `;
    grid.appendChild(card);
  });
}

// THE INITIALIZER
function initDryCharge() {
  // 1. Use 'batteryData' (matching your data.js)
  if (typeof batteryData !== "undefined") {
    // 2. Since your data doesn't have a "series" field yet,
    // let's show all batteries for now to get the grid working.
    const dryChargeModels = batteryData;

    renderGrid(dryChargeModels);

    // 3. Update the Stage with the first battery
    if (dryChargeModels.length > 0) {
      updateStage(dryChargeModels[0]);
    }

    console.log("Grid initialized with", dryChargeModels.length, "models.");
  } else {
    console.error("batteryData is missing from data.js");
  }
}
// Run after a short delay to allow component injection
window.addEventListener("load", () => {
  // Run after a short delay to allow component injection
  window.addEventListener("load", () => {
    setTimeout(initDryCharge, 300);
  });
});
