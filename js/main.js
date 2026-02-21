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

  // Partner count: use Odometer (odometer.js) and trigger on enter
  (function () {
    const el = document.getElementById("partner-count");
    const wrap = document.querySelector(".partner-counter");
    if (!el || !wrap || typeof Odometer === "undefined") return;

    const target = parseInt(wrap.dataset.target || "0", 10);
    const od = new Odometer({ el: el, value: 0, format: "(,ddd)" });

    let hasRun = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (hasRun) return;
        if (entries.some((e) => e.isIntersecting)) {
          hasRun = true;
          od.update(target);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    obs.observe(wrap);
  })();

  window.scrollCertCarousel = scrollCertCarousel;

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
      image: "",
      content: `
        <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">
          Summer in Pakistan is hard on batteries. High temperatures accelerate chemical reactions inside the cell, increasing corrosion and electrolyte evaporation which shortens battery life. Below are concise, actionable steps to protect your battery and keep your vehicle running through the hottest months.
        </p>

 
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
          <h4 class="font-bold text-[#c00d1e] uppercase mb-2 text-sm tracking-widest">Industrial/<br>Commercial</h4>
          <p class="text-xs leading-normal text-zinc-500">Often demands high capacity, long life, robust construction, and maybe special configurations.</p>
        </div>
      </div>
      <p class="mb-10 italic text-sm text-zinc-400">Alaska Batteries divides its catalog into precisely these three categories.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-6 italic border-l-4 border-[#c00d1e] pl-4">2) Understand Battery Technologies & Types</h3>
      <p class="mb-4">Different battery types suit different needs:</p>
      <ul class="space-y-4 mb-10">
        <li class="bg-zinc-100 text-zinc-800 p-6 rounded-2xl shadow-sm">
          <strong class="text-[#c00d1e] uppercase block mb-1">Automotive batteries</strong>
          in Alaska use advanced technology <strong>graphite lead acid</strong> batteries for longer life and higher heat tolerance.
        </li>
        <li class="border border-zinc-200 p-6 rounded-2xl">
          <strong class="text-[#c00d1e] uppercase block mb-1">Deep-cycle batteries</strong> 
          (for solar/storage) differ from standard starter batteries: they handle repeated discharges and recharges.
 
        </li>
      </ul>

 
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
        <a href="dry-charge.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">
          View Summer Ready Batteries
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

      <div class="bg-zinc-50 text-zinc-700 p-8 rounded-3xl mb-10 shadow-sm border-t-4 border-[#cc001b]">
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
        <a href="dry-charge.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">Explore Battery Options</a>
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
        <a href="dry-charge.html" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">Find Heat Ready Batteries</a>
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
        <a href="vault.html#faqs" style="color:#ffffff;text-decoration:none;" class="inline-block bg-[#cc001b] text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:scale-105 transition-transform">Read for Battery Care</a>
      </div>
    `,
    },
    "ebike-charging": {
      title: "Battery Recycling: Turning Old Power into New Possibilities",
      category: "E-Bike Tips",
      image: "assets/vault/blogs/summer-blog-6.png",
      content: `
      <p class="text-base md:text-lg text-zinc-700 mb-6 leading-relaxed">Did you know that old batteries can be repurposed? Discover the battery recycling process and why it is crucial for sustainability and a cleaner planet.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">How recycling starts</h3>
      <p class="mb-4 text-zinc-600">The process starts at certified drop-off points, such as Alaska’s nationwide dealer network. Once collected, batteries are sorted by type. Lead-acid batteries are crushed and the lead plates are melted, purified, and molded into new grids. Plastic casings become pellets for new cases, and sulfuric acid is filtered or converted into useful industrial chemicals. Recycling one car battery can save enough energy to power a home for several hours.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">Why this matters</h3>
      <p class="mb-4 text-zinc-600">Tossing batteries into landfills poisons ecosystems: lead can leach into groundwater and lithium-ion fires release toxic fumes. Recycling prevents environmental contamination and recovers valuable materials—improving the sustainability of battery production.</p>

      <h3 class="text-2xl font-black uppercase text-zinc-900 mb-4 italic border-l-4 border-[#cc001b] pl-4">What you can do</h3>
      <p class="mb-4 text-zinc-600">Return used batteries to Alaska dealers or partner centers. Many programs offer incentives—like discounts on new purchases—for recycled units. By returning batteries for recycling you help close the loop and reduce the environmental cost of energy storage.</p>

      <div class="p-4 bg-zinc-50 text-zinc-700 rounded-2xl mb-8 shadow-sm border-t-4 border-[#cc001b]">
        <h4 class="text-lg font-black uppercase mb-2">Takeaway</h4>
        <p class="text-sm">Sustainability is built one returned battery at a time. Recycling recovers materials, reduces pollution, and lowers the energy footprint of future batteries.</p>
      </div>
    `,
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
        <div class="space-y-3">
          <span class="inline-block category-badge text-zinc-900 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-zinc-100 rounded-full">${data.category}</span>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-black uppercase leading-tight text-zinc-900">${data.title}</h1>
        </div>
        <div class="prose prose-zinc prose-sm md:prose-base lg:prose-lg max-w-none blog-content">
          ${data.content}
        </div>
      </div>
    `;

      // Add click listener to all buttons and links inside the blog content
      const buttons = body.querySelectorAll("button, a");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          closeBlogModal();
        });
      });
    });

    modal.classList.remove("hidden");
    // Scroll modal into view if not fully visible (mobile especially)
    setTimeout(() => {
      modal.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 10);
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

  // Expose modal functions to global scope for inline handlers
  window.openBlogModal = openBlogModal;
  window.closeBlogModal = closeBlogModal;

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

  // Certifications carousel (about.html, all screens)
  const certifications = [
    {
      src: "assets/gallery/certificates/ISO-9001-2015.jpeg",
      title: "ISO 9001:2015",
      desc: "ISO 9001:2015 Quality Management",
    },
    {
      src: "assets/gallery/certificates/ISO-14001-2015.jpeg",
      title: "ISO 14001:2015",
      desc: "Environmental Safety Certified",
    },
    {
      src: "assets/gallery/certificates/ISO-45001-2018.jpeg",
      title: "ISO 45001:2018",
      desc: "Occupational Health and Safety Management",
    },
    {
      src: "assets/gallery/certificates/Fire-Safety.jpeg",
      title: "Fire Safety",
      desc: "Fire Safety Certified",
    },
  ];
  let certIndex = 0;

  // CLOSE the main DOMContentLoaded block
});

// Certifications carousel (about.html, all screens) - GLOBAL SCOPE
const certifications = [
  {
    src: "assets/gallery/certificates/ISO-9001-2015.jpeg",
    title: "ISO 9001:2015 Quality Management",
    desc: "ISO 9001:2015 Quality Management",
  },
  {
    src: "assets/gallery/certificates/ISO-14001-2015.jpeg",
    title: "ISO 14001:2015 Environmental Safety Certified",
    desc: "Environmental Safety Certified",
  },
  {
    src: "assets/gallery/certificates/ISO-45001-2018.jpeg",
    title: "ISO 45001:2018 Occupational Health and Safety Management",
    desc: "Occupational Health and Safety Management",
  },
  {
    src: "assets/gallery/certificates/Fire-Safety.jpeg",
    title: "Fire Safety Certified",
    desc: "Fire Safety Certified",
  },
];
let certIndex = 0;

function updateCertCarousel() {
  const left = document.getElementById("cert-left-img");
  const center = document.getElementById("cert-center-img");
  const right = document.getElementById("cert-right-img");
  if (!left || !center || !right) return;
  const n = certifications.length;
  const leftIdx = (certIndex - 1 + n) % n;
  const rightIdx = (certIndex + 1) % n;
  left.src = certifications[leftIdx].src;
  left.alt = certifications[leftIdx].title;
  center.src = certifications[certIndex].src;
  center.alt = certifications[certIndex].title;
  right.src = certifications[rightIdx].src;
  right.alt = certifications[rightIdx].title;
  // Dots
  const dots = document.getElementById("cert-dots");
  if (dots) {
    dots.innerHTML = certifications.map((_, i) => `<span class="inline-block w-2 h-2 rounded-full mx-1 ${i === certIndex ? "bg-[#c00d1e]" : "bg-gray-300"}"></span>`).join("");
  }
}
function scrollCertCarousel(dir) {
  certIndex = (certIndex + dir + certifications.length) % certifications.length;
  updateCertCarousel();
}
function certCarouselInit() {
  updateCertCarousel();
  window.addEventListener("resize", updateCertCarousel);

  // Touch scroll sync for mobile
  const certScrollContainer = document.getElementById("cert-scroll-container");
  if (certScrollContainer) {
    certScrollContainer.addEventListener("scroll", function () {
      // Find which image is most centered
      const children = [document.getElementById("cert-left"), document.getElementById("cert-center"), document.getElementById("cert-right")];
      let minDist = Infinity;
      let activeIdx = 1; // default to center
      const containerRect = certScrollContainer.getBoundingClientRect();
      children.forEach((child, idx) => {
        if (!child) return;
        const rect = child.getBoundingClientRect();
        // Distance from center of container
        const dist = Math.abs((rect.left + rect.right) / 2 - (containerRect.left + containerRect.right) / 2);
        if (dist < minDist) {
          minDist = dist;
          activeIdx = idx;
        }
      });
      certIndex = (certIndex + activeIdx - 1 + certifications.length) % certifications.length;
      updateCertCarousel();
    });
  }
}
if (document.getElementById("cert-center-img")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", certCarouselInit);
  } else {
    certCarouselInit();
  }
}
window.scrollCertCarousel = scrollCertCarousel;
