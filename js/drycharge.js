// 1. GLOBAL SCOPE: Define these FIRST so they are ready immediately
let currentBatteryId = null;
let compareFirstId = null;

// Define updateStage globally right away to prevent "is not a function" errors
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

  // Update tags with rounded corners
  const tagsContainer = document.getElementById("stage-tags");
  if (tagsContainer) {
    tagsContainer.innerHTML = battery.categories.map((tag) => `<span class="bg-gray-100 px-3 py-1 text-[10px] font-black uppercase rounded-md">${tag}</span>`).join("");
  }

  if (shouldScroll) {
    document.getElementById("top").scrollIntoView({ behavior: "smooth" });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("batterySearch");
  const thumbGrid = document.getElementById("thumb-grid");
  const clearBtn = document.getElementById("clearSearch");

  // --- SNAP-ACTION FILTERS (FIXED) ---
  function applyFilters() {
    const searchInput = document.getElementById("batterySearch");
    if (!searchInput) return;

    const term = searchInput.value.toLowerCase().trim();
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCat = activeBtn ? activeBtn.getAttribute("data-cat") : "All";

    const filtered = batteryData.filter((b) => {
      const searchableText = [b.model, b.tech, b.ah.toString(), b.plates.toString(), ...(b.categories || [])].join(" ").toLowerCase();

      return searchableText.includes(term) && (activeCat === "All" || b.categories.includes(activeCat));
    });

    renderThumbnails(filtered);
  }

  function renderThumbnails(data) {
    const thumbGrid = document.getElementById("thumb-grid");
    if (!thumbGrid) return;

    if (data.length === 0) {
      thumbGrid.innerHTML = `<p class="text-[100%] text-gray-400 w-full text-center py-10 uppercase font-black">No Models Found</p>`;
      return;
    }

    let html = "";
    for (let i = 0; i < data.length; i++) {
      const b = data[i];
      html += `
            <div onclick="window.updateStage('${b.id}', true)" 
                 class="thumb-card product-thumb cursor-pointer shrink-0 border-2 border-transparent p-2 rounded-md hover:border-gray-200 transition-colors">
                <img src="${b.image}" alt="${b.model}" class="h-20 w-auto object-contain pointer-events-none" loading="lazy">
                <p class="text-[100%] font-black uppercase mt-2 text-center">${b.model}</p>
            </div>`;
    }
    thumbGrid.innerHTML = html;

    // Auto-select the first item in the filtered list if nothing is selected or if the current one is gone
    if (data.length > 0) {
      const isCurrentStillVisible = data.find((b) => b.id === currentBatteryId);
      if (!isCurrentStillVisible) {
        window.updateStage(data[0].id);
      }
    }
  }

  // --- SEARCH & SUGGESTIONS LOGIC ---
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase().trim();

      // Show/Hide clear button
      clearBtn?.classList.toggle("hidden", term.length === 0);

      // Trigger Filter
      applyFilters();

      // Trigger Suggestions
      updateSuggestions(term);
    });
  }

  window.updateSuggestions = function (term) {
    const suggestionsBox = document.getElementById("search-suggestions");
    if (!suggestionsBox) return;

    if (term.length < 1) {
      suggestionsBox.classList.add("hidden");
      return;
    }

    // UPDATED: Search across Model, AH, and Plates
    const matches = batteryData
      .filter((b) => {
        const modelMatch = b.model.toLowerCase().includes(term);
        const ahMatch = b.ah.toString().toLowerCase().includes(term);
        const platesMatch = b.plates.toString().toLowerCase().includes(term);

        return modelMatch || ahMatch || platesMatch;
      })
      .slice(0, 6); // Showing top 6 results

    if (matches.length > 0) {
      suggestionsBox.innerHTML = matches
        .map(
          (m) => `
            <div onclick="selectSuggestion('${m.model}')" 
                 class="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center border-b border-gray-100 transition-colors">
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
    if (searchInput) {
      searchInput.value = name;
      const suggestionsBox = document.getElementById("search-suggestions");
      suggestionsBox?.classList.add("hidden");
      clearBtn?.classList.remove("hidden");
      applyFilters();
    }
  };
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".filter-btn.active")?.classList.remove("active");
      this.classList.add("active");
      applyFilters();
    });
  });

  const compareBtn = document.getElementById("stage-compare-btn");
  if (compareBtn) {
    compareBtn.onclick = () => {
      if (currentBatteryId) window.openCompareSelection(currentBatteryId);
    };
  }

  // Initial Render
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
            <h3 class="text-2xl font-black uppercase mb-6 tracking-tighter">Compare With...</h3>
            
            <div class="flex items-center gap-2 mb-6 bg-gray-50 p-2 rounded-md">
                <div class="bg-black text-white px-3 py-1 rounded-md text-[100%] font-black uppercase">${firstBattery.model}</div>
                <div class="text-gray-400 text-xs font-bold italic px-1 text-[100%]">VS</div>
                <div class="text-gray-400 text-[100%] font-black uppercase animate-pulse">Select Challenger...</div>
            </div>

            <div class="relative mb-4">
                <input type="text" id="modalSearch" oninput="filterModalList()" 
                       placeholder="Type model name..." autofocus
                       class="w-full bg-gray-100 border-none rounded-md py-4 pl-5 pr-12 outline-none font-bold text-sm uppercase focus:bg-white focus:ring-2 focus:ring-[#cc001b]">
            </div>

            <div id="modal-list-results" class="space-y-2 max-h-[40vh] overflow-y-auto pr-1"></div>
        </div>
    `;
  filterModalList();
};

window.filterModalList = function () {
  const searchInput = document.getElementById("modalSearch");
  const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const listArea = document.getElementById("modal-list-results");

  if (!listArea) return;

  // Filter logic: Exclude the first battery and match against Model, AH, and Plates
  const matches = batteryData.filter((b) => {
    const isNotFirst = b.id !== compareFirstId;

    // Convert numbers to strings safely for searching
    const modelStr = (b.model || "").toLowerCase();
    const ahStr = (b.ah || "").toString().toLowerCase();
    const platesStr = (b.plates || "").toString().toLowerCase();
    const techStr = (b.tech || "").toLowerCase();

    const matchesTerm = modelStr.includes(term) || ahStr.includes(term) || platesStr.includes(term) || techStr.includes(term);

    return isNotFirst && matchesTerm;
  });

  if (matches.length === 0) {
    listArea.innerHTML = `<p class="text-[100%] text-gray-400 text-center py-4 uppercase font-black">No matching batteries</p>`;
    return;
  }

  listArea.innerHTML = matches
    .map(
      (b) => `
        <div onclick="executeComparison('${b.id}')" 
             class="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-md cursor-pointer transition-all hover:border-[#cc001b] group">
            <div class="flex items-center gap-4">
                <img src="${b.image}" class="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all pointer-events-none">
                <div>
                    <p class="font-black text-[100%] uppercase leading-tight">${b.model}</p>
                    <p class="text-[85%] text-gray-400 font-bold uppercase">${b.plates} Plates</p>
                </div>
            </div>
            <div class="bg-gray-50 group-hover:bg-[#cc001b] group-hover:text-white px-3 py-1 rounded-md text-[100%] font-black transition-colors">
                ${b.ah} AH
            </div>
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

  document.getElementById("compare-render-area").innerHTML = /*html*/ `
        <div class="max-w-2xl mx-auto">
            <button onclick="openCompareSelection('${compareFirstId}')" class="mb-6 text-[100%] font-black uppercase text-gray-400 hover:text-[#cc001b] flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> Back to Search
            </button>
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="text-center p-4 bg-gray-50 rounded-md">
                    <img src="${b1.image}" class="h-24 mx-auto mb-2 object-contain">
                    <h4 class="text-[100%] font-black uppercase">${b1.model}</h4>
                </div>
                <div class="text-center p-4 bg-white border-2 border-[#cc001b] rounded-md">
                    <img src="${b2.image}" class="h-24 mx-auto mb-2 object-contain">
                    <h4 class="text-[100%] font-black uppercase">${b2.model}</h4>
                </div>
            </div>
            <div class="grid gap-2">
                ${specs
                  .map(
                    (s) => `
                    <div class="grid grid-cols-3 items-center py-3 border-b border-gray-50">
                        <span class="font-black text-xl text-center">${b1[s.k]}${s.s || ""}</span>
                        <span class="text-[100%] font-black uppercase text-gray-300 text-center tracking-tighter">${s.l}</span>
                        <span class="font-black text-xl text-center text-[#cc001b]">${b2[s.k]}${s.s || ""}</span>
                    </div>`
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

window.scrollCatalog = function (direction) {
  const grid = document.getElementById("thumb-grid");
  if (grid) {
    const scrollAmount = grid.clientWidth * 0.5;
    grid.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }
};
