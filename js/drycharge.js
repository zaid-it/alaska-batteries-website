// 1. GLOBAL SCOPE
let currentBatteryId = null;
let compareFirstId = null;
let lastFiltered = [];

function normalizeUses(uses) {
  if (!uses) return [];
  if (Array.isArray(uses)) return uses.filter(Boolean);
  return String(uses)
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

function getUsesText(uses) {
  const list = normalizeUses(uses);
  return list.join(", ");
}

function formatDimensions(dimensions) {
  if (!dimensions) return "";
  if (typeof dimensions === "string") return dimensions.trim();

  const length = dimensions.l ?? dimensions.length;
  const width = dimensions.w ?? dimensions.width;
  const height = dimensions.h ?? dimensions.height;
  const unit = dimensions.unit ? ` ${dimensions.unit}` : "";

  if ([length, width, height].some((v) => v === undefined || v === null || v === "")) {
    return "";
  }

  return `${length} x ${width} x ${height}${unit}`;
}

function getBatterySearchText(battery) {
  const usesText = getUsesText(battery.uses);
  const dimensionsText = formatDimensions(battery.dimensions);
  const categoriesText = Array.isArray(battery.categories) ? battery.categories.join(" ") : "";

  return `${battery.model} ${battery.tech} ${battery.ah} ${battery.plates} ${categoriesText} ${usesText} ${dimensionsText}`.toLowerCase();
}

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
  if (stageWarranty) {
    const rawWarranty = battery.warranty;
    const normalized = String(rawWarranty ?? "")
      .trim()
      .toLowerCase();
    const noWarrantyValues = new Set(["", "0", "0 month", "0 months", "0 yr", "0 year", "0 years", "n/a", "na", "none", "no", "no warranty"]);
    const isZeroNumber = normalized !== "" && !Number.isNaN(Number(normalized)) && Number(normalized) === 0;
    const hasWarranty = !(noWarrantyValues.has(normalized) || isZeroNumber);
    stageWarranty.innerText = rawWarranty ?? "";

    const warrantyBlock = stageWarranty.parentElement;
    if (warrantyBlock) {
      warrantyBlock.style.display = hasWarranty ? "" : "none";
    }
  }

  if (stageUses) {
    const usesText = getUsesText(battery.uses);
    stageUses.innerText = usesText || "--";
  }

  // Display dimensions
  const stageDimensions = document.getElementById("stage-dimensions");
  if (stageDimensions) {
    if (battery.dimensions) {
      const dims = battery.dimensions;
      const length = dims.l || 0;
      const width = dims.w || 0;
      const height = dims.h || 0;
      const unit = dims.unit || "mm";
      stageDimensions.innerHTML = `<strong>Dimensions:</strong> ${length} x ${width} x ${height} ${unit}`;
    } else {
      stageDimensions.innerHTML = "";
    }
  }

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

  // --- AUTO-SELECT CATEGORY FROM URL HASH ---
  const hash = window.location.hash.substring(1);
  if (hash && ["Automotive", "Solar", "Industrial"].includes(hash)) {
    const targetBtn = document.querySelector(`.filter-btn[data-cat="${hash}"]`);
    if (targetBtn) {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      targetBtn.classList.add("active");
    }
  }

  // --- DETAILS BUTTON ---
  const detailsBtn = document.getElementById("stage-details-btn");
  if (detailsBtn) {
    detailsBtn.addEventListener("click", () => {
      alert("More details feature coming soon!");
    });
  }

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

  // Apply filters on page load (in case hash was set)
  applyFilters();

  // --- FIX: UPDATED APPLY FILTERS ---
  function applyFilters() {
    const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const activeCat = document.querySelector(".filter-btn.active")?.getAttribute("data-cat") || "All";

    const filtered = batteryData.filter((b) => {
      const searchStr = getBatterySearchText(b);
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
    const batteryGrid = document.getElementById("battery-grid");
    if (!batteryGrid) return;

    if (data.length === 0) {
      batteryGrid.innerHTML = `<div class="col-span-full text-gray-400 font-bold p-4 text-center">No batteries found.</div>`;
      return;
    }

    // Sort batteries by model number (ascending)
    const sortedData = [...data].sort((a, b) => {
      const numA = parseInt(a.model.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.model.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });

    // Render all filtered batteries in a grid
    batteryGrid.innerHTML = sortedData
      .map(
        (b) => `
            <div onclick="window.updateStage('${b.id}', true)" 
                 class="battery-card cursor-pointer border-2 border-gray-200 p-4 rounded-lg hover:border-[#cc001b] transition-all text-center">
                <img src="${b.image}" alt="${b.model}" class="h-40 w-auto object-contain mx-auto mb-3">
                <p class="text-sm font-black uppercase leading-tight">${b.model}</p>
                <p class="text-xs text-gray-500 mt-1">${b.ah} AH</p>
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

  // Close modal when clicking outside (on the backdrop)
  document.addEventListener("DOMContentLoaded", function () {
    const backdrop = document.getElementById("gallery-modal-backdrop");
    const modal = document.getElementById("gallery-modal");
    const modalContent = document.getElementById("gallery-modal-content");

    if (backdrop && modal && modalContent) {
      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) {
          window.closeGalleryModal();
        }
      });
    }
  });

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

    const matches = batteryData.filter((b) => getBatterySearchText(b).includes(term)).slice(0, 6);

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
  // Find the battery with the lowest numeric model number to display first
  const firstBySort = [...batteryData].sort((a, b) => {
    const numA = parseInt(a.model.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.model.match(/\d+/)?.[0] || 0);
    return numA - numB;
  })[0];
  if (firstBySort) {
    window.updateStage(firstBySort.id);
  }

  // --- BANNER CAROUSEL ---
  const heroImg = document.getElementById("hero-banner-img");
  const textBox = document.getElementById("hero-text-box");
  const subTitle = document.getElementById("hero-subtitle");
  const filterButtons = document.querySelectorAll(".filter-btn");

  const contentMap = {
    All: {
      img: "assets/solutions/solutions-hero.png",
      mobile_img: "assets/solutions/solutions-hero.png",
      title: 'Dry <span class="text-[#cc001b]">Charge</span>',
    },
    Automotive: {
      img: "assets/solutions/automotive.png",
      mobile_img: "assets/solutions/automotive.png",
      title: "Automotive",
    },
    Solar: {
      img: "assets/solutions/solar.png",
      mobile_img: "assets/solutions/solar.png",
      title: "Solar",
    },
    Industrial: {
      img: "assets/solutions/industrial.png",
      mobile_img: "assets/solutions/industrial.png",
      title: "Industrial",
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
    if (subTitle && data.sub) {
      subTitle.innerText = data.sub;
    }
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  function startAutoScroll() {
    const activeCat = document.querySelector(".filter-btn.active")?.getAttribute("data-cat") || "All";
    if (activeCat !== "All") {
      stopAutoScroll();
      return;
    }

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
        stopAutoScroll();
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

  const matches = batteryData.filter((b) => b.id !== compareFirstId && getBatterySearchText(b).includes(term));

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
    { l: "Uses", v: (b) => getUsesText(b.uses) },
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
                  .map((s) => {
                    const leftRaw = s.v ? s.v(b1) : b1[s.k];
                    const rightRaw = s.v ? s.v(b2) : b2[s.k];
                    const leftVal = leftRaw === undefined || leftRaw === null || leftRaw === "" ? "--" : `${leftRaw}${s.s || ""}`;
                    const rightVal = rightRaw === undefined || rightRaw === null || rightRaw === "" ? "--" : `${rightRaw}${s.s || ""}`;
                    return `
                    <div class="grid grid-cols-3 items-center py-2 border-b border-gray-50">
                        <span class="font-bold text-base md:text-2xl text-center">${leftVal}</span>
                        <span class="text-[100%] font-bold uppercase text-gray-600 text-center tracking-tighter">${s.l}</span>
                        <span class="font-bold text-base md:text-2xl text-center text-[#cc001b]">${rightVal}</span>
                    </div>`;
                  })
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
  const compareModal = document.getElementById("compare-modal");
  if (compareModal && compareModal.classList.contains("active") && e.target === compareModal.firstElementChild) {
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

// After everything is loaded, ensure hero reflects any incoming hash (e.g., from index links)
window.addEventListener("load", function () {
  const hash = window.location.hash ? window.location.hash.substring(1) : "";
  if (hash && contentMap[hash]) {
    // Activate corresponding filter button UI if present
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    const targetBtn = document.querySelector(`.filter-btn[data-cat="${hash}"]`);
    if (targetBtn) targetBtn.classList.add("active");

    // Update hero banner and apply filters
    try {
      updateHero(hash);
    } catch (e) {}
    try {
      applyFilters();
    } catch (e) {}
  } else {
    // start default auto-scroll
    try {
      startAutoScroll();
    } catch (e) {}
  }
});
