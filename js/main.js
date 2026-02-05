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
document.addEventListener("DOMContentLoaded", () => {
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
});
// Function to show the success message
function showSuccess() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Prevent scrolling behind modal
  document.body.style.overflow = "hidden";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");

  // Restore scrolling
  document.body.style.overflow = "auto";
}

// Example: Intercepting form submissions
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop actual submission for this demo

    // You would typically send your data via fetch/AJAX here
    showSuccess();

    // Optional: Clear the form
    form.reset();
  });
});

// Code for Blog Modal

const blogData = {
  /* HTML */
  "choosing-guide": {
    title: "How to Select the Best Battery for Your Vehicle or Solar System",
    category: "Detailed Guide",
    content: `
      <div class="mb-8 rounded-2xl overflow-hidden shadow-lg border border-zinc-100">
        <img src="assets/blog1-header.png" class="w-full object-cover" alt="Optimal Battery Selection Guide">
      </div>

      <p class="text-lg text-zinc-600 mb-8 leading-relaxed">
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
    title: "Eid Travel Readiness: Complete Battery Checklist",
    category: "Travel",
    content: `
      <p class="text-gray-600 mb-4">Eid-ul-Azha is a time for joy, but unexpected battery failure can ruin the trip. Follow these simple steps before hitting the highway:</p>
      <ul class="list-disc pl-5 space-y-2 text-gray-600">
        <li>Clean terminals to ensure optimal power flow.</li>
        <li>Check voltage (12.4V and above is ideal).</li>
        <li>Inspect for swelling or fluid leaks.</li>
      </ul>
      <p class="mt-4 font-bold text-[#cc001b]">Alaska Tip: Graphite batteries recharge 2x faster during short breaks.</p>`,
  },
  "power-saving": {
    title: "5 Secrets to Make Your Car Battery Last Longer",
    category: "Maintenance",
    content: `
      <p class="text-gray-600 mb-4">Heat speeds up internal corrosion. Most drivers don't realize heat is more dangerous than cold. Here is how to fight it:</p>
      <ol class="list-decimal pl-5 space-y-2 text-gray-600">
        <li>Keep terminals corrosion-free with baking soda and water.</li>
        <li>Take a 30-minute highway drive weekly to fully recharge.</li>
        <li>Turn off non-essentials like seat warmers during short grocery runs.</li>
        <li>Always park in shaded areas.</li>
        <li>Check voltage during every oil change.</li>
      </ol>`,
  },
  "storage-tips": {
    title: "Charging & Storing Your Battery for Maximum Lifespan",
    category: "Technical",
    content: `
      <p class="text-gray-600 mb-4">Neglect can turn a reliable power source into a costly paperweight. Learn the proper way to store:</p>
      <ul class="list-disc pl-5 space-y-2 text-gray-600">
        <li><strong>Location:</strong> Choose a cool, dry spot. Never store directly on concrete; use a wooden pallet.</li>
        <li><strong>Disconnect:</strong> For long-term storage, remove the terminals to avoid 'parasitic drain'.</li>
        <li><strong>Voltage:</strong> Check every 8-12 weeks. If it dips below 12.4V, recharge immediately.</li>
      </ul>`,
  },
  "recycling-guide": {
    title: "Battery Recycling: Powering a Greener Future",
    category: "Eco-Friendly",
    content: `
      <p class="text-gray-600 mb-4">Did you know that 90% of an Alaska Battery is recyclable? Recycling saves enough energy to power a home for three hours.</p>
      <h3 class="text-xl font-bold uppercase mt-6 mb-2">How it works:</h3>
      <p class="text-gray-600 mb-2">Return used batteries to Alaska dealers. Lead is purified for new grids, and plastic becomes pellets for new cases.</p>
      <p class="font-bold text-[#cc001b]">Benefit: Get exclusive discounts on new purchases when you recycle your old unit!</p>`,
  },
  "summer-survival": {
    title: "Beat the Heat: Battery Survival Guide for Pakistan",
    category: "Survival",
    content: `
      <p class="text-gray-600 mb-4">In cities like Multan and Karachi, 45°C+ temperatures kill batteries by evaporating electrolyte. Traditional batteries aren't enough.</p>
      <p class="text-gray-600 mb-4">Alaska's <strong>Graphite Technology</strong> reduces internal resistance, leading to 50% longer life in punishing Pakistani environments.</p>
      <p class="font-bold">Advice: Check your battery monthly during May-August.</p>`,
  },
};

// Open Modal
function openBlogModal(id) {
  const modal = document.getElementById("blog-modal");
  const body = document.getElementById("modal-body");
  const data = blogData[id];

  if (!data) return;

  body.innerHTML = `
    <span class="text-[#cc001b] font-bold uppercase tracking-widest text-xs">${data.category}</span>
    <h1 class="text-4xl font-black uppercase mt-2 mb-8">${data.title}</h1>
    <div class="prose prose-zinc lg:prose-lg max-w-none">
      ${data.content}
    </div>
  `;

  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("active"), 10);
  document.body.style.overflow = "hidden"; // Lock background scroll
}

// Close Modal
function closeBlogModal() {
  const modal = document.getElementById("blog-modal");
  modal.classList.remove("active");
  setTimeout(() => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }, 300);
}

// Close on click outside (Overlay)
document.getElementById("modal-overlay").addEventListener("click", closeBlogModal);

// Horizontal Scroll logic
function scrollBlogs(distance) {
  const container = document.getElementById("blog-scroll-container");
  container.scrollBy({ left: distance, behavior: "smooth" });
}
// Logic for Blog Search

// 1. SEARCH LOGIC
function filterBlogs() {
  const input = document.getElementById("blog-search");
  const filter = input.value.toLowerCase();
  const container = document.getElementById("blog-scroll-container");
  const cards = container.getElementsByClassName("blog-item");

  // Disable loop snapping while searching so results don't "jump"
  container.style.scrollSnapType = filter ? "none" : "x mandatory";

  for (let i = 0; i < cards.length; i++) {
    const title = cards[i].querySelector("h4").innerText.toLowerCase();
    const category = cards[i].querySelector("p").innerText.toLowerCase();

    if (title.includes(filter) || category.includes(filter)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
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
  const itemWidth = container.querySelector(".blog-item").offsetWidth + 20;
  const move = window.innerWidth > 1024 ? itemWidth * 3 : itemWidth;
  container.scrollBy({ left: move * dir, behavior: "smooth" });
}

// TODO: Replace with your actual Hostinger PHP script URL
const EMAIL_API_URL = "https://yourdomain.com/send-email.php";

function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
  document.getElementById("successModal").classList.remove("flex");
}

document.getElementById("contactForm").addEventListener("submit", async function (event) {
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
      document.getElementById("contactForm").reset();
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

window.addEventListener("load", initBlogEngine);
