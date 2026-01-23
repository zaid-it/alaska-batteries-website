// 1. GLOBAL SCOPE
let currentBatteryId = null;
let compareFirstId = null;

// Define updateStage globally so it's ready before DOMContentLoaded triggers
window.updateStage = function (id, shouldScroll = false) {
  currentBatteryId = id;
  const battery = batteryData.find((b) => b.id === id);
  if (!battery) return;

  // UI Updates
  document.getElementById("stage-name").innerText = battery.model;
  document.getElementById("stage-tech").innerText = battery.tech;
  document.getElementById("stage-plates").innerText = battery.plates;
  document.getElementById("stage-power").innerText = battery.p + "V";
  document.getElementById("stage-ah").innerText = battery.ah + " AH";
  document.getElementById("stage-warranty").innerText = battery.warranty;
  document.getElementById("stage-uses").innerText = battery.uses;
  document.getElementById("stage-image").src = battery.image;

  const tagsContainer = document.getElementById("stage-tags");
  if (tagsContainer) {
    tagsContainer.innerHTML = battery.categories.map((tag) => `<span class="bg-gray-100 px-3 py-1 text-[100%] font-black uppercase rounded-md">${tag}</span>`).join("");
  }

  if (shouldScroll) {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("batterySearch");
  const clearBtn = document.getElementById("clearSearch");
  const suggestionsBox = document.getElementById("search-suggestions");
  const thumbGrid = document.getElementById("thumb-grid");

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

  function applyFilters() {
    const term = searchInput.value.toLowerCase().trim();
    const activeCat = document.querySelector(".filter-btn.active")?.getAttribute("data-cat") || "All";

    const filtered = batteryData.filter((b) => {
      const searchStr = `${b.model} ${b.tech} ${b.ah} ${b.plates} ${b.categories.join(" ")}`.toLowerCase();
      const matchesSearch = searchStr.includes(term);
      const matchesCat = activeCat === "All" || b.categories.includes(activeCat);
      return matchesSearch && matchesCat;
    });

    renderThumbnails(filtered);
  }

  function renderThumbnails(data) {
    if (!thumbGrid) return;
    thumbGrid.innerHTML = data
      .map(
        (b) => `
            <div onclick="window.updateStage('${b.id}', true)" class="thumb-card product-thumb cursor-pointer shrink-0 border-2 border-transparent p-2 rounded-md hover:border-gray-200 transition-colors">
                <img src="${b.image}" alt="${b.model}" class="h-20 w-auto object-contain pointer-events-none">
                <p class="text-[100%] font-black uppercase mt-2 text-center">${b.model}</p>
            </div>`
      )
      .join("");

    if (data.length > 0 && !currentBatteryId) window.updateStage(data[0].id);
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
                </div>`
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

    // 1. Update the input text
    searchInput.value = name;

    // 2. Hide suggestions
    if (suggestionsBox) suggestionsBox.classList.add("hidden");
    if (clearBtn) clearBtn.classList.remove("hidden");

    // 3. Find the battery object that matches this name
    const selectedBattery = batteryData.find((b) => b.model === name);

    // 4. Update the Stage and Filter the grid
    if (selectedBattery) {
      window.updateStage(selectedBattery.id, true); // Update the big display
    }

    // 5. Run the filter so the grid matches the selection
    applyFilters();
  };

  // Setup Stage Compare Button
  const stageBtn = document.getElementById("stage-compare-btn");
  if (stageBtn) {
    stageBtn.onclick = () => {
      if (currentBatteryId) window.openCompareSelection(currentBatteryId);
    };
  }

  renderThumbnails(batteryData);
});

// --- MODAL & COMPARISON LOGIC ---

window.openCompareSelection = function (firstId) {
  compareFirstId = firstId;
  const firstBattery = batteryData.find((b) => b.id === firstId);
  const modal = document.getElementById("compare-modal");

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
};

window.filterModalList = function () {
  const term = document.getElementById("modalSearch")?.value.toLowerCase().trim() || "";
  const listArea = document.getElementById("modal-list-results");

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
    `
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
                    <img src="${b1.image}" class="h-24 mx-auto mb-2 object-contain">
                    <h4 class="text-[100%] font-bold uppercase">${b1.model}</h4>
                </div>
                <div class="text-center p-4 bg-white border-2 border-[#cc001b] rounded-md shadow-lg">
                    <img src="${b2.image}" class="h-24 mx-auto mb-2 object-contain">
                    <h4 class="text-[100%] font-bold uppercase">${b2.model}</h4>
                </div>
            </div>
            <div class="grid gap-1">
                ${specs
                  .map(
                    (s) => `
                    <div class="grid grid-cols-3 items-center py-4 border-b border-gray-50">
                        <span class="font-bold text-2xl text-center">${b1[s.k]}${s.s || ""}</span>
                        <span class="text-[100%] font-bold uppercase text-gray-600 text-center tracking-tighter">${s.l}</span>
                        <span class="font-bold text-2xl text-center text-[#cc001b]">${b2[s.k]}${s.s || ""}</span>
                    </div>`
                  )
                  .join("")}
            </div>
        </div>
    `;
};

window.closeCompareModal = () => {
  document.getElementById("compare-modal").classList.remove("active");
  document.body.style.overflow = "auto";
};

// --- FIX: CLICK OUTSIDE MODAL TO CLOSE ---
window.addEventListener("click", (e) => {
  const modal = document.getElementById("compare-modal");
  const modalContent = document.getElementById("compare-modal-content");
  // If the modal is active and the user clicks the black overlay (not the white box)
  if (modal.classList.contains("active") && e.target === modal.firstElementChild) {
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
