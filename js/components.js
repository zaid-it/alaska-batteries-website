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

                        <div class="w-3/4 flex pt-1"> <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800 text-left justify-center">
                                <a href="dry-charge.html" class="hover:text-[#cc001b]">Dry Charge</a>
                                <a href="deep-cycle.html" class="hover:text-[#cc001b]">Deep Cycle</a>
                                <a href="maintenance-free.html" class="hover:text-[#cc001b]">Maintenance Free</a>
                                <a href="lfp.html" class="hover:text-[#cc001b]">Lithium-ion</a>
                            </div>
                            <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800 text-center">
                                <a href="graphite.html" class="hover:text-[#cc001b]">Graphite Tech</a>
                            </div>
                            <div class="flex-1 px-4 flex flex-col space-y-4 text-[14px] font-bold text-gray-800 text-left justify-start">
                                <a href="vault.html#blogs" class="hover:text-[#cc001b]">Blog</a>
                                <a href="vault.html#faqs" class="hover:text-[#cc001b]">FAQ</a>
                                <a href="vault.html#gallery" class="hover:text-[#cc001b]">Gallery</a>
                            </div>
                            <div class="flex-1 px-2 flex flex-col space-y-4 text-[14px] font-bold text-gray-800 text-center">
                                <a href="dealers.html" class="hover:text-[#cc001b] whitespace-nowrap">
                                    <i class="fa-solid fa-location-dot mr-1 text-[#cc001b]"></i> Find a Dealer
                                </a>
                                <a href="become-dealer.html" class="text-[#cc001b] underline underline-offset-4">Apply as Dealer</a>
                            </div>
                            <div class="flex-1 px-4 text-center">
                                <p class="text-[14px] italic text-gray-400 leading-tight">Get to know about the mind behind Alaska Batteries</p>
                            </div>
                            <div class="flex-1 px-4 text-center">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
            
            <div class="flex flex-col justify-center items-center">
                <div class="w-full max-w-[280px]">
                    <div class="text-gray-500 text-sm leading-relaxed">
                        <p class="mb-4">
                            7th Floor, B-3 Tower, Opp. F-9 Park, Sector F-9/G-9 Jinnah Avenue, New Blue Area, Islamabad, Pakistan, 44010
                        </p>
                        <p class="mb-2">
                            <a href="tel:0518740280" class="text-gray-900 text-sm font-bold hover:text-[#cc001b] transition-colors">
                                (051) 8740 280
                            </a>
                        </p>
                        <p>
                            <a href="mailto:info@alaskabatteries.com" class="text-[#cc001b] text-sm font-medium hover:underline">
                                info@alaskabatteries.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="inline-block md:text-left">
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

            <div class="flex justify-center items-center">
                <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-max">
                    <a href="https://www.facebook.com/alaskabatteriespk/" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com/alaskabatteriespk/" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/company/alaskabatteriespk/" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/channel/UCZXmvMmmVMxFqfzQpGHDWWA" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-youtube"></i></a>
                    <a href="https://api.whatsapp.com/send?phone=923266660757" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="https://www.tiktok.com/@alaskabatteriespk" class="text-gray-400 hover:text-[#cc001b] text-2xl transition-colors"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </div>

        <div class="border-t border-gray-50 pt-8 flex flex-col items-center text-[11px] text-gray-400 uppercase tracking-widest text-center">
            <p>© 2026 Alaska Batteries. All Rights Reserved.</p>
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

        <h2 class="text-3xl font-black uppercase tracking-tighter mb-4">Submission <br>Successful</h2>
        <p class="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed mb-10">
            Thank you for reaching out to Alaska. <br> Our team will review your details and contact you within 48 business hours.
        </p>

        <button onclick="closeModal()" class="w-full bg-black text-white font-black uppercase py-4 text-[10px] tracking-[0.3em] hover:bg-[#cc001b] transition-all">
            Return to Site
        </button>
    </div>
</div>
</footer>
`;

function setupMobileMenu() {
    const trigger = document.getElementById('mobile-menu-trigger');
    if (!trigger) return;

    // Cleanup existing
    const existingOverlay = document.getElementById('mobile-menu-overlay');
    const existingPanel = document.getElementById('mobile-menu-panel');
    if (existingOverlay) { existingOverlay.remove(); existingPanel.remove(); }

    const overlay = document.createElement('div');
    overlay.id = 'mobile-menu-overlay';
    overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] hidden opacity-0 transition-opacity duration-500';
    
    const panel = document.createElement('div');
    panel.id = 'mobile-menu-panel';
    panel.className = 'fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-black text-white z-[201] translate-x-full transition-transform duration-500 ease-in-out p-8 flex flex-col shadow-2xl border-l border-zinc-800';
    
    panel.innerHTML = `
        <div class="flex justify-between items-center mb-12">
            <div class="flex items-center gap-2">
                <img src="assets/favicon.png" class="h-8">
                <span class="font-black uppercase tracking-tighter text-xl">Alaska</span>
            </div>
            <button id="close-mobile" class="text-4xl text-white hover:text-[#cc001b]">&times;</button>
        </div>

        <nav class="flex flex-col overflow-y-auto custom-scrollbar pr-2">
            <a href="index.html" class="py-4 text-2xl font-black uppercase tracking-tighter border-b border-zinc-900">Home</a>
            
            <div class="mobile-item border-b border-zinc-900">
                <button class="w-full py-4 text-left flex justify-between items-center text-2xl font-black uppercase tracking-tighter group">
                    Solutions <i class="fa-solid fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div class="hidden flex-col pl-4 pb-6 space-y-4">
                    <a href="solutions.html" class="text-xs font-black uppercase tracking-widest text-[#cc001b]">Explore All</a>
                    <a href="dry-charge.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Dry Charge</a>
                    <a href="deep-cycle.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Deep Cycle</a>
                    <a href="maintenance-free.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Maintenance Free</a>
                    <a href="lfp.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Lithium-ion</a>
                </div>
            </div>

            <div class="mobile-item border-b border-zinc-900">
                <button class="w-full py-4 text-left flex justify-between items-center text-2xl font-black uppercase tracking-tighter">
                    Technology <i class="fa-solid fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div class="hidden flex-col pl-4 pb-6 space-y-4">
                    <a href="technology.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Explore Tech</a>
                    <a href="graphite.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Graphite Tech</a>
                </div>
            </div>

            <div class="mobile-item border-b border-zinc-900">
                <button class="w-full py-4 text-left flex justify-between items-center text-2xl font-black uppercase tracking-tighter">
                    Vault <i class="fa-solid fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div class="hidden flex-col pl-4 pb-6 space-y-4">
                    <a href="vault.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Open Vault</a>
                    <a href="vault.html#blogs" class="text-xs font-black uppercase tracking-widest text-zinc-400">Blog</a>
                    <a href="vault.html#faqs" class="text-xs font-black uppercase tracking-widest text-zinc-400">FAQ</a>
                    <a href="vault.html#gallery" class="text-xs font-black uppercase tracking-widest text-zinc-400">Gallery</a>
                </div>
            </div>

            <div class="mobile-item border-b border-zinc-900">
                <button class="w-full py-4 text-left flex justify-between items-center text-2xl font-black uppercase tracking-tighter text-[#cc001b]">
                    <span><i class="fa-solid fa-location-dot mr-2"></i>Dealer Locator</span>
                    <i class="fa-solid fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div class="hidden flex-col pl-4 pb-6 space-y-4">
                    <a href="dealers.html" class="text-xs font-black uppercase tracking-widest text-white underline decoration-[#cc001b] underline-offset-4">Find a Dealer</a>
                    <a href="become-dealer.html" class="text-xs font-black uppercase tracking-widest text-[#cc001b]">Apply as Dealer</a>
                </div>
            </div>

            <a href="about.html" class="py-4 text-2xl font-black uppercase tracking-tighter border-b border-zinc-900">About Us</a>
            <a href="support.html" class="py-4 text-2xl font-black uppercase tracking-tighter border-b border-zinc-900">Support</a>
        </nav>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    // Toggle Logic
    const open = () => {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
        panel.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        overlay.classList.remove('opacity-100');
        panel.classList.add('translate-x-full');
        setTimeout(() => { overlay.classList.add('hidden'); document.body.style.overflow = 'auto'; }, 500);
    };

    trigger.addEventListener('click', open);
    overlay.addEventListener('click', close);
    document.getElementById('close-mobile').addEventListener('click', close);

    // Accordion Logic
    panel.querySelectorAll('.mobile-item button').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.fa-chevron-down');
            
            // Toggle Content
            const isHidden = content.classList.contains('hidden');
            content.classList.toggle('hidden', !isHidden);
            content.classList.toggle('flex', isHidden);
            
            // Rotate Icon
            icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
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