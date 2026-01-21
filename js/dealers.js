// This would ideally live in js/data.js
const dealers = [
    { name: "Lahore Battery House", address: "Main Ferozepur Road, Lahore", province: "Punjab", contact: "042-35123456" },
    { name: "Karachi Solar Hub", address: "DHA Phase 6, Karachi", province: "Sindh", contact: "021-34567890" },
    { name: "Islamabad Energy Solutions", address: "Blue Area, Islamabad", province: "Punjab", contact: "051-8740280" },
    { name: "Peshawar Power Point", address: "University Road, Peshawar", province: "KPK", contact: "091-1234567" },
    { name: "Quetta Battery Center", address: "Saryab Road, Quetta", province: "Balochistan", contact: "081-9876543" }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('dealerSearch');
    const provinceSelect = document.getElementById('provinceFilter');
    const dealerList = document.getElementById('dealerList');
    const dealerCount = document.getElementById('dealerCount');

    function renderDealers(data) {
        dealerList.innerHTML = '';
        dealerCount.innerText = data.length;

        if (data.length === 0) {
            dealerList.innerHTML = `
                <div class="p-10 text-center border-2 border-dashed border-gray-100">
                    <p class="text-gray-400 font-black uppercase text-xs tracking-widest">No dealers found in this region</p>
                </div>`;
            return;
        }

        data.forEach(dealer => {
            const card = document.createElement('div');
            card.className = "dealer-card bg-zinc-900 p-6 rounded-lg border-l-4 border-zinc-700 hover:border-[#cc001b] transition-all group cursor-pointer";
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-white font-black uppercase tracking-widest text-sm mb-1 group-hover:text-[#cc001b]">${dealer.name}</h4>
                        <p class="text-zinc-500 text-[11px] font-bold uppercase mb-4">${dealer.address}</p>
                    </div>
                    <span class="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-1 font-black uppercase">${dealer.province}</span>
                </div>
                <div class="flex items-center gap-4">
                    <a href="tel:${dealer.contact}" class="text-[#cc001b] text-[10px] font-black uppercase tracking-widest hover:underline">${dealer.contact}</a>
                    <span class="text-zinc-700">|</span>
                    <button class="text-white text-[10px] font-black uppercase tracking-widest">Get Directions</button>
                </div>
            `;
            dealerList.appendChild(card);
        });
    }

    function filterDealers() {
        const term = searchInput.value.toLowerCase();
        const prov = provinceSelect.value;

        const filtered = dealers.filter(d => {
            const matchesSearch = d.name.toLowerCase().includes(term) || d.address.toLowerCase().includes(term);
            const matchesProv = (prov === "All" || d.province === prov);
            return matchesSearch && matchesProv;
        });

        renderDealers(filtered);
    }

    searchInput.addEventListener('input', filterDealers);
    provinceSelect.addEventListener('change', filterDealers);

    // Initial load
    renderDealers(dealers);
});