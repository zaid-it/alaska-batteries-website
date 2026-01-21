// js/components.js

const brandRed = "#cc001b";

const headerHTML = `
<header class="fixed top-0 left-0 w-full z-[100] bg-white border-b border-gray-100">
    <div class="container mx-auto px-6"> 
        <div class="flex items-center h-20">
            <div class="w-1/4">
                <a href="index.html">
                    <img src="assets/logo.png" alt="Alaska Logo" class="h-12">
                </a>
            </div>

            <nav class="hidden lg:block w-3/4 h-full">
                <ul class="flex h-full items-center justify-end">
                    
                    <li class="nav-item">
                        <a href="solutions.html" class="nav-link">Solutions</a>
                        <div class="dropdown-panel">
                            <a href="dry-charge.html" class="dropdown-item">Dry Charge</a>
                            <a href="deep-cycle.html" class="dropdown-item">Deep Cycle</a>
                            <a href="maintenance-free.html" class="dropdown-item">Maintenance Free</a>
                            <a href="lfp.html" class="dropdown-item">Lithium-ion</a>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a href="technology.html" class="nav-link">Technology</a>
                        <div class="dropdown-panel">
                            <a href="graphite.html" class="dropdown-item">Graphite Tech</a>
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
                        <a href="dealers.html" class="nav-link">Dealer</a>
                        <div class="dropdown-panel">
                            <a href="dealers.html" class="dropdown-item">Find a Dealer</a>
                            <a href="become-dealer.html" class="dropdown-item">Apply as Dealer</a>
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

            <div class="flex justify-center items-center py-8">
    <div class="grid grid-cols-2 md:grid-cols-2 gap-2">
        
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

        <div class="border-t border-gray-50 pt-8 flex flex-col items-center text-[11px] text-gray-400 uppercase tracking-widest text-center">
            <p>© 2026 S.M.J International Industries Pvt. Ltd. All Rights Reserved.</p>
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
        <div class="flex justify-between items-center mb-12 bg-white/80 rounded-full py-2 px-4 backdrop-blur-sm">
            <div class="flex items-center gap-2">
                <a href="index.html">
                    <img src="assets/logo.png" alt="Alaska Logo" class="h-8 md:h-12 w-auto object-contain">
                </a>
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
                <button class="w-full py-4 text-left flex justify-between items-center text-2xl font-black uppercase tracking-tighter">
                    <span>Dealer Locator</span>
                    <i class="fa-solid fa-chevron-down text-sm transition-transform"></i>
                </button>
                <div class="hidden flex-col pl-4 pb-6 space-y-4">
                    <a href="dealers.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Find a Dealer</a>
                    <a href="become-dealer.html" class="text-xs font-black uppercase tracking-widest text-zinc-400">Apply to be a Dealer</a>
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