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
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">
        Summer in Pakistan is hard on batteries. High temperatures accelerate chemical reactions inside the cell, increasing corrosion and electrolyte evaporation which shortens battery life. Below are concise, actionable steps to protect your battery and keep your vehicle running through the hottest months.
      </p>

<<<<<<< HEAD
      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Why Heat Damages Batteries</h3>
      <p class="mb-4 text-zinc-600">Heat increases internal resistance and speeds up chemical breakdown. Over time this causes capacity loss, slower cranking, and a higher risk of sudden failure.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Top Summer Survival Tips</h3>
      <ul class="space-y-4 mb-8">
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Park Smart</strong>
          Whenever possible, park in shade or a covered area to limit direct sun exposure and reduce temperature-related stress.
        </li>
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Keep Terminals Clean</strong>
          Corrosion increases resistance and heat. Clean terminals and clamps monthly and use a corrosion inhibitor spray when needed.
        </li>
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Avoid Deep Discharge</strong>
          Repeated deep discharge shortens life. Use accessories sparingly when the engine is off and recharge promptly after heavy use.
        </li>
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Check Charging System</strong>
          Overcharging and voltage spikes also damage batteries. Have your alternator and regulator checked during service visits.
=======
      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">1) Identify Your Application</h3>
      <p class="mb-4 font-bold text-zinc-800">Start by clarifying the usage:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="p-6 bg-zinc-50 rounded-xl">
          <h4 class="font-bold text-[#c00d1e] uppercase mb-2 text-sm tracking-widest">Automotive (cars/bikes/SUVs)</h4>
          <p class="text-xs leading-normal text-zinc-500">Requires reliable starting power, vibration resistance, correct size, and terminal layout.</p>
        </div>
        <div class="p-6 bg-zinc-50 rounded-xl">
          <h4 class="font-bold text-[#c00d1e] uppercase mb-2 text-sm tracking-widest">Solar & Energy-Storage</h4>
          <p class="text-xs leading-normal text-zinc-500">Needs deep-cycle capability, suitable capacity for your load, and backup duration.</p>
        </div>
        <div class="p-6 bg-zinc-50 rounded-xl">
          <h4 class="font-bold text-[#c00d1e] uppercase mb-2 text-sm tracking-widest">Industrial/Commercial</h4>
          <p class="text-xs leading-normal text-zinc-500">Often demands high capacity, long life, robust construction, and maybe special configurations.</p>
        </div>
      </div>
      <p class="mb-10 italic text-sm text-zinc-400">Alaska Batteries divides its catalog into precisely these three categories.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">2) Understand Battery Technologies & Types</h3>
      <p class="mb-4">Different battery types suit different needs:</p>
      <ul class="space-y-4 mb-10">
        <li class="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
          <strong class="text-[#c00d1e] uppercase block mb-1">Automotive batteries</strong> 
          in Alaska use advanced technology <strong>graphite lead acid</strong> batteries for longer life and higher heat tolerance.
        </li>
        <li class="border border-zinc-200 p-6 rounded-2xl">
          <strong class="text-[#c00d1e] uppercase block mb-1">Deep-cycle batteries</strong> 
          (for solar/storage) differ from standard starter batteries: they handle repeated discharges and recharges.
>>>>>>> 91645f354ffc65bd499a2d617989a1c6054cc5d7
        </li>
      </ul>

<<<<<<< HEAD
      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Monthly Maintenance Checklist</h3>
      <ul class="list-inside list-disc mb-8 text-zinc-600">
        <li>Measure open-circuit voltage (12.4V+ for healthy 12V lead-acid batteries).</li>
        <li>Inspect for swelling, fluid leaks, or damaged casing.</li>
        <li>Tighten terminal clamps and remove any white/green corrosion deposits.</li>
        <li>Confirm manufacturing or charge date — older batteries may need replacement before summer peaks.</li>
      </ul>

      <div class="p-4 bg-zinc-50 text-zinc-700 rounded-2xl mb-8 shadow-sm border-t-4 border-[#cc001b]">
        <h4 class="text-lg font-black uppercase mb-2">Pro Tip</h4>
        <p class="text-sm">Choose batteries built for high-temperature environments. Alaska’s Graphite technology reduces internal heat and improves charge acceptance under heavy use.</p>
      </div>

      <p class="text-zinc-600 leading-relaxed mb-6">If you depend on your vehicle daily, a small preventive effort now will avoid breakdowns and costly replacements later. When in doubt, have an authorized dealer test your battery and charging system.</p>

      <div class="text-center">
        <a href="products.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">
          View Summer Ready Batteries
=======
      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">3. Check Capacity, Size & Compatibility</h3>
      <div class="flex flex-col md:flex-row gap-8 mb-10 items-center">
        <div class="flex-1 space-y-4 text-sm text-zinc-600">
          <p><strong>For vehicles:</strong> Confirm battery matches your vehicle’s voltage, group size, Ah rating, terminal layout (polarity).</p>
          <p><strong>For solar/storage:</strong> Calculate your system’s load (in watts), backup time, and match to a battery bank (Ah rating × voltage).</p>
          <p class="bg-[#c00d1e]/5 p-3 border-l-2 border-[#c00d1e] italic text-zinc-800">
            Example: If you need a 4-hour backup at a given load, you’ll need a battery with sufficient capacity (e.g., larger Ah).
          </p>
        </div>
        <img src="assets/Graphite-image01.png" class="w-full md:w-1/3 rounded-xl shadow-md">
      </div>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">4. Consider Local Conditions & Brand Reliability</h3>
      <p class="mb-6 leading-relaxed">In Pakistan’s climate (high temperatures, voltage fluctuations), battery quality and brand matter:</p>
      <div class="bg-zinc-50 p-6 rounded-2xl mb-10">
         <p class="mb-4 font-bold tracking-tight text-zinc-900">Alaska Batteries emphasizes <span class="text-[#c00d1e]">“graphite technology”</span> for better heat resistance and longer life.</p>
         <p class="text-sm">Choose trusted brands, good warranty, and check the manufacturing date.</p>
      </div>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">5. Match the Right Product from Alaska’s Portfolio</h3>
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

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">6. Maintenance & Care</h3>
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
      <p class="text-sm italic text-[#c00d1e] mb-10 text-center">Proper usage enhances lifespan, which Alaska Batteries addresses via their “Battery Life” resources.</p>

      <div class="p-8 bg-zinc-900 text-white rounded-3xl mb-10 shadow-2xl border-t-4 border-[#c00d1e]">
        <h3 class="text-xl font-black uppercase mb-6 italic">Final Checklist Before Purchase</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#c00d1e]"></i> Confirm correct size, voltage, and terminal orientation.</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#c00d1e]"></i> Confirm capacity matches your requirement (vehicle start power or solar load).</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#c00d1e]"></i> Ensure the product listing is from Alaska and it’s labeled properly.</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#c00d1e]"></i> Check for warranty and manufacturing date.</li>
          <li class="flex items-center gap-3"><i class="fa-solid fa-square-check text-[#c00d1e]"></i> Ask about compatibility if unclear.</li>
        </ul>
      </div>

      <p class="text-zinc-600 leading-relaxed mb-6">
        Selecting the right battery is a process, but when you align your requirement (vehicle, solar, or industrial) with the correct technology, capacity, and trusted brand like Alaska Batteries, you’ll get reliable, long-lasting performance tailored to Pakistan’s conditions.
      </p>
      
      <div class="text-center">
        <a href="products.html" class="inline-block bg-[#c00d1e] text-white px-8 py-4 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">
          Visit Products Page
>>>>>>> 91645f354ffc65bd499a2d617989a1c6054cc5d7
        </a>
      </div>
    `,
  },
  "eid-checklist": {
    title: "Don't Let Eid Travel Leave You Stranded - Complete Battery Readiness Checklist",
    category: "Travel",
    image: "assets/vault/blogs/eid-blog-2.png",
    content: `
      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">Start your Eid journey with a few simple steps:</h3>
      
      <div class="bg-zinc-50 p-8 rounded-2xl mb-10 border-l-4 border-[#c00d1e]">
        <p class="mb-4 text-lg font-bold text-zinc-900">Pre-Travel Battery Checklist:</p>
        <ul class="space-y-3 text-base text-zinc-700">
          <li class="flex items-start gap-3">
            <span class="text-[#c00d1e] font-bold text-xl">1.</span>
            <span><strong>Clean your battery terminals</strong> to ensure optimal power flow</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#c00d1e] font-bold text-xl">2.</span>
            <span><strong>Check voltage</strong> (12.4V and above is ideal)</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="text-[#c00d1e] font-bold text-xl">3.</span>
            <span><strong>Inspect for physical wear or damage</strong> like swelling, fluid leaks, or damaged casing</span>
          </li>
        </ul>
      </div>

      <h4 class="text-xl font-black uppercase text-[#c00d1e] mb-4">Here's where Alaska Graphite Batteries take the lead.</h4>
      
      <p class="text-base md:text-lg text-zinc-700 mb-8 leading-relaxed">
        Built for high demand and long routes, they <strong class="text-[#c00d1e]">recharge 2x faster</strong> than conventional batteries, letting you regain lost charge quickly during short breaks at petrol pumps or rest stops. The added heat resistance and durability ensure you're ready for every kind of terrain — from scorching highways to high-altitude chill.
      </p>

<<<<<<< HEAD
      <div class="bg-zinc-50 text-zinc-700 p-8 rounded-3xl mb-10 shadow-sm border-t-4 border-[#cc001b]">
=======
      <div class="bg-zinc-900 text-white p-8 rounded-3xl mb-10 shadow-2xl border-t-4 border-[#c00d1e]">
>>>>>>> 91645f354ffc65bd499a2d617989a1c6054cc5d7
        <h4 class="text-xl font-black uppercase mb-4 italic">A reliable battery means no delays, no compromises,</h4>
        <p class="text-base leading-relaxed mb-6">
          and no ruining what should be a joyful experience. By the end of the day, it is the <strong class="text-[#c00d1e]">peace of mind</strong> you need for a stress-free Eid journey.
        </p>
        <p class="text-sm text-zinc-600">
          Carry a jump starter kit and a power bank for extra security, especially if traveling with kids or elders.
        </p>
      </div>

      <div class="text-center mb-10">
        <p class="text-xl md:text-2xl font-black uppercase text-zinc-900 mb-4">
          This Eid, don't just prepare your car,<br>
          <span class="text-[#c00d1e]">prepare your battery.</span>
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
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Tired of unexpected battery failures? Follow these expert-backed tips to extend your car battery life and ensure a smooth, worry-free drive every time. Your car battery is the unsung hero of your vehicle — a little care goes a long way.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Keep Terminals Corrosion-Free</h3>
      <p class="mb-4 text-zinc-600">A crusty buildup of white or green residue weakens connections and forces your battery to work harder. Mix a tablespoon of baking soda with warm water, scrub terminals gently with an old toothbrush, then rinse and dry. Apply a corrosion inhibitor to protect clamps.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Avoid Micro-Draining from Short Trips</h3>
      <p class="mb-4 text-zinc-600">Short runs don't give the alternator enough time to fully recharge. Take a 20–30 minute highway drive weekly to top up the charge, and turn off non-essential accessories during short drives to reduce strain.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Protect Against Extreme Weather</h3>
      <p class="mb-4 text-zinc-600">Heat accelerates fluid evaporation and capacity loss; cold slows chemical reactions and makes starts sluggish. Park in shade, use sunshades, and consider a battery insulator in cold regions. Alaska batteries are engineered for these extremes, but extra precautions help.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Watch for Parasitic Power Drain</h3>
      <p class="mb-4 text-zinc-600">Modern vehicles have electronics that draw power even when off. Make a habit of unplugging chargers, turning off dashcams when parked, and checking interior lights before locking the car.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Routine Checkups Matter</h3>
      <ul class="list-inside list-disc mb-8 text-zinc-600">
        <li>Measure open-circuit voltage (12.4V+ for healthy 12V lead-acid batteries).</li>
        <li>Inspect for swelling, leaks, or damaged casing.</li>
        <li>Confirm terminals are tight and free from corrosion.</li>
        <li>Have the alternator and voltage regulator tested to avoid over/under-charging.</li>
      </ul>

      <div class="p-4 bg-zinc-50 text-zinc-700 rounded-2xl mb-8 shadow-sm border-t-4 border-[#cc001b]">
        <h4 class="text-lg font-black uppercase mb-2">Pro Tip</h4>
        <p class="text-sm">Choose batteries built for temperature extremes. Alaska’s Graphite technology improves heat handling and charge acceptance under heavy use.</p>
      </div>

      <p class="text-zinc-600 leading-relaxed mb-6">A small preventive effort today avoids roadside breakdowns and costly replacements tomorrow. When unsure, have an authorized dealer test your battery and charging system.</p>

      <div class="text-center">
        <a href="products.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">Explore Battery Options</a>
      </div>
    `,
  },
  "ebike-accessories": {
    title: "Beat the Heat | Battery Survival Guide for Pakistani Summer Season",
    category: "Summer Guide",
    image: "assets/vault/blogs/storing-blog-4.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Summer heat in Pakistan is one of the fastest ways to shorten a battery's life. High temperatures speed up internal chemical reactions and increase corrosion — but with a few practical steps you can protect your battery and avoid unexpected failures.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Quick Heat-Proof Checklist</h3>
      <ul class="space-y-4 mb-8">
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Park in Shade</strong>
          Direct sun dramatically raises under-hood temperatures. Whenever possible, park under shade or indoors.
        </li>
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Keep It Charged</strong>
          Heat increases self-discharge. Maintain a full charge, especially if vehicle sits for long periods, and avoid leaving electronics plugged in while parked.
        </li>
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Inspect Regularly</strong>
          Look for swelling, cracks, fluid leaks or loose terminals. Clean corrosion with baking soda solution and protect clamps with anti-corrosion spray.
        </li>
        <li class="p-4 bg-zinc-50 rounded-lg">
          <strong class="block text-sm text-[#cc001b] uppercase tracking-widest mb-1">Check Charging System</strong>
          Overheating alternators and voltage spikes damage batteries. Have your charging system tested if you notice unusual heat or slow cranking.
        </li>
      </ul>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Monthly Summer Maintenance</h3>
      <ul class="list-inside list-disc mb-8 text-zinc-600">
        <li>Measure resting voltage (12.4V+ indicates a healthy 12V lead-acid battery).</li>
        <li>Ensure terminals are tight and free from white/green corrosion.</li>
        <li>For serviceable batteries, check electrolyte levels and top with distilled water when needed.</li>
        <li>Replace batteries older than 3–4 years or those showing repeated capacity loss.</li>
      </ul>

      <div class="p-4 bg-zinc-50 text-zinc-700 rounded-2xl mb-8 shadow-sm border-t-4 border-[#cc001b]">
        <h4 class="text-lg font-black uppercase mb-2">Pro Tip</h4>
        <p class="text-sm">Choose batteries designed for high-temperature performance. Alaska Graphite batteries offer improved heat tolerance and faster charge acceptance under heavy use.</p>
      </div>

      <p class="text-zinc-600 leading-relaxed mb-6">Little preventive steps today will prevent roadside trouble and extend battery life through the peak summer months. When in doubt, have an authorized dealer run a load and charging test.</p>

      <div class="text-center">
        <a href="products.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">Find Heat-Ready Batteries</a>
      </div>
    `,
  },
  "ebike-repairs": {
    title: "The Right Way to Charge & Store Your Battery for Maximum Lifespan",
    category: "Battery Care",
    image: "assets/vault/blogs/recycle-blog-5.png",
    content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Avoid battery degradation and early failures! Learn how to properly charge and store your battery to keep it in top condition for years.</p>

      <p class="mb-4 text-zinc-600">Whether you are storing a vintage car for months or keeping a spare battery for emergencies, proper charging and storage are the keys to longevity. Start with a full charge; batteries left partially charged risk sulfation, where lead sulfate crystals harden and cripple their ability to hold a charge.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Storage location is critical</h3>
      <p class="mb-4 text-zinc-600">Heat speeds up chemical decay, and cold can freeze electrolytes in traditional lead-acid batteries. Choose a cool, dry spot like a garage shelf or climate-controlled room. Never store batteries directly on concrete; instead elevate them on a wooden pallet or rubber mat to avoid temperature swings.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">For vehicles in long-term storage, disconnect the battery entirely</h3>
      <p class="mb-4 text-zinc-600">Modern cars have parasitic drains from clocks, alarms, and computers that sip power 24/7. A disconnected battery loses just 1–2% charge monthly, while a connected one can drain 5–10%.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Check stored batteries every 8–12 weeks</h3>
      <p class="mb-4 text-zinc-600">Lead-acid batteries should stay above 12.4 volts; if they dip below, recharge immediately. When reusing a stored battery, test its voltage first — a reading below 12 volts means it needs a slow, steady recharge. Avoid rushing with a high-amp charger which can warp plates or cause leaks.</p>

      <div class="p-4 bg-zinc-50 text-zinc-700 rounded-2xl mb-8 shadow-sm border-t-4 border-[#cc001b]">
        <h4 class="text-lg font-black uppercase mb-2">Pro Tip</h4>
        <p class="text-sm">Choose batteries built for temperature stability. Alaska Batteries' products are designed for durability and reliable charge acceptance during storage and reuse.</p>
      </div>

      <p class="text-zinc-600 leading-relaxed mb-6">With simple, scheduled checks and correct storage practices, your battery will remain ready when you need it. If unsure, have an authorized dealer test and maintain your battery to avoid premature failure.</p>

      <div class="text-center">
        <a href="products.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">See Battery Care Products</a>
      </div>
    `,
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
          <span class="inline-block text-[#c00d1e] font-bold uppercase tracking-widest text-xs px-3 py-1 bg-red-50 rounded-full">${data.category}</span>
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
