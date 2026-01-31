// js/components.js

const brandRed = "#cc001b";

const headerHTML = /* HTML */ `
  <header class="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-100">
    <div class="container mx-auto px-6">
      <div class="flex items-center h-20">
        <div class="w-1/4">
          <a href="index.html">
            <img src="assets/logo.png" alt="Alaska Logo" class="h-14 md:h-16 w-auto object-contain" />
          </a>
        </div>

        <nav class="hidden lg:block w-3/4 h-full">
          <ul class="flex h-full items-center justify-end">
            <li class="nav-item">
              <a href="dry-charge.html" class="nav-link">Solutions</a>
              <div class="dropdown-panel">
                <a href="dry-charge.html" class="dropdown-item">Dry Charge</a>
            <li class="nav-item">
              <a href="graphite.html" class="nav-link">Technology</a>
              <div class="dropdown-panel">
                <a href="graphite.html" class="dropdown-item">Graphite Tech</a>
              </div>
            </li>

            <li class="nav-item">
              <a href="dealers.html" class="nav-link">Dealer</a>
              <div class="dropdown-panel">
                <a href="dealers.html" class="dropdown-item">Find a Dealer</a>
                <a href="become-dealer.html" class="dropdown-item">Apply to be a Dealer</a>
              </div>
            </li>

            <li class="nav-item">
              <a href="vault.html" class="nav-link">Vault</a>
              <div class="dropdown-panel">
                <a href="vault.html#blogs" class="dropdown-item">Blog</a>
                <a href="vault.html#faqs" class="dropdown-item">FAQ</a>
                <a href="vault.html#gallery" class="dropdown-item">Gallery</a>
              </div>
            </li>

            

            <li class="nav-item">
              <a href="about.html" class="nav-link">About Us</a>
            </li>

            <li class="nav-item">
              <a href="support.html" class="nav-link">Support</a>
            </li>
          </ul>
        </nav>

        <div class="lg:hidden w-3/4 flex justify-end">
          <button id="mobile-menu-trigger" class="text-[#cc001b] text-3xl">
            <i class="fa-solid fa-car-battery"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
  <div class="h-20"></div>
`;

const footerHTML = /* HTML */ `
  <footer class="bg-gray-50 border-t-8 border-black-50 pt-8 pb-2">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
        <div class="flex flex-col justify-center items-center">
          <div class="w-full max-w-[500px]">
            <div class="text-gray-500 text-m leading-relaxed">
              <p class="mb-2">7th Floor, B-3 Tower, Opp. F-9 Park, Sector F-9/G-9, Jinnah Avenue, New Blue Area, Islamabad, Pakistan, 44010</p>
              <p class="mb-2">
                <a href="tel:0518740280" class="text-gray-900 text-sm font-bold hover:text-[#cc001b] transition-colors"> (051) 8740 280 </a>
              </p>
              <p>
                <a href="mailto:info@alaskabatteries.com" class="text-[#cc001b] text-sm font-medium hover:underline"> info@alaskabatteries.com </a>
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-center items-center">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-18 md:gap-x-28 gap-y-2 md:gap-y-0 text-m font-bold text-gray-600">
            <ul class="flex flex-col space-y-1">
              <li>
                <a href="index.html" class="hover:text-[#cc001b] transition-colors">Home</a>
              </li>
              <li>
                <a href="dry-charge.html" class="hover:text-[#cc001b] transition-colors">Solutions</a>
              </li>
              <li>
                <a href="graphite.html" class="hover:text-[#cc001b] transition-colors">Technology</a>
              </li>
              <li>
                <a href="vault.html" class="hover:text-[#cc001b] transition-colors">Vault</a>
              </li>
            </ul>

            <ul class="flex flex-col space-y-1">
              <li>
                <a href="dealers.html" class="hover:text-[#cc001b] transition-colors">Dealer Locator</a>
              </li>
              <li>
                <a href="about.html" class="hover:text-[#cc001b] transition-colors">About Us</a>
              </li>
              <li>
                <a href="support.html" class="hover:text-[#cc001b] transition-colors">Support</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex justify-center items-end">
          <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <a href="https://www.facebook.com/alaskabatteriespk/" class="social-box">
              <i class="fa-brands fa-facebook"></i>
            </a>

            <a href="https://www.instagram.com/alaskabatteriespk/" class="social-box">
              <i class="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.linkedin.com/company/alaskabatteriespk/" class="social-box">
              <i class="fa-brands fa-linkedin"></i>
            </a>

            <a href="https://www.youtube.com/channel/UCZXmvMmmVMxFqfzQpGHDWWA" class="social-box">
              <i class="fa-brands fa-youtube"></i>
            </a>

            <a href="https://api.whatsapp.com/send?phone=923266660757" class="social-box">
              <i class="fa-brands fa-whatsapp"></i>
            </a>

            <a href="https://www.tiktok.com/@alaskabatteriespk" class="social-box">
              <i class="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-50 pt-2 pb-4 flex flex-col items-center text-[12px] text-gray-400 uppercase tracking-normal text-center">
        <p>©2026 S.M.J International Industries Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </div>
    <div id="successModal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="bg-white max-w-md w-full p-12 text-center shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-[#cc001b]"></div>

        <div class="mb-8 flex justify-center">
          <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
            <i class="fa-solid fa-check text-4xl text-[#cc001b]"></i>
          </div>
        </div>

        <h2 class="text-3xl font-black uppercase tracking-tighter mb-4">Submission <br />Successful</h2>
        <p class="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed mb-10">
          Thank you for reaching out to Alaska. <br />
          Our team will review your details and contact you within 48 business hours.
        </p>

        <button onclick="closeModal()" class="w-full bg-black text-white font-black uppercase py-4 text-[10px] tracking-[0.3em] hover:bg-[#cc001b] transition-all">Return to Site</button>
      </div>
    </div>
  </footer>
`;

function setupMobileMenu() {
  const trigger = document.getElementById("mobile-menu-trigger");
  if (!trigger) return;

  const oldOverlay = document.getElementById("mobile-menu-overlay");
  if (oldOverlay) oldOverlay.remove();

  const menu = document.createElement("div");
  menu.id = "mobile-menu-overlay";
  // Corporate Style: Dark semi-transparent backdrop with a slide-out white panel
  menu.className = "fixed inset-0 z-[500] hidden";

  menu.innerHTML = /* HTML */ `
    <div id="mobile-backdrop" class="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm opacity-0 transition-opacity duration-500"></div>

    <div
      id="mobile-panel"
      class="absolute top-0 right-0 h-full w-full max-w-[320px] bg-white shadow-2xl translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <img src="assets/logo.png" alt="Alaska Logo" class="h-10 w-auto object-contain" />
        <button id="close-mobile" class="text-zinc-500 hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex-grow overflow-hidden relative bg-[#cc001b]">
        <div id="mobile-menu-container" class="flex w-[200%] h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <div id="main-view" class="w-1/2 h-full flex flex-col">
            <nav class="p-4">
              <a href="index.html" class="flex items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all">Home</a>

              <button
                onclick="openSubmenu('solutions-sub')"
                class="w-full flex justify-between items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all group">
                Solutions <i class="fa-solid fa-chevron-right text-[10px] text-white group-hover:text-[#cc001b]"></i>
              </button>

              <button
                onclick="openSubmenu('tech-sub')"
                class="w-full flex justify-between items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all group">
                Technology <i class="fa-solid fa-chevron-right text-[10px] text-white group-hover:text-[#cc001b]"></i>
              </button>

              <button
                onclick="openSubmenu('dealers-sub')"
                class="w-full flex justify-between items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all group">
                Dealers <i class="fa-solid fa-chevron-right text-[10px] text-white group-hover:text-[#cc001b]"></i>
              </button>

              <button
                onclick="openSubmenu('vault-sub')"
                class="w-full flex justify-between items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all group">
                Vault <i class="fa-solid fa-chevron-right text-[10px] text-white group-hover:text-[#cc001b]"></i>
              </button>

              <a href="about.html" class="flex items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all">About Us</a>
              <a href="support.html" class="flex items-center px-4 py-4 text-[15px] font-semibold text-white hover:bg-zinc-50 rounded-lg transition-all">Support</a>
            </nav>
          </div>

          <div id="sub-view" class="w-1/2 h-full flex flex-col bg-zinc-50">
            <button onclick="closeSubmenu()" class="flex items-center gap-3 px-8 py-6 text-[#cc001b] font-bold text-xs uppercase tracking-widest border-b border-zinc-200/50">
              <i class="fa-solid fa-arrow-left"></i> Back to Main
            </button>
            <div id="sub-content" class="p-4 flex flex-col"></div>
          </div>
        </div>
      </div>

      <div class="p-8 border-t border-gray-100 bg-zinc-50 text-center">
        <p class="text-[12px] text-gray-400 uppercase tracking-normal">©2026 S.M.J International Industries Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </div>
  `;

  document.body.appendChild(menu);

  // Corporate Style Submenus
  const submenus = {
    "solutions-sub": `
      <a href="dry-charge.html" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Dry Charge Batteries</a>
    `,
    "tech-sub": `
      <a href="graphite.html" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Graphite Technology</a>
    `,
    "dealers-sub": `
      <a href="dealers.html" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Find a Dealer</a>
      <a href="become-dealer.html" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Become a Dealer</a>
    `,
    "vault-sub": `
      <a href="vault.html" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Open Vault</a>
      <a href="vault.html#blogs" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Blogs</a>
      <a href="vault.html#faqs" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">FAQs</a>
      <a href="vault.html#gallery" class="px-4 py-4 text-[15px] font-semibold text-zinc-800 hover:text-[#cc001b] transition-colors">Gallery</a>
    `,
  };

  window.openSubmenu = function (id) {
    document.getElementById("sub-content").innerHTML = submenus[id];
    document.getElementById("mobile-menu-container").style.transform = "translateX(-50%)";
  };

  window.closeSubmenu = function () {
    document.getElementById("mobile-menu-container").style.transform = "translateX(0)";
  };

  const openMenu = () => {
    const backdrop = document.getElementById("mobile-backdrop");
    const panel = document.getElementById("mobile-panel");
    menu.classList.remove("hidden");

    // Smooth timing for slide and fade
    requestAnimationFrame(() => {
      backdrop.classList.replace("opacity-0", "opacity-100");
      panel.classList.replace("translate-x-full", "translate-x-0");
    });
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    const backdrop = document.getElementById("mobile-backdrop");
    const panel = document.getElementById("mobile-panel");

    backdrop.classList.replace("opacity-100", "opacity-0");
    panel.classList.replace("translate-x-0", "translate-x-full");

    setTimeout(() => {
      menu.classList.add("hidden");
      closeSubmenu();
      document.body.style.overflow = "";
    }, 500);
  };

  trigger.addEventListener("click", openMenu);
  document.getElementById("close-mobile").addEventListener("click", closeMenu);
  document.getElementById("mobile-backdrop").addEventListener("click", closeMenu);
  // Close the menu when a link inside it is clicked (so anchors navigate cleanly)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a");
    if (a) {
      // allow native navigation, but close the UI immediately
      closeMenu();
    }
  });
}

function init() {
  const headerElem = document.getElementById("header-placeholder");
  const footerElem = document.getElementById("footer-placeholder");

  if (headerElem) {
    headerElem.innerHTML = headerHTML;
  }

  if (footerElem) {
    footerElem.innerHTML = footerHTML;
  }

  // CRITICAL: Initialize mobile menu logic AFTER the HTML is injected
  setupMobileMenu();
}

// Run the initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
