// Wait for DOM to be ready before running any code
document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scroll Logic for # links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate header height to avoid overlapping the title
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth", // This creates the "nice scrolling effect"
        });
      }
    });
  });

  // FAQ & Other DOM-dependent code
  const triggers = document.querySelectorAll(".faq-trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parent = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector("i");

      // Close other open items (Optional - remove if you want multiple open)
      document.querySelectorAll(".faq-content").forEach((otherContent) => {
        if (otherContent !== content) {
          otherContent.style.maxHeight = "0";
          otherContent.style.opacity = "0";
          otherContent.previousElementSibling.querySelector("i").style.transform = "rotate(0deg)";
        }
      });

      // Toggle active item
      if (content.style.maxHeight === "0px" || content.style.maxHeight === "") {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        icon.style.transform = "rotate(45deg)"; // Changes + to x
      } else {
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });

  const faqButtons = document.querySelectorAll(".faq-filter-btn");
  const faqItems = document.querySelectorAll(".faq-item[data-category]");

  if (faqButtons.length && faqItems.length) {
    const setFaqCategory = (category) => {
      faqButtons.forEach((btn) => {
        const isActive = btn.getAttribute("data-category") === category;
        btn.classList.toggle("active", isActive);
      });

      faqItems.forEach((item) => {
        const matches = item.getAttribute("data-category") === category;
        item.classList.toggle("hidden", !matches);

        if (!matches) {
          const content = item.querySelector(".faq-content");
          const icon = item.querySelector(".faq-trigger i");
          if (content) {
            content.style.maxHeight = "0";
            content.style.opacity = "0";
          }
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });
    };

    faqButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setFaqCategory(btn.getAttribute("data-category"));
      });
    });

    const defaultBtn = document.querySelector(".faq-filter-btn.active") || faqButtons[0];
    if (defaultBtn) {
      setFaqCategory(defaultBtn.getAttribute("data-category"));
    }
  }

  // Form submission handling
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showSuccess();
      form.reset();
    });
  });

  // Blog modal overlay close handler
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeBlogModal);
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const EMAIL_API_URL = "https://yourdomain.com/send-email.php";

    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitBtn = document.getElementById("submitBtn");
      const originalText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      submitBtn.classList.add("opacity-50", "cursor-not-allowed");

      // Collect form data
      const formData = {
        name: document.getElementById("fullName").value,
        email: document.getElementById("userEmail").value,
        phone: document.getElementById("userPhone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      try {
        const response = await fetch(EMAIL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Show success modal
          document.getElementById("successModal").classList.remove("hidden");
          document.getElementById("successModal").classList.add("flex");

          // Reset form
          contactForm.reset();
        } else {
          alert(result.message || "Failed to send message. Please try again or contact us directly.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to send message. Please try again or contact us directly.");
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
      }
    });
  }

  // Partner count animation under the map
  const partnerCounter = document.getElementById("partner-count");
  const partnerCounterWrap = document.querySelector(".partner-counter");
  if (partnerCounter && partnerCounterWrap) {
    const target = parseInt(partnerCounterWrap.dataset.target || "0", 10);
    const duration = 1400;
    let started = false;

    const animateCount = () => {
      const start = performance.now();
      const from = 0;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(from + (target - from) * progress);
        partnerCounter.textContent = value.toString();
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (started) return;
        if (entries.some((entry) => entry.isIntersecting)) {
          started = true;
          animateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(partnerCounterWrap);
  }
});

// ============================================
// GLOBAL FUNCTIONS (defined outside DOMContentLoaded)
// ============================================

// Function to show the success message
function showSuccess() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Code for Blog Modal

const blogData = {
  "choosing-guide": {
    title: "How to Choose the Best Battery for Your Vehicle or Solar System",
    category: "Guide",
    image: "assets/vault/blogs/best-battery-blog-1.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed line-height-loose">
        Choosing the right battery matters — whether it’s for your car, bike, home solar system, or industrial setup. At Alaska Batteries, we offer automotive, solar & energy storage, and industrial/commercial batteries designed for Pakistan’s climate and conditions. Here’s a detailed guide to help you choose the right one.
      </p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">1) Identify Your Application</h3>
      <p class="mb-4 font-bold text-zinc-800">Start by clarifying the usage:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="p-6 bg-zinc-50 rounded-xl">
          <h4 class="font-bold text-[#cc001b] uppercase mb-2 text-sm tracking-widest">Automotive (cars/bikes/SUVs)</h4>
          <p class="text-xs leading-normal text-zinc-500">Requires reliable starting power, vibration resistance, correct size, and terminal layout.</p>
        </div>
        <div class="p-6 bg-zinc-50 rounded-xl">
          <h4 class="font-bold text-[#cc001b] uppercase mb-2 text-sm tracking-widest">Solar & Energy-Storage</h4>
          <p class="text-xs leading-normal text-zinc-500">Needs deep-cycle capability, suitable capacity for your load, and backup duration.</p>
        </div>
        <div class="p-6 bg-zinc-50 rounded-xl">
          <h4 class="font-bold text-[#cc001b] uppercase mb-2 text-sm tracking-widest">Industrial/Commercial</h4>
          <p class="text-xs leading-normal text-zinc-500">Often demands high capacity, long life, robust construction, and maybe special configurations.</p>
        </div>
      </div>
      <p class="mb-10 italic text-sm text-zinc-400">Alaska Batteries divides its catalog into precisely these three categories.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">2) Understand Battery Technologies & Types</h3>
      <p class="mb-4">Different battery types suit different needs:</p>
      <ul class="space-y-4 mb-10">
        <li class="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
          <strong class="text-[#cc001b] uppercase block mb-1">Automotive batteries</strong> 
          in Alaska use advanced technology <strong>graphite lead acid</strong> batteries for longer life and higher heat tolerance.
        </li>
        <li class="border border-zinc-200 p-6 rounded-2xl">
          <strong class="text-[#cc001b] uppercase block mb-1">Deep-cycle batteries</strong> 
          (for solar/storage) differ from standard starter batteries: they handle repeated discharges and recharges.
        </li>
      </ul>
      <p class="p-4 bg-zinc-50 text-center rounded-lg border-dashed border-2 border-zinc-200 font-bold uppercase text-xs tracking-widest mb-10">
        AGM / Gel / Tubular variants may be offered. Check the specification on the product page.
      </p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">3. Check Capacity, Size & Compatibility</h3>
      <div class="flex flex-col md:flex-row gap-8 mb-10 items-center">
        <div class="flex-1 space-y-4 text-sm text-zinc-600">
          <p><strong>For vehicles:</strong> Confirm battery matches your vehicle’s voltage, group size, Ah rating, terminal layout (polarity).</p>
          <p><strong>For solar/storage:</strong> Calculate your system’s load (in watts), backup time, and match to a battery bank (Ah rating × voltage).</p>
          <p class="bg-[#cc001b]/5 p-3 border-l-2 border-[#cc001b] italic text-zinc-800">
            Example: If you need a 4-hour backup at a given load, you’ll need a battery with sufficient capacity (e.g., larger Ah).
          </p>
        </div>
        <img src="assets/Graphite-image01.png" class="w-full md:w-1/3 rounded-xl shadow-md">
      </div>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">4. Consider Local Conditions & Brand Reliability</h3>
      <p class="mb-6 leading-relaxed">In Pakistan’s climate (high temperatures, voltage fluctuations), battery quality and brand matter:</p>
      <div class="bg-zinc-50 p-6 rounded-2xl mb-10">
         <p class="mb-4 font-bold tracking-tight text-zinc-900">Alaska Batteries emphasizes <span class="text-[#cc001b]">“graphite technology”</span> for better heat resistance and longer life.</p>
         <p class="text-sm">Choose trusted brands, good warranty, and check the manufacturing date.</p>
      </div>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">5. Match the Right Product from Alaska’s Portfolio</h3>
      <div class="space-y-3 mb-10">
        <div class="flex items-center gap-4 border-b border-zinc-100 pb-3">
          <span class="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">🚗</span>
          <p class="text-sm"><strong>For your car</strong> → go to the “Automotive Batteries Built for Extreme Weather” section.</p>
        </div>
        <div class="flex items-center gap-4 border-b border-zinc-100 pb-3">
          <span class="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">☀️</span>
          <p class="text-sm"><strong>For home solar</strong> → browse “Solar & Energy Storage Solution” items.</p>
        </div>
        <div class="flex items-center gap-4 border-b border-zinc-100 pb-3">
          <span class="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs">🏭</span>
          <p class="text-sm"><strong>For industrial use</strong> → check “Industrial / Commercial – Uninterrupted Power” category.</p>
        </div>
      </div>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">6. Maintenance & Care</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div class="space-y-2">
          <h4 class="font-bold text-xs uppercase tracking-widest text-zinc-400">Automotive</h4>
          <p class="text-xs text-zinc-500">Avoid deep discharges, ensure the alternator is working fine, and keep terminals clean.</p>
        </div>
        <div class="space-y-2">
          <h4 class="font-bold text-xs uppercase tracking-widest text-zinc-400">Solar/Storage</h4>
          <p class="text-xs text-zinc-500">Avoid full deep discharges, maintain correct charging cycle, check electrolyte if applicable.</p>
        </div>
      </div>
      <p class="text-sm italic text-[#cc001b] mb-10 text-center">Proper usage enhances lifespan, which Alaska Batteries addresses via their “Battery Life” resources.</p>

      <div class="p-8 bg-zinc-900 text-white rounded-3xl mb-10 shadow-2xl border-t-4 border-[#cc001b]">
        <h3 class="text-xl font-black uppercase mb-6 italic">Final Checklist Before Purchase</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#cc001b]"></i> Confirm correct size, voltage, and terminal orientation.</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#cc001b]"></i> Confirm capacity matches your requirement (vehicle start power or solar load).</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#cc001b]"></i> Ensure the product listing is from Alaska and it’s labeled properly.</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#cc001b]"></i> Check for warranty and manufacturing date.</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#cc001b]"></i> Ask about compatibility if unclear.</li>
        </ul>
      </div>

      <p class="text-zinc-600 leading-relaxed mb-6">
        Selecting the right battery is a process, but when you align your requirement (vehicle, solar, or industrial) with the correct technology, capacity, and trusted brand like Alaska Batteries, you’ll get reliable, long-lasting performance tailored to Pakistan’s conditions.
      </p>
      
      <div class="text-center">
        <a href="products.html" class="inline-block bg-[#cc001b] text-white px-8 py-4 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">
          Visit Products Page
        </a>
      </div>
    `,
  },
  "eid-checklist": {
    title: "Don't Let Eid Travel Leave You Stranded - Complete Battery Readiness Checklist",
    category: "Travel",
    image: "assets/vault/blogs/eid-blog-2.png",
    content: `
      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#cc001b] pl-4">Start your Eid journey with a few simple steps:</h3>
      
      <div class="bg-zinc-50 p-8 rounded-2xl mb-10 border-l-4 border-[#cc001b]">
        <p class="mb-4 text-lg font-bold text-zinc-900">Pre-Travel Battery Checklist:</p>
        <ul class="space-y-3 text-base text-zinc-700">
          <li class="flex items-start gap-3">
            <span class="text-[#cc001b] font-bold text-xl">1.</span>
            <span><strong>Clean your battery terminals</strong> to ensure optimal power flow</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#cc001b] font-bold text-xl">2.</span>
            <span><strong>Check voltage</strong> (12.4V and above is ideal)</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#cc001b] font-bold text-xl">3.</span>
            <span><strong>Inspect for physical wear or damage</strong> like swelling, fluid leaks, or damaged casing</span>
          </li>
        </ul>
      </div>

      <h4 class="text-xl font-black uppercase text-[#cc001b] mb-4">Here's where Alaska Graphite Batteries take the lead.</h4>
      
      <p class="text-base md:text-lg text-zinc-700 mb-8 leading-relaxed">
        Built for high demand and long routes, they <strong class="text-[#cc001b]">recharge 2x faster</strong> than conventional batteries, letting you regain lost charge quickly during short breaks at petrol pumps or rest stops. The added heat resistance and durability ensure you're ready for every kind of terrain — from scorching highways to high-altitude chill.
      </p>

      <div class="bg-zinc-900 text-white p-8 rounded-3xl mb-10 shadow-2xl border-t-4 border-[#cc001b]">
        <h4 class="text-xl font-black uppercase mb-4 italic">A reliable battery means no delays, no compromises,</h4>
        <p class="text-base leading-relaxed mb-6">
          and no ruining what should be a joyful experience. By the end of the day, it is the <strong class="text-[#cc001b]">peace of mind</strong> you need for a stress-free Eid journey.
        </p>
        <p class="text-sm text-zinc-300">
          Carry a jump starter kit and a power bank for extra security, especially if traveling with kids or elders.
        </p>
      </div>

      <div class="text-center mb-10">
        <p class="text-xl md:text-2xl font-black uppercase text-zinc-900 mb-4">
          This Eid, don't just prepare your car,<br>
          <span class="text-[#cc001b]">prepare your battery.</span>
        </p>
        <p class="text-lg font-bold text-zinc-600 mb-6">
          Alaska Graphite Batteries<br>
          <span class="text-sm italic">Built for beautiful and memorable journeys. Powered by Innovation.</span>
        </p>
      </div>

      <div class="flex flex-wrap gap-2 justify-center">
        <span class="px-4 py-2 bg-zinc-100 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-700">#Durability</span>
        <span class="px-4 py-2 bg-zinc-100 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-700">#GraphiteBatteries</span>
        <span class="px-4 py-2 bg-zinc-100 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-700">#Power</span>
        <span class="px-4 py-2 bg-zinc-100 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-700">#EidTravel</span>
      </div>
    `,
  },
  "power-saving": {
    title: "5 Power-Saving Secrets to Make Your Car Battery Last Longer",
    category: "Maintenance",
    image: "assets/vault/blogs/power-blog-3.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Paste the content from: https://alaskabatteries.com/5-power-saving-secrets-to-make-your-car-battery-last-longer-duplicate-2072/</p>
      <p class="text-sm text-zinc-500 italic">Instructions: Copy the main article content and paste it here, formatted with proper HTML tags.</p>`,
  },
  "ebike-accessories": {
    title: "How to Choose the Best E-Bike Accessories for Senior Riders",
    category: "E-Bike Guide",
    image: "assets/vault/blogs/storing-blog-4.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Paste the content from: https://alaskabatteries.com/how-to-choose-the-best-ebike-accessories-for-senior-riders/</p>
      <p class="text-sm text-zinc-500 italic">Instructions: Copy the main article content and paste it here, formatted with proper HTML tags.</p>`,
  },
  "ebike-repairs": {
    title: "Simple DIY Repairs for E-Bike Electrical Problems",
    category: "E-Bike Repair",
    image: "assets/vault/blogs/recycle-blog-5.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Paste the content from: https://alaskabatteries.com/simple-diy-repairs-for-ebike-electrical-problems/</p>
      <p class="text-sm text-zinc-500 italic">Instructions: Copy the main article content and paste it here, formatted with proper HTML tags.</p>`,
  },
  "ebike-charging": {
    title: "Top 5 Common E-Bike Charging Mistakes and How to Avoid Them",
    category: "E-Bike Tips",
    image: "assets/vault/blogs/summer-blog-6.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Paste the content from: https://alaskabatteries.com/top-5-common-ebike-charging-mistakes-and-how-to-avoid-them/</p>
      <p class="text-sm text-zinc-500 italic">Instructions: Copy the main article content and paste it here, formatted with proper HTML tags.</p>`,
  },
};

// Open Modal with improved performance
function openBlogModal(id) {
  const modal = document.getElementById("blog-modal");
  const body = document.getElementById("modal-body");
  const data = blogData[id];

  if (!data) return;

  // Use requestAnimationFrame for smoother rendering
  requestAnimationFrame(() => {
    body.innerHTML = `
      <div class="space-y-6 overflow-x-hidden">
        ${data.image ? `<div class="mb-6 rounded-2xl overflow-hidden shadow-lg border border-zinc-100"><img src="${data.image}" class="w-full h-48 md:h-64 object-cover" alt="${data.title}" loading="lazy"></div>` : ""}
        <div class="space-y-3">
          <span class="inline-block text-[#cc001b] font-bold uppercase tracking-widest text-xs px-3 py-1 bg-red-50 rounded-full">${data.category}</span>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-tight text-zinc-900">${data.title}</h1>
        </div>
        <div class="prose prose-zinc prose-sm md:prose-base lg:prose-lg max-w-none blog-content">
          ${data.content}
        </div>
      </div>
    `;
  });

  modal.classList.remove("hidden");
  // Smoother transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add("active");
    });
  });
  document.body.style.overflow = "hidden";
}

// Close Modal with smooth transition
function closeBlogModal() {
  const modal = document.getElementById("blog-modal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    // Clear content after closing to reduce memory
    const body = document.getElementById("modal-body");
    if (body) body.innerHTML = "";
  }, 300);
}

// Close on click outside (Overlay) - already handled in DOMContentLoaded

// Horizontal Scroll logic - improved
function scrollBlogs(distance) {
  const container = document.getElementById("blog-scroll-container");
  if (!container) return;
  container.scrollBy({ left: distance, behavior: "smooth" });
}

// Blog Search with debouncing for better performance
let searchTimeout;
function filterBlogs() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const input = document.getElementById("blog-search");
    const filter = input.value.toLowerCase();
    const container = document.getElementById("blog-scroll-container");
    if (!container) return;

    const cards = container.getElementsByClassName("blog-item");

    // Disable loop snapping while searching
    container.style.scrollSnapType = filter ? "none" : "x mandatory";

    for (let i = 0; i < cards.length; i++) {
      const title = cards[i].querySelector("h4")?.innerText?.toLowerCase() || "";
      const category = cards[i].querySelector("p")?.innerText?.toLowerCase() || "";

      if (title.includes(filter) || category.includes(filter)) {
        cards[i].style.display = "block";
      } else {
        cards[i].style.display = "none";
      }
    }
  }, 150); // Debounce by 150ms
}

const container = document.getElementById("blog-scroll-container");

function initBlogEngine() {
  if (!container) return;

  // Mobile Observer for image scale/fade
  const observer = new IntersectionObserver(
    (entries) => {
      if (window.innerWidth >= 1024) return;
      entries.forEach((entry) => {
        const wash = entry.target.querySelector(".wash-layer");
        const img = entry.target.querySelector("img");
        if (entry.isIntersecting) {
          if (wash) wash.style.opacity = "0";
          if (img) img.style.transform = "";
        } else {
          if (wash) wash.style.opacity = "0.7";
          if (img) img.style.transform = "";
        }
      });
    },
    { root: container, threshold: 0.8 },
  );

  document.querySelectorAll(".blog-item").forEach((item) => observer.observe(item));
}

function scrollBlogs(dir) {
  if (!container) return;
  const blogItem = container.querySelector(".blog-item");
  if (!blogItem) return;

  const itemWidth = blogItem.offsetWidth + 20;
  const move = window.innerWidth > 1024 ? itemWidth * 3 : itemWidth;
  container.scrollBy({ left: move * dir, behavior: "smooth" });
}

// Products Carousel Control
function initCarousel() {
  const carousel = document.getElementById("productsCarousel");
  const dotsContainer = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const cards = document.querySelectorAll(".product-card");
  const cardCount = cards.length;

  // Create pagination dots
  for (let i = 0; i < cardCount; i++) {
    const dot = document.createElement("button");
    dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
    dot.onclick = () => scrollToCard(i);
    dotsContainer.appendChild(dot);
  }

  // Function to check if at end and update button visibility
  function updateButtonVisibility() {
    if (!carousel) return;
    const scrollWidth = carousel.scrollWidth;
    const scrollLeft = carousel.scrollLeft;
    const clientWidth = carousel.clientWidth;

    // Check if at start
    if (scrollLeft <= 0) {
      prevBtn.style.opacity = "0.4";
      prevBtn.style.pointerEvents = "none";
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
      prevBtn.style.display = "block";
    }

    // Check if at end (with small tolerance for rounding)
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      nextBtn.style.opacity = "0.4";
      nextBtn.style.pointerEvents = "none";
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
      nextBtn.style.display = "block";
    }
  }

  // Scroll carousel by item count
  window.scrollCarousel = function (direction) {
    if (!carousel) return;
    const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(carousel).gap);
    carousel.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
    setTimeout(updateButtonVisibility, 300);
  };

  // Update dots and buttons on carousel scroll
  carousel.addEventListener("scroll", () => {
    updateActiveDot();
    updateButtonVisibility();
  });

  function updateActiveDot() {
    const dots = document.querySelectorAll(".carousel-dot");
    const scrollPos = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(carousel).gap);
    const activeIndex = Math.round(scrollPos / cardWidth);

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  function scrollToCard(index) {
    if (!carousel) return;
    const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(carousel).gap);
    carousel.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setTimeout(updateButtonVisibility, 300);
  }

  // Initial button visibility check
  updateButtonVisibility();
}

// Function to close the success modal
function closeSuccessModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Initialize carousel on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCarousel);
} else {
  initCarousel();
}

window.addEventListener("load", initBlogEngine);
