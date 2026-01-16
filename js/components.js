// js/components.js

const brandRed = "#cc001b";

const headerHTML = `
<header class="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-100">
    <div class="container mx-auto px-6"> <div class="flex items-center h-20">
            <div class="w-1/4">
                <a href="index.html">
                    <img src="assets/logo.png" alt="Alaska Logo" class="h-12">
                </a>
            </div>

            <nav class="hidden lg:block w-3/4 h-full group/nav">
                <ul class="flex h-full items-center text-center">
                    <li class="flex-1 h-full flex items-center justify-center hover:text-[#cc001b] font-bold uppercase text-[15px] tracking-tight cursor-pointer"><a href="solutions.html">Solutions</a></li>
                    <li class="flex-1 h-full flex items-center justify-center hover:text-[#cc001b] font-bold uppercase text-[15px] tracking-tight cursor-pointer"><a href="technology.html">Technology</a></li>
                    <li class="flex-1 h-full flex items-center justify-center hover:text-[#cc001b] font-bold uppercase text-[15px] tracking-tight cursor-pointer"><a href="vault.html">Vault</a></li>
                    <li class="flex-1 h-full flex items-center justify-center hover:text-[#cc001b] font-bold uppercase text-[15px] tracking-tight cursor-pointer"><a href="dealers.html">Dealer Locator</a></li>
                    <li class="flex-1 h-full flex items-center justify-center hover:text-[#cc001b] font-bold uppercase text-[15px] tracking-tight cursor-pointer"><a href="about.html">About Us</a></li>
                    <li class="flex-1 h-full flex items-center justify-center hover:text-[#cc001b] font-bold uppercase text-[15px] tracking-tight cursor-pointer"><a href="support.html">Support</a></li>
                </ul>

                <div class="invisible group-hover/nav:visible opacity-0 group-hover/nav:opacity-100 absolute left-0 top-full w-screen bg-white shadow-2xl transition-all duration-150 border-t border-gray-50 pt-2 pb-10">
                    <div class="container mx-auto px-6 flex items-start">
                        
                        <div class="w-1/4 pr-12 flex flex-col items-start"> <img src="assets/tech.png" alt="Graphite Logo" class="w-full h-auto max-w-[180px] mb-2">
                        </div>

                        <div class="w-3/4 flex pt-1"> <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800">
                                <a href="dry-charge.html" class="hover:text-[#cc001b]">Dry Charge</a>
                                <a href="deep-cycle.html" class="hover:text-[#cc001b]">Deep Cycle</a>
                                <a href="maintenance-free.html" class="hover:text-[#cc001b]">Maintenance Free</a>
                                <a href="lfp.html" class="hover:text-[#cc001b]">Lithium-ion</a>
                            </div>
                            <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800">
                                <a href="graphite.html" class="hover:text-[#cc001b]">Graphite Tech</a>
                                <a href="#" class="hover:text-[#cc001b]">Coming Soon</a>
                            </div>
                            <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800">
                                <a href="vault.html#blogs" class="hover:text-[#cc001b]">Blog</a>
                                <a href="vault.html#faqs" class="hover:text-[#cc001b]">FAQ</a>
                                <a href="vault.html#gallery" class="hover:text-[#cc001b]">Gallery</a>
                            </div>
                            <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800">
                                <a href="dealers.html" class="hover:text-[#cc001b] whitespace-nowrap">
                                    <i class="fa-solid fa-location-dot mr-1 text-[#cc001b]"></i> Find a Dealer
                                </a>
                                <a href="become-dealer.html" class="text-[#cc001b] underline underline-offset-4">Apply as Dealer</a>
                            </div>
                            <div class="flex-1 px-4">
                                <p class="text-[14px] italic text-gray-400 leading-tight">Get to know about the mind behind Alaska Batteries</p>
                            </div>
                            <div class="flex-1 px-4">
                                <p class="text-[14px] italic text-gray-400 leading-tight">Always there when you need a charge</p>
                            </div>
                        </div>
                    </div>
                </div>
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

const footerHTML = `
<footer class="bg-white border-t border-gray-100 pt-16 pb-8">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            <div class="flex justify-center md:justify-start">
                <div class="max-w-[280px] text-left">
                    <p class="text-gray-500 text-sm leading-relaxed mb-2">
                        7th Floor, B-3 Tower, Opp. F-9 Park, Sector F-9/G-9 Jinnah Avenue, New Blue Area, Islamabad, Pakistan, 44010
                    </p>
                    <p class="text-gray-500 text-sm leading-relaxed font-bold">
                        (051) 8740 280
                    </p>
                    <p class="text-[#cc001b] text-sm leading-relaxed">
                        info@alaskabatteries.com
                    </p>
                </div>
            </div>

            <div class="flex justify-center md:justify-start">
                <div class="inline-block text-left">
                    <ul class="flex flex-col space-y-4 text-sm font-bold text-gray-600">
                        <li><a href="index.html" class="hover:text-[#cc001b] transition-colors">Home</a></li>
                        <li><a href="solutions.html" class="hover:text-[#cc001b] transition-colors">Solutions</a></li>
                        <li><a href="technology.html" class="hover:text-[#cc001b] transition-colors">Technology</a></li>
                        <li><a href="vault.html" class="hover:text-[#cc001b] transition-colors">Vault</a></li>
                        <li><a href="dealers.html" class="hover:text-[#cc001b] transition-colors">Dealer Locator</a></li>
                        <li><a href="about.html" class="hover:text-[#cc001b] transition-colors">About Us</a></li>
                        <li><a href="support.html" class="hover:text-[#cc001b] transition-colors">Support</a></li>
                    </ul>
                </div>
            </div>

            <div class="flex justify-center md:justify-start items-center">
                <div class="grid grid-cols-3 gap-6 w-max">
                    <a href="#" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-youtube"></i></a>
                    <a href="#" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-50 pt-8 flex flex-col items-center text-[11px] text-gray-400 uppercase tracking-widest text-center">
            <p>© 2026 Alaska Batteries. All Rights Reserved.</p>
        </div>
    </div>
</footer>
`;

function setupMobileMenu() {
    const trigger = document.getElementById('mobile-menu-trigger');
    if (!trigger) return;

    // Remove any existing overlay to prevent duplicates
    const existingOverlay = document.getElementById('mobile-menu-overlay');
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'mobile-menu-overlay';
    overlay.className = 'fixed inset-0 bg-black/50 z-[200] hidden opacity-0 transition-opacity duration-300';
    
    const panel = document.createElement('div');
    panel.id = 'mobile-menu-panel';
    panel.className = 'fixed top-0 right-0 h-full w-[80%] max-w-[400px] bg-white z-[201] translate-x-full transition-transform duration-300 p-6 flex flex-col shadow-2xl';
    
    panel.innerHTML = `
        <div class="flex justify-between items-center mb-10">
            <img src="assets/logo.png" class="h-8">
            <button id="close-mobile" class="text-4xl">&times;</button>
        </div>
        <nav class="flex flex-col space-y-4 font-bold uppercase text-lg">
            <a href="index.html" class="py-2 border-b">Home</a>
            <div class="mobile-item">
                <button class="w-full text-left flex justify-between items-center py-2 border-b">Solutions <i class="fa-solid fa-chevron-right text-sm"></i></button>
                <div class="hidden flex-col pl-4 py-2 space-y-3 normal-case text-gray-600 bg-gray-50 mt-2">
                    <a href="dry-charge.html">Dry Charge</a>
                    <span class="text-gray-300 italic">Deep Cycle (Soon)</span>
                </div>
            </div>
            <a href="technology.html" class="py-2 border-b">Technology</a>
            <a href="vault.html" class="py-2 border-b">Vault</a>
            <a href="dealers.html" class="py-2 border-b text-[#cc001b]">Dealer Locator</a>
        </nav>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    trigger.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
        panel.classList.remove('translate-x-full');
    });

    const close = () => {
        overlay.classList.remove('opacity-100');
        panel.classList.add('translate-x-full');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    };

    overlay.addEventListener('click', close);
    document.getElementById('close-mobile').addEventListener('click', close);

    // Accordion for Mobile Sub-menu
    panel.querySelectorAll('.mobile-item button').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            content.classList.toggle('hidden');
            content.classList.toggle('flex');
        });
    });
}

function init() {
    const headerElem = document.getElementById('header-placeholder');
    const footerElem = document.getElementById('footer-placeholder');

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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}