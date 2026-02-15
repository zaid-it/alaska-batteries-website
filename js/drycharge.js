// 1. GLOBAL SCOPE
let currentBatteryId = null;
let compareFirstId = null;
let compareSelectingFirst = false;
let lastFiltered = [];

function normalizeUses(uses) {
  if (!uses) return [];
  if (Array.isArray(uses)) return uses.filter(Boolean);
  return String(uses)
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

// Format the stage title for mobile: force a break before 'Lead-Acid' when narrow
function formatStageTitle(text) {
  if (!text) return "";
  try {
    // Normalize variants like "Lead Acid", "Lead-Acid", "lead acid" etc.
    const regex = /\bLead[\s-]*Acid\b/i;
    if (window.innerWidth <= 640 && regex.test(text)) {
      // Replace first match with a standardized break + capitalization
      return text.replace(regex, function (match) {
        return "<br>Lead-Acid";
      });
    }
    // As a fallback on small screens, allow a soft break before "Battery" if present
    if (window.innerWidth <= 640 && /\bBattery\b/i.test(text) && !regex.test(text)) {
      return text.replace(/\bBattery\b/i, "<br>Battery");
    }
  } catch (e) {
    return text;
  }
  return text;
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
  const unitRaw = dimensions.unit || "";
  const unit = unitRaw ? ` ${unitRaw}` : "";
  const isInches = ["in", "inch", "inches"].includes(String(unitRaw).toLowerCase());

  if ([length, width, height].some((v) => v === undefined || v === null || v === "")) {
    return "";
  }

  const base = `L: ${length} x W: ${width} x H: ${height}`;
  if (isInches) {
    return base;
  }

  return `${base}${unit}`;
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

  if (stageName) stageName.innerHTML = formatStageTitle(battery.model);
  if (stageTech) stageTech.innerHTML = formatStageTitle(battery.tech);
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

  if (stageImage) stageImage.src = battery.image;

  if (tagsContainer) {
    tagsContainer.innerHTML = battery.categories.map((tag) => `<span class="bg-gray-100 px-3 py-1 text-[100%] font-black uppercase rounded-md">${tag}</span>`).join("");
  }

  // Populate details section with box size, dimensions, and weight
  const detailsContent = document.getElementById("stage-details");
  if (detailsContent) {
    const detailsLines = [];
    if (battery.boxSize) detailsLines.push(`<div><strong>Battery Box Size (Japanese Industrial Standard):</strong> ${battery.boxSize}</div>`);
    if (battery.dimensions) {
      const unitRaw = battery.dimensions.unit || "";
      const isInches = ["in", "inch", "inches"].includes(String(unitRaw).toLowerCase());
      if (isInches) {
        detailsLines.push(`<div><strong>Dimensions (inches):</strong> ${formatDimensions(battery.dimensions)}</div>`);
      } else {
        detailsLines.push(`<div><strong>Dimensions:</strong> ${formatDimensions(battery.dimensions)}</div>`);
      }
    }
    if (battery.weightKg !== undefined && battery.weightKg !== null) detailsLines.push(`<div><strong>Dry Weight:</strong> ${battery.weightKg} kg</div>`);

    detailsContent.innerHTML = detailsLines.length ? detailsLines.join("") : "<div>No details available</div>";

    // Reset button icon to plus
    const detailsBtn = document.getElementById("stage-details-btn");
    const detailsLabel = document.getElementById("stage-details-label");
    if (detailsBtn) {
      const icon = detailsBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
      }
    }
    if (detailsLabel) {
      detailsLabel.innerText = "More Details";
    }

    // Hide details initially
    detailsContent.classList.add("hidden");
  }

  if (shouldScroll) {
    const target = document.getElementById("details-anchor") || document.getElementById("product-stage") || document.getElementById("search-section");
    if (target) {
      const offset = 20; // small gap from top
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

  // --- DETAILS BUTTON - EXPAND/COLLAPSE ---
  const detailsBtn = document.getElementById("stage-details-btn");
  const detailsLabel = document.getElementById("stage-details-label");
  if (detailsBtn) {
    detailsBtn.addEventListener("click", () => {
      const detailsContent = document.getElementById("stage-details");
      const icon = detailsBtn.querySelector("i");

      if (detailsContent) {
        const isHidden = detailsContent.classList.contains("hidden");
        if (isHidden) {
          detailsContent.classList.remove("hidden");
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
          if (detailsLabel) detailsLabel.innerText = "Less Details";
        } else {
          detailsContent.classList.add("hidden");
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
          if (detailsLabel) detailsLabel.innerText = "More Details";
        }
      }
    });
  }
  if (detailsLabel && detailsBtn) {
    detailsLabel.addEventListener("click", () => detailsBtn.click());
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

    // Sort batteries by model number (ascending) BEFORE updating stage
    const sortedFiltered = [...filtered].sort((a, b) => {
      const numA = parseInt(a.model.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.model.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });

    lastFiltered = sortedFiltered;

    // Update the main stage with the first sorted battery
    if (sortedFiltered.length > 0) {
      window.updateStage(sortedFiltered[0].id, false);
    }

    renderThumbnails(sortedFiltered);
  }

  function renderThumbnails(data) {
    const batteryGrid = document.getElementById("battery-grid");
    if (!batteryGrid) return;

    if (data.length === 0) {
      batteryGrid.innerHTML = `<div class="col-span-full text-gray-400 font-bold p-4 text-center">No batteries found.</div>`;
      return;
    }

    // Data is already sorted when passed to this function
    const sortedData = data;

    // Render all filtered batteries in a grid
    batteryGrid.innerHTML = sortedData
      .map(
        (b) => `
            <div onclick="window.updateStage('${b.id}', true)" 
                 class="battery-card cursor-pointer border-2 border-gray-200 p-4 rounded-lg hover:border-[#c00d1e] transition-all text-center">
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
                    <span class="text-[100%] text-[#c00d1e] font-black">${m.ah} AH</span>
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
      title: 'Dry <span class="text-[#c00d1e]">Charge</span>',
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

      // Auto-scroll disabled
      // if (category === "All") {
      //   startAutoScroll();
      // } else {
      //   stopAutoScroll();
      // }
    });
  });

  // Start UI
  triggerAnimations();
  // Auto-scroll disabled - startAutoScroll();
});

// --- MODAL & COMPARISON LOGIC ---

window.openCompareSelection = function (firstId) {
  compareSelectingFirst = false;
  compareFirstId = firstId;
  const firstBattery = batteryData.find((b) => b.id === firstId);
  const modal = document.getElementById("compare-modal");

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    document.getElementById("compare-render-area").innerHTML = `
        <div class="max-w-5xl mx-auto">
          <h3 class="text-xl md:text-2xl font-black uppercase mb-6 tracking-tight text-black">Compare Batteries</h3>
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-50 border border-gray-200 rounded-md p-4">
              <p class="text-[11px] font-black uppercase text-black mb-2">Compare With</p>
              <div class="relative">
                <input type="text" id="modalSearchFirst" value="${firstBattery.model}" oninput="compareSelectingFirst = true; filterModalList();"
                  onfocus="compareSelectingFirst = true;" placeholder="Enter model name" autofocus
                  class="w-full bg-white border border-gray-200 rounded-md py-3 pl-4 pr-10 font-bold text-sm uppercase text-black focus:ring-2 focus:ring-[#c00d1e] outline-none" />
                <button type="button" onclick="clearCompareSearch('first')"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#c00d1e]">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <p class="text-[10px] text-black italic mt-2">Edit to change selected model</p>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-md p-4">
              <p class="text-[11px] font-black uppercase text-black mb-2">Compare With</p>
              <div class="relative">
                <input type="text" id="modalSearchSecond" oninput="compareSelectingFirst = false; filterModalList();" onfocus="compareSelectingFirst = false;"
                  placeholder="Enter model name to compare"
                  class="w-full bg-white border border-gray-200 rounded-md py-3 pl-4 pr-10 font-bold text-sm uppercase focus:ring-2 focus:ring-[#c00d1e] outline-none" />
                <button type="button" onclick="clearCompareSearch('second')"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#c00d1e]">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
              <p class="text-[10px] text-black italic mt-2">Please enter model name to compare</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="bg-white border border-gray-200 rounded-md p-6 text-center">
              <p class="text-sm font-black uppercase text-black mb-3">${firstBattery.model}</p>
              <img src="${firstBattery.image}" class="h-40 md:h-52 mx-auto object-contain" alt="${firstBattery.model}">
            </div>
            <div class="bg-white border border-gray-200 rounded-md p-6 text-center">
              <p class="text-sm font-black uppercase text-black mb-3">Select to compare</p>
              <div class="h-40 md:h-52 mx-auto border border-dashed border-gray-300 rounded-md flex items-center justify-center text-xs uppercase text-black">
                Waiting for selection
              </div>
            </div>
          </div>
          <div id="modal-list-results" class="space-y-2 max-h-[40vh] overflow-y-auto pr-1"></div>
        </div>
      `;
    filterModalList();
  }
};

window.filterModalList = function () {
  const inputId = compareSelectingFirst ? "modalSearchFirst" : "modalSearchSecond";
  const term = document.getElementById(inputId)?.value.toLowerCase().trim() || "";
  const listArea = document.getElementById("modal-list-results");
  if (!listArea) return;

  const matches = compareSelectingFirst
    ? batteryData.filter((b) => getBatterySearchText(b).includes(term))
    : batteryData.filter((b) => b.id !== compareFirstId && getBatterySearchText(b).includes(term));

  listArea.innerHTML = matches
    .map(
      (b) => `
        <div onclick="${compareSelectingFirst ? `selectFirstForCompare('${b.id}')` : `executeComparison('${b.id}')`}" class="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-md cursor-pointer hover:border-[#c00d1e] transition-all group">
            <div class="flex items-center gap-3">
                <img src="${b.image}" class="h-8 w-auto object-contain pointer-events-none">
                <div>
                    <p class="font-black text-[100%] uppercase leading-tight">${b.model}</p>
              <p class="text-[80%] text-black font-bold uppercase">${b.plates} Plates</p>
                </div>
            </div>
          <span class="text-[100%] font-black text-black group-hover:text-[#c00d1e]">${b.ah} AH</span>
        </div>
    `,
    )
    .join("");
};

window.clearCompareSearch = function (which) {
  const isFirst = which === "first";
  compareSelectingFirst = isFirst;
  const inputId = isFirst ? "modalSearchFirst" : "modalSearchSecond";
  const input = document.getElementById(inputId);
  if (input) {
    input.value = "";
    input.focus();
  }
  filterModalList();
};

window.selectFirstForCompare = function (firstId) {
  compareSelectingFirst = false;
  window.openCompareSelection(firstId);
};

window.executeComparison = function (secondId) {
  const b1 = batteryData.find((x) => x.id === compareFirstId);
  const b2 = batteryData.find((x) => x.id === secondId);

  // Helper function to format dimensions
  const formatDimensions = (b) => {
    if (b.dimensions) {
      const d = b.dimensions;
      return `${d.l} × ${d.w} × ${d.h} ${d.unit}`;
    }
    return "--";
  };

  // Helper function to format weight
  const formatWeight = (b) => {
    return b.weightKg ? `${b.weightKg} kg` : "--";
  };

  const specs = [
    { l: "Plates", k: "plates" },
    { l: "Voltage", k: "p", s: "V" },
    { l: "Ampere", k: "ah", s: " AH" },
    { l: "Warranty", k: "warranty" },
    { l: "Battery Box Size (Japanese Industrial Standard)", k: "boxSize" },
    { l: "Dimensions (L×W×H)", v: formatDimensions },
    { l: "Weight", v: formatWeight },
    { l: "Uses", v: (b) => getUsesText(b.uses) },
  ];

  document.getElementById("compare-render-area").innerHTML = `
      <div class="max-w-6xl mx-auto">
        <button onclick="openCompareSelection('${compareFirstId}')" class="mb-6 text-xs font-black uppercase text-black hover:text-[#c00d1e] flex items-center gap-2 transition-colors">
          <i class="fa-solid fa-arrow-left"></i> Change Selection
        </button>
        
        <h3 class="text-2xl font-black uppercase mb-2 text-center">Battery Comparison</h3>

        <!-- Two Column Layout: Battery Images -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;" class="battery-compare-grid">
          <!-- Battery 1 -->
          <div style="text-align: center; background: white;">
            <div style="display: flex; align-items: center; justify-content: center; height: 300px;">
              <img src="${b1.image}" class="object-contain" style="max-height: 100%; max-width: 100%;" alt="${b1.model}">
            </div>
          </div>

          <!-- Battery 2 -->
          <div style="text-align: center; background: white;">
            <div style="display: flex; align-items: center; justify-content: center; height: 300px;">
              <img src="${b2.image}" class="object-contain" style="max-height: 100%; max-width: 100%;" alt="${b2.model}">
            </div>
          </div>
        </div>

        <!-- Specs Table -->
        <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden; width:100%; margin:0;" class="battery-compare-specs">
          <!-- Header Row -->
          <div style="display: grid; grid-template-columns: 1fr 0.5fr 1fr; background-color: white; border-bottom: 2px solid #e5e7eb;" class="specs-grid specs-header">
            <div style="padding: 0.75rem; display:flex; align-items:center; justify-content:center;">
              <h4 class="text-lg font-bold uppercase text-[#c00d1e]">${b1.model}</h4>
            </div>
            <div style="padding: 0.75rem; display:flex; align-items:center; justify-content:center;">
              <p class="text-lg font-bold uppercase text-[#c00d1e]">Specs</p>
            </div>
            <div style="padding: 0.75rem; display:flex; align-items:center; justify-content:center;">
              <h4 class="text-lg font-bold uppercase text-[#c00d1e]">${b2.model}</h4>
            </div>
          </div>

          <!-- Specs Rows -->
          ${specs
            .map((s, i) => {
              const val1 = s.v ? s.v(b1) : b1[s.k];
              const val2 = s.v ? s.v(b2) : b2[s.k];
              const displayVal1 = val1 === undefined || val1 === null || val1 === "" ? "--" : `${val1}${s.s || ""}`;
              const displayVal2 = val2 === undefined || val2 === null || val2 === "" ? "--" : `${val2}${s.s || ""}`;
              const bgColor = i % 2 === 0 ? "white" : "#f3f4f6";
              const borderBottom = "1px solid #e5e7eb";
              return `
              <div style="display: grid; grid-template-columns: 1fr 0.5fr 1fr; background-color: ${bgColor}; border-bottom: ${borderBottom};" class="specs-grid">
                <div style="padding: 0.75rem; display:flex; align-items:center; justify-content:center;">
                  <span class="text-sm font-semibold text-black">${displayVal1}</span>
                </div>
                <div style="padding: 0.75rem; display:flex; align-items:center; justify-content:center;">
                  <span class="text-xs font-bold uppercase text-[#c00d1e]">${s.l}</span>
                </div>
                <div style="padding: 0.75rem; display:flex; align-items:center; justify-content:center;">
                  <span class="text-sm font-semibold text-black">${displayVal2}</span>
                </div>
              </div>`;
            })
            .join("")}
        </div>

        <!-- Compare modal divider/wrapping styles -->
        <style>
          /* Desktop: draw single vertical dividers using the first and third cell borders to avoid double lines */
          .battery-compare-specs .specs-grid > div { box-sizing: border-box; }
          .battery-compare-specs .specs-grid > div:nth-child(1) { border-right: 1px solid #e5e7eb; }
          .battery-compare-specs .specs-grid > div:nth-child(2) { border-left: none; border-right: none; }
          .battery-compare-specs .specs-grid > div:nth-child(3) { border-left: 1px solid #e5e7eb; }

          /* Ensure each row draws its bottom line consistently */
          .battery-compare-specs .specs-grid { border-bottom: 1px solid #e5e7eb; }

          /* Typography: allow wrapping and center alignment; use responsive sizing */
          .battery-compare-specs .specs-grid span,
          .battery-compare-specs .specs-grid p,
          .battery-compare-specs .specs-grid h4 {
            word-break: break-word;
            overflow-wrap: anywhere;
            white-space: normal;
            text-align: center;
            line-height: 1.2;
            font-size: 0.95rem;
          }

          /* Header slightly larger */
          .battery-compare-specs .specs-grid h4 { font-size: 1.05rem; }

          /* Mobile adjustments: remove per-cell vertical borders and give middle column more space so specs wrap nicely */
          @media (max-width: 768px) {
            .battery-compare-grid { grid-template-columns: 1fr 1fr !important; gap: 0.5rem !important; }
            /* Make middle column wider to allow long labels to wrap */
            .specs-grid { grid-template-columns: 0.8fr 1.6fr 0.8fr !important; }
            .battery-compare-specs .specs-grid > div { border-left: none !important; border-right: none !important; }
            /* Draw single thin divider around the middle column */
            .battery-compare-specs .specs-grid > div:nth-child(2) { border-left: 1px solid #e5e7eb !important; border-right: 1px solid #e5e7eb !important; }
            .battery-compare-specs .specs-grid { border-bottom: 1px solid #e5e7eb; }
            .battery-compare-specs { padding-left: 0.25rem; padding-right: 0.25rem; }

            /* Reduce font size slightly on very narrow screens */
            @media (max-width: 420px) {
              .battery-compare-specs .specs-grid span,
              .battery-compare-specs .specs-grid p,
              .battery-compare-specs .specs-grid h4 { font-size: 0.85rem; }
            }
          }
        </style>
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
    card.className = "group bg-white border border-gray-100 p-6 hover:shadow-2xl hover:border-[#c00d1e] transition-all duration-500 cursor-pointer flex flex-col items-center text-center";

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
