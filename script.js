/* =====================================================================
   1. CONFIG — THE ONLY FILE YOU EDIT FOR A NEW CLIENT
   Every piece of client-specific content lives in this one object, grouped
   by section. Images: drop files into assets/images/ using the filenames
   given to IMG() below. The only thing NOT here is 6 lines of SEO/social
   meta tags at the top of gym.html (title, description, canonical, og:*) —
   those must stay static HTML for search engines and link previews, which
   don't run JavaScript. See README.md for the full walkthrough.
   ===================================================================== */
const IMG = (file, alt, pos = "50% 50%") => ({ src: "assets/images/" + file, alt, pos }); // pos = focal point for cropping
const CONFIG = {

  // ---- business: identity, contact details, location, hours ----------
  business: {
    name: "Ironcore Fitness",
    tagline: "Premium Strength & Performance Gym",
    url: "https://www.ironcorefitness.example",   // no trailing slash
    phone: "+919000000000", phoneDisplay: "+91 90000 00000",
    whatsapp: "919000000000",                       // digits only, with country code
    whatsappMessage: "Hi, I'm interested in the free trial at Ironcore Fitness.",
    email: "hello@ironcorefitness.example",
    address: { street: "12, Kammanahalli Main Road", area: "Kammanahalli", city: "Bengaluru", region: "Karnataka", zip: "560084", country: "IN" },
    geo: null,                                      // e.g. { lat: 13.0158, lng: 77.6412 } improves local SEO
    mapQuery: "Kammanahalli Main Road, Bengaluru",
    instagram: "https://www.instagram.com/yourgym", instagramHandle: "@ironcorefitness",
    hours: [
      { label: "Mon-Sat", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "05:30", closes: "22:00", text: "5:30 AM - 10:00 PM" },
      { label: "Sunday", days: ["Sunday"], opens: "07:00", closes: "13:00", text: "7:00 AM - 1:00 PM" }
    ]
  },

  // ---- seo: synced at runtime into <title> and meta description ------
  // (the 6 tags in gym.html's <head> are the source of truth for crawlers
  // and social-link previews and should be kept in sync with these by hand)
  seo: {
    description: "Ironcore Fitness in Kammanahalli, Bengaluru: strength training, HIIT, personal coaching and flexible memberships. Book your free trial or WhatsApp us today."
  },

  // ---- colors: drives every CSS custom property in style.css ---------
  colors: { accent: "#f2b632", "accent-ink": "#161105", bg: "#0d0e10", surface: "#16181c", text: "#f1efe9", muted: "#9aa0a8" },
  currency: "₹", priceRange: "₹₹",

  /* Booking form. mode "whatsapp": opens WhatsApp with the details (nothing is stored).
     mode "endpoint": POSTs the fields to `endpoint`. Works with Formspree (https://formspree.io/f/xxxx),
     Netlify Forms (endpoint "/"), or a Google Apps Script / custom URL that accepts form fields. */
  form: {
    mode: "whatsapp", endpoint: "",
    interests: ["Strength training", "HIIT & conditioning", "Personal training", "Fat loss programme", "Mobility & yoga", "Just exploring"],
    times: ["Morning (5:30-9 AM)", "Midday (9 AM-4 PM)", "Evening (4-10 PM)", "Sunday morning"],
    phoneRegex: "^[6-9]\\d{9}$"                   // Indian mobile. Change for other countries.
  },

  /* TRUST: demo figures. Replace with real numbers before launch. */
  trust: { demo: true, rating: 4.9, reviews: 480, source: "Google", members: 3500, years: 10, trainers: 12, publishRatingSchema: false },
  reviewsUrl: "",                                 // link to your Google reviews page

  // ---- hero: top-of-page banner ---------------------------------------
  // image filename must match the <link rel="preload"> href in gym.html
  // (defaults to hero.jpg for both — keep them in sync if you rename it)
  hero: { image: IMG("hero.jpg", "Athlete performing a heavy barbell lift at Ironcore Fitness", "70% 40%"), title: ["Build real", "strength"], sub: "Serious equipment, certified coaches and a community that shows up. Your first session is free." },

  // ---- about: the "why us" section with photo, copy and bullet points --
  about: { image: IMG("about.jpg", "Ironcore Fitness gym floor with squat racks and lifting platforms", "50% 60%"), title: "A gym built for progress",
    text: ["Since 2016 Ironcore has helped Bengaluru lift heavier, move better and stay consistent. Our 9,000 sq ft floor pairs serious equipment with coaches who know your name and your numbers.", "No pushy sales and no crowded corners. Just a clean, well-run gym built around results."],
    points: ["Certified coaches on the floor every shift", "Olympic platforms, racks and turf zone", "Showers, lockers and recovery area"] },

  // ---- programs: the class/programme cards ----------------------------
  programs: [
    { title: "Strength training", text: "Progressive barbell and machine programmes with coach-led technique.", tag: "All levels", image: IMG("class-strength.jpg", "Member squatting with a barbell while a coach spots", "50% 35%") },
    { title: "HIIT & conditioning", text: "45-minute group sessions that build stamina and burn fat.", tag: "Group class", image: IMG("class-hiit.jpg", "Group HIIT class using battle ropes", "50% 40%") },
    { title: "Personal training", text: "One-to-one plans built around your goal, schedule and injuries.", tag: "By appointment", image: IMG("class-pt.jpg", "Trainer guiding a client through an exercise", "40% 40%") },
    { title: "Fat loss programme", text: "Training and nutrition guidance with weekly check-ins.", tag: "12 weeks", image: IMG("class-fatloss.jpg", "Athlete pushing a weighted sled", "50% 50%") },
    { title: "Mobility & yoga", text: "Restore range of motion and recover between heavy weeks.", tag: "Morning & evening", image: IMG("class-mobility.jpg", "Member stretching on a mat", "50% 50%") },
    { title: "Functional fitness", text: "Kettlebells, sleds and bodyweight circuits for real-world strength.", tag: "Group class", image: IMG("class-functional.jpg", "Kettlebell workout circuit", "50% 45%") }
  ],

  // ---- trainers: the coaches grid -------------------------------------
  trainers: [
    { name: "Arjun Mehta", role: "Head coach", specialty: "Strength & powerlifting", image: IMG("trainer-1.jpg", "Portrait of head coach Arjun Mehta", "50% 25%") },
    { name: "Priya Nair", role: "Conditioning coach", specialty: "HIIT & fat loss", image: IMG("trainer-2.jpg", "Portrait of conditioning coach Priya Nair", "50% 25%") },
    { name: "Rohan Das", role: "Personal trainer", specialty: "Body recomposition", image: IMG("trainer-3.jpg", "Portrait of personal trainer Rohan Das", "50% 25%") },
    { name: "Sana Khan", role: "Mobility coach", specialty: "Yoga & rehab", image: IMG("trainer-4.jpg", "Portrait of mobility coach Sana Khan", "50% 25%") }
  ],

  // ---- plans: membership pricing cards --------------------------------
  plans: [
    { name: "Monthly", price: 2499, period: "/ month", features: ["Full gym access", "Free fitness assessment", "Locker & shower", "Cancel anytime"], cta: "Choose monthly" },
    { name: "Quarterly", price: 5999, period: "/ 3 months", popular: true, features: ["Everything in Monthly", "All group classes", "2 personal training sessions", "Diet consultation"], cta: "Choose quarterly" },
    { name: "Annual", price: 17999, period: "/ year", features: ["Everything in Quarterly", "5 guest passes", "Priority class booking", "Freeze up to 30 days"], cta: "Choose annual" }
  ],

  // ---- gallery: before/after result cards -----------------------------
  gallery: [ // Use real, consented member photos. Same pose and lighting before and after.
    { name: "Karthik, 29", result: "Lost 14 kg in 16 weeks", before: IMG("result-1-before.jpg", "Karthik before training", "50% 30%"), after: IMG("result-1-after.jpg", "Karthik after 16 weeks", "50% 30%") },
    { name: "Meera, 34", result: "Gained 6 kg lean muscle", before: IMG("result-2-before.jpg", "Meera before training", "50% 30%"), after: IMG("result-2-after.jpg", "Meera after training", "50% 30%") },
    { name: "Vikram, 41", result: "Lost 20 kg in 6 months", before: IMG("result-3-before.jpg", "Vikram before training", "50% 30%"), after: IMG("result-3-after.jpg", "Vikram after 6 months", "50% 30%") }
  ],

  // ---- testimonials: member quotes ------------------------------------
  testimonials: { demo: true, items: [ // DEMO: replace with real reviews (name, text, stars) from Google or WhatsApp
    { name: "Ananya S.", detail: "Member for 2 years", stars: 5, text: "The coaches actually correct your form. My deadlift has doubled and I have had no injuries." },
    { name: "Rahul V.", detail: "Member for 8 months", stars: 5, text: "Never overcrowded, always clean, and the 6 AM HIIT crew keeps me accountable." },
    { name: "Deepa K.", detail: "Personal training client", stars: 5, text: "My trainer built a plan around my knee recovery. I feel stronger than before the injury." }
  ] },

  // ---- faq: accordion questions ----------------------------------------
  faq: [
    { q: "Do you offer a free trial?", a: "Yes. Your first session is free and includes a short fitness assessment with a coach." },
    { q: "I am a beginner. Is that okay?", a: "Absolutely. Most members start as beginners. A coach will build a simple plan and teach you the basics." },
    { q: "Can I freeze or cancel my membership?", a: "Monthly plans cancel anytime. Quarterly and annual plans can be frozen for up to 30 days." },
    { q: "Are personal trainers included?", a: "Two sessions are included in the quarterly plan. Otherwise personal training is an add-on. Ask us for a quote." },
    { q: "When is it quietest?", a: "Weekdays 6-9 AM and 6-9 PM are busiest. Mid-morning and early afternoon are the quietest." }
  ]
};

/* =====================================================================
   2. APP CODE: no need to edit below this line
   ===================================================================== */
(() => {
  const C = CONFIG, BIZ = C.business, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement; root.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const a = BIZ.address, T = C.trust;
  const addr = `${a.street}, ${a.area}, ${a.city} ${a.zip}`;
  const B = { name: BIZ.name, tagline: BIZ.tagline, area: a.area, address: addr, phoneDisplay: BIZ.phoneDisplay, email: BIZ.email, instagramHandle: BIZ.instagramHandle,
    hours: BIZ.hours.map(h => `${h.label} ${h.text}`).join(", "), hoursShort: `${BIZ.hours[0].label} ${BIZ.hours[0].text.replace(":00", "")}` };
  const money = n => C.currency + n.toLocaleString("en-IN");
  const DUMB = '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M8 18v12M14 14v20M34 14v20M40 18v12M14 24h20"/></svg>';
  const pic = (im, label) => `<img src="${im.src}" alt="${im.alt}" loading="lazy" decoding="async" style="object-position:${im.pos}" data-ph="${label}">`;
  const stagger = (i, n) => `--d:${(i % n) * .08}s`;

  // Missing image => graceful placeholder (site never shows a broken icon)
  document.addEventListener("error", e => {
    const i = e.target; if (i.tagName !== "IMG" || !i.dataset.ph) return;
    if (i.id === "heroImg") return i.remove();
    i.outerHTML = `<div class="ph" role="img" aria-label="${i.alt}">${DUMB}<span>${i.dataset.ph}</span></div>`;
  }, true);

  Object.entries(C.colors).forEach(([k, v]) => root.style.setProperty("--" + k, v));
  $$("[data-bind]").forEach(el => el.textContent = B[el.dataset.bind] ?? BIZ[el.dataset.bind]);
  $$("[data-tel]").forEach(el => el.href = "tel:" + BIZ.phone);
  $$("[data-wa]").forEach(el => el.href = `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(BIZ.whatsappMessage)}`);
  $$("[data-ig]").forEach(el => el.href = BIZ.instagram);
  $$("[data-mail]").forEach(el => el.href = "mailto:" + BIZ.email);
  $("#year").textContent = new Date().getFullYear();
  $("#mapFrame").src = `https://maps.google.com/maps?q=${encodeURIComponent(BIZ.mapQuery)}&output=embed`;
  $("#dirLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ.mapQuery)}`;

  // Keep <title> and meta description in sync with CONFIG. Note: og:*,
  // canonical and twitter:card are read by crawlers/link-preview bots that
  // don't execute JS, so those 4 stay hand-edited in gym.html's <head>.
  document.title = `${BIZ.name} | ${BIZ.tagline}`;
  const metaDesc = $('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", C.seo.description);

  $("#heroImg") && Object.assign($("#heroImg"), { src: C.hero.image.src, alt: C.hero.image.alt }).style.setProperty("object-position", C.hero.image.pos);
  $("#heroTitle").innerHTML = `${C.hero.title[0]}<br><em>${C.hero.title[1]}</em>`;
  $("#heroSub").textContent = C.hero.sub;
  $("#aboutImg").innerHTML = pic(C.about.image, "Gym floor");
  $("#aboutTitle").textContent = C.about.title;
  $("#aboutText").innerHTML = C.about.text.map(t => `<p>${t}</p>`).join("");
  $("#aboutPoints").innerHTML = C.about.points.map(p => `<li>${p}</li>`).join("");

  const stats = [ { text: T.rating.toFixed(1), label: `${T.source} rating from ${T.reviews}+ reviews`, star: 1 }, { value: T.members, suffix: "+", label: "Active members" }, { value: T.years, suffix: "+", label: "Years of experience" }, { value: T.trainers, suffix: "", label: "Certified trainers" } ];
  $("#statsGrid").innerHTML = stats.map((s, i) => `<div class="stat rv" style="${stagger(i, 4)}"><b ${s.text ? "" : `data-count="${s.value}" data-suffix="${s.suffix}"`}>${s.text ? s.text + '<i aria-hidden="true">★</i>' : 0}</b><span>${s.label}</span></div>`).join("");
  $("#servicesGrid").innerHTML = C.programs.map((s, i) => `<article class="card svc rv" style="${stagger(i, 3)}"><div class="frame">${pic(s.image, s.title)}</div><div class="svc__b"><h3>${s.title}</h3><p>${s.text}</p><span class="tag">${s.tag}</span></div></article>`).join("");
  $("#trainersGrid").innerHTML = C.trainers.map((t, i) => `<article class="card tr rv" style="${stagger(i, 4)}"><div class="frame">${pic(t.image, t.name)}</div><div class="tr__b"><h3>${t.name}</h3><small>${t.role}</small><p>${t.specialty}</p></div></article>`).join("");
  $("#plansGrid").innerHTML = C.plans.map((p, i) => `<article class="card plan${p.popular ? " plan--pop" : ""} rv" style="${stagger(i, 3)}">${p.popular ? '<span class="badge">Most popular</span>' : ""}<h3>${p.name}</h3><div class="price">${money(p.price)} <small>${p.period}</small></div><ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul><a class="btn${p.popular ? "" : " btn--ghost"}" href="#contact" data-plan="${p.name}">${p.cta}</a></article>`).join("");
  $("#galleryGrid").innerHTML = C.gallery.map((g, i) => `<article class="card gal rv" style="${stagger(i, 3)}"><div class="gal__pair"><div class="frame"><em>Before</em>${pic(g.before, "Before")}</div><div class="frame"><em>After</em>${pic(g.after, "After")}</div></div><div class="gal__b"><b>${g.name}</b><p>${g.result}</p></div></article>`).join("");
  $("#reviewsGrid").innerHTML = C.testimonials.items.map((t, i) => `<figure class="card rev rv" style="${stagger(i, 3)}"><div class="stars" role="img" aria-label="${t.stars} out of 5 stars">${"★".repeat(t.stars)}</div><blockquote>${t.text}</blockquote><figcaption><cite>${t.name}</cite><small>${t.detail}</small></figcaption></figure>`).join("");
  if (C.reviewsUrl) $("#reviewLink").innerHTML = `<a href="${C.reviewsUrl}" target="_blank" rel="noopener">Read all ${T.reviews}+ reviews on ${T.source}</a>`;
  $("#faqList").innerHTML = C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");
  const opts = (list, ph) => `<option value="">${ph}</option>` + list.map(o => `<option>${o}</option>`).join("");
  $("#f-interest").innerHTML = opts(C.form.interests, "Select a programme");
  $("#f-time").innerHTML = opts(C.form.times, "Select a time");
  $("#formNote").textContent = C.form.mode === "whatsapp" ? "Submitting opens WhatsApp with your details ready to send. This form does not store your information." : "We use your details only to arrange your trial.";

  // Structured data (LocalBusiness). Rating schema only published when publishRatingSchema is true and reviews are real.
  const ld = { "@context": "https://schema.org", "@type": "HealthClub", name: BIZ.name, description: BIZ.tagline, url: BIZ.url, telephone: BIZ.phone, email: BIZ.email, priceRange: C.priceRange, image: `${BIZ.url}/assets/images/og.jpg`, sameAs: [BIZ.instagram],
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.zip, addressCountry: a.country },
    openingHoursSpecification: BIZ.hours.map(h => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })) };
  if (BIZ.geo) ld.geo = { "@type": "GeoCoordinates", latitude: BIZ.geo.lat, longitude: BIZ.geo.lng };
  if (T.publishRatingSchema && !T.demo) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: T.rating, reviewCount: T.reviews };
  document.head.insertAdjacentHTML("beforeend", `<script type="application/ld+json">${JSON.stringify(ld)}<\/script>`);
  if (T.demo || C.testimonials.demo) console.warn("[template] Trust stats and testimonials are DEMO content. Replace before launch.");

  // Nav + mobile menu
  const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : ""; };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", e => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });
  matchMedia("(min-width:960px)").addEventListener("change", e => e.matches && setMenu(false));

  // Reveal + count-up
  const count = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix, t0 = performance.now(), fmt = n => n.toLocaleString("en-IN") + suf;
    if (reduce) return el.textContent = fmt(end);
    const tick = t => { const p = Math.min((t - t0) / 1200, 1); el.textContent = fmt(Math.round(end * (1 - (1 - p) ** 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const show = el => { el.classList.add("in"); const n = $("[data-count]", el); n && count(n); };
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -40px" }) : null;
  $$(".rv").forEach(el => io ? io.observe(el) : show(el));

  // Booking form
  const form = $("#form"), status = $("#status"), F = C.form, els = form.elements;
  let picked = "";
  $$("[data-plan]").forEach(b => b.addEventListener("click", () => { picked = b.dataset.plan; }));
  const phoneOk = v => { let d = v.replace(/\D/g, ""); if (d.length === 12 && d.startsWith("91")) d = d.slice(2); if (d.length === 11 && d[0] === "0") d = d.slice(1); return new RegExp(F.phoneRegex).test(d) ? d : null; };
  const rules = {
    name: v => v.trim().length < 2 ? "Enter your full name." : "",
    phone: v => phoneOk(v) ? "" : "Enter a valid 10-digit mobile number.",
    interest: v => v ? "" : "Choose what you are interested in.",
    time: v => v ? "" : "Choose a preferred time."
  };
  const check = k => { const m = rules[k](els[k].value), f = els[k]; f.setAttribute("aria-invalid", !!m); $("#e-" + k).textContent = m; return !m; };
  Object.keys(rules).forEach(k => { els[k].addEventListener("blur", () => check(k)); els[k].addEventListener("input", () => els[k].getAttribute("aria-invalid") === "true" && check(k)); });
  form.addEventListener("submit", async e => {
    e.preventDefault(); status.className = "status";
    if (els.website.value) return; // honeypot
    const bad = Object.keys(rules).filter(k => !check(k));
    if (bad.length) { status.textContent = `Please fix ${bad.length} field${bad.length > 1 ? "s" : ""} above.`; status.classList.add("err"); els[bad[0]].focus(); return; }
    const d = { name: els.name.value.trim(), phone: phoneOk(els.phone.value), interest: els.interest.value, time: els.time.value };
    const btn = $("button", form);
    if (F.mode === "endpoint" && F.endpoint) {
      btn.disabled = true; status.textContent = "Sending...";
      try {
        const body = new URLSearchParams({ "form-name": "trial", ...d, plan: picked });
        const r = await fetch(F.endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }, body });
        if (!r.ok) throw 0;
        form.reset(); status.textContent = "Request received. We will confirm your trial time shortly."; status.classList.add("ok");
      } catch { status.textContent = `Could not send. Please call ${BIZ.phoneDisplay} or use WhatsApp.`; status.classList.add("err"); }
      btn.disabled = false;
    } else {
      const msg = `Hi, I'm ${d.name}. I'd like to book a free trial at ${BIZ.name}. Interested in: ${d.interest}. Preferred time: ${d.time}.${picked ? " Plan: " + picked + "." : ""} My number: ${d.phone}.`;
      window.open(`https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      status.textContent = "WhatsApp is opening. Press send there so we receive your request."; status.classList.add("ok");
    }
  });
})();