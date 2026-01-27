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
              <a href="solutions.html" class="nav-link">Solutions</a>
              <div class="dropdown-panel">
                <a href="dry-charge.html" class="dropdown-item">Dry Charge</a>
            <li class="nav-item">
              <a href="technology.html" class="nav-link">Technology</a>
              <div class="dropdown-panel">
                <a href="graphite.html" class="dropdown-item">Graphite Tech</a>
              </div>
            </li>

            <li class="nav-item">
              <a href="dealers.html" class="nav-link">Dealer</a>
              <div class="dropdown-panel">
                <a href="dealers.html" class="dropdown-item">Find a Dealer</a>
                <a href="become-dealer.html" class="dropdown-item">Apply as Dealer</a>
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
                <a href="solutions.html" class="hover:text-[#cc001b] transition-colors">Solutions</a>
              </li>
              <li>
                <a href="technology.html" class="hover:text-[#cc001b] transition-colors">Technology</a>
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
  // Background is a soft dark grey with heavy blur
  menu.className = "fixed inset-0 bg-white/70 backdrop-blur-xl z-[500] hidden opacity-0 transition-all duration-500 flex flex-col";

  menu.innerHTML = /* HTML */ `
    <div class="flex justify-between items-center p-5 border-b border-black/5">
      <a href="index.html">
        <img src="assets/logo.png" alt="Logo" class="h-10 px-[4px]" />
      </a>
      <button id="close-mobile" class="relative w-10 h-10 flex items-center justify-center">
        <span class="absolute w-8 h-0.5 bg-[#cc001b] transition-all duration-300 rotate-45"></span>
        <span class="absolute w-8 h-0.5 bg-[#cc001b] transition-all duration-300 -rotate-45"></span>
      </button>
    </div>

    <div class="flex-grow overflow-hidden relative">
      <div id="mobile-menu-container" class="flex w-[200%] h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <div id="main-view" class="w-1/2 h-full p-8 flex flex-col justify-center">
          <nav class="space-y-1">
            <a href="index.html" class="block text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">Home</a>

            <button
              onclick="openSubmenu('solutions-sub')"
              class="w-full text-left flex justify-between items-end text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">
              Solutions <i class="fa-solid fa-chevron-right text-[#cc001b]"></i>
            </button>

            <button
              onclick="openSubmenu('tech-sub')"
              class="w-full text-left flex justify-between items-end text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">
              Technology <i class="fa-solid fa-chevron-right text-[#cc001b]"></i>
            </button>

            <button
              onclick="openSubmenu('dealers-sub')"
              class="w-full text-left flex justify-between items-end text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">
              Dealers <i class="fa-solid fa-chevron-right text-[#cc001b]"></i>
            </button>

            <button
              onclick="openSubmenu('vault-sub')"
              class="w-full text-left flex justify-between items-end text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">
              Vault <i class="fa-solid fa-chevron-right text-[#cc001b]"></i>
            </button>

            <a href="about.html" class="block text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">About</a>
            <a href="support.html" class="block text-4xl font-bold uppercase tracking-normal text-zinc-900 hover:text-[#cc001b] transition-colors">Support</a>
          </nav>
        </div>

        <div id="sub-view" class="w-1/2 h-full p-8 flex flex-col justify-center bg-black/5">
          <button onclick="closeSubmenu()" class="flex items-center gap-2 text-[#cc001b] font-bold uppercase text-xl mb-10"><i class="fa-solid fa-arrow-left"></i> Back to Main</button>
          <div id="sub-content" class="flex flex-col space-y-6"></div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(menu);

  // Submenu Data (Keeping your items as requested)
  const submenus = {
    "solutions-sub": `
      <a href="solutions.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">Our Products</a>
      <a href="dry-charge.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">Dry Charge</a>
    `,
    "tech-sub": `
      <a href="technology.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">Technology</a>
      <a href="graphite.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">Graphite</a>
    `,
    "dealers-sub": `
      <a href="dealers.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">Find a Dealer</a>
      <a href="become-dealer.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">Apply to be a Dealer</a>
    `,
    "vault-sub": `
      <a href="vault.html" class="text-3xl font-black uppercase text-zinc-900 slide-up">The Vault</a>
      <a href="vault.html#blogs" class="text-3xl font-black uppercase text-zinc-900 slide-up">Blog</a>
      <a href="vault.html#faq" class="text-3xl font-black uppercase text-zinc-900 slide-up">FAQs</a>
      <a href="vault.html#gallery" class="text-3xl font-black uppercase text-zinc-900 slide-up">Gallery</a>
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
    menu.classList.remove("hidden");
    setTimeout(() => menu.classList.add("opacity-100"), 10);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeMenu = () => {
    menu.classList.remove("opacity-100");
    setTimeout(() => {
      menu.classList.add("hidden");
      closeSubmenu();
      document.body.style.overflow = "";
    }, 500);
  };
  // Close menu if clicking the background area of the container
  document.getElementById("mobile-menu-container").addEventListener("click", (e) => {
    // If the user clicked the container itself, and NOT a link/button inside it
    if (e.target.id === "mobile-menu-container" || e.target.id === "main-view" || e.target.id === "sub-view") {
      closeMenu();
    }
  });

  trigger.addEventListener("click", openMenu);
  document.getElementById("close-mobile").addEventListener("click", closeMenu);
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
