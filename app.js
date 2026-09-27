/* =====================================================================
   APP CODE — shared across every page. No need to edit below this line
   for a new client; edit config.js instead. Each render block below
   guards on whether its container exists, since most containers only
   exist on one page (e.g. #plansGrid is only on pricing.html).
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
  const pic = (im, label) => `<img src="${im.src}" alt="${im.alt}" loading="lazy" decoding="async" style="object-position:${im.pos}" data-ph="${label}" data-fallback="${im.demo}">`;
  const stagger = (i, n) => `--d:${(i % n) * .08}s`;

  // Turn a photo grid into a rollable (draggable + arrow-navigable) carousel.
  const rollIcon = d => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  const makeRoll = el => {
    if (!el || !el.children.length) return;
    el.classList.add("rolltrack");
    const wrap = document.createElement("div"); wrap.className = "rollwrap";
    el.parentNode.insertBefore(wrap, el); wrap.append(el);
    const fadeL = document.createElement("div"); fadeL.className = "rollfade l";
    const fadeR = document.createElement("div"); fadeR.className = "rollfade r";
    const prev = document.createElement("button"); prev.type = "button"; prev.className = "rollnav prev"; prev.setAttribute("aria-label", "Scroll left"); prev.innerHTML = rollIcon("M15 6l-6 6 6 6");
    const next = document.createElement("button"); next.type = "button"; next.className = "rollnav next"; next.setAttribute("aria-label", "Scroll right"); next.innerHTML = rollIcon("M9 6l6 6-6 6");
    wrap.append(fadeL, fadeR, prev, next);
    const step = () => (el.children[0]?.getBoundingClientRect().width || 300) + 20;
    prev.addEventListener("click", () => el.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }));
    next.addEventListener("click", () => el.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }));
    const sync = () => {
      const max = el.scrollWidth - el.clientWidth - 2;
      prev.style.opacity = fadeL.style.opacity = el.scrollLeft > 4 ? "1" : "0";
      next.style.opacity = fadeR.style.opacity = el.scrollLeft < max ? "1" : "0";
      prev.style.pointerEvents = el.scrollLeft > 4 ? "auto" : "none";
      next.style.pointerEvents = el.scrollLeft < max ? "auto" : "none";
    };
    el.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
    if (!reduce && el.scrollWidth > el.clientWidth + 4) {
      el.classList.add("peek");
      el.addEventListener("animationend", () => el.classList.remove("peek"), { once: true });
    }
    // pointer-drag to roll through photos with the mouse (touch scrolls natively)
    let down = false, moved = false, startX = 0, startScroll = 0;
    el.addEventListener("pointerdown", e => {
      if (e.pointerType === "touch") return;
      down = true; moved = false; startX = e.clientX; startScroll = el.scrollLeft;
      el.classList.add("dragging"); el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    });
    const release = () => { down = false; el.classList.remove("dragging"); };
    el.addEventListener("pointerup", release); el.addEventListener("pointercancel", release); el.addEventListener("pointerleave", release);
    el.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  };

  // Missing image => try a stock demo photo first, then fall back to a graceful
  // placeholder box (site never shows a broken icon). Once real files are dropped
  // into assets/images/, this fallback path is never triggered.
  document.addEventListener("error", e => {
    const i = e.target; if (i.tagName !== "IMG" || !i.dataset.ph) return;
    if (i.dataset.fallback && i.src !== i.dataset.fallback) { i.src = i.dataset.fallback; return; }
    if (i.id === "heroImg") return i.remove();
    i.outerHTML = `<div class="ph" role="img" aria-label="${i.alt}">${DUMB}<span>${i.dataset.ph}</span></div>`;
  }, true);

  /* ---- global chrome: present on every page (header/nav + footer) ---- */
  Object.entries(C.colors).forEach(([k, v]) => root.style.setProperty("--" + k, v));
  $$("[data-bind]").forEach(el => el.textContent = B[el.dataset.bind] ?? BIZ[el.dataset.bind]);
  $$("[data-tel]").forEach(el => el.href = "tel:" + BIZ.phone);
  $$("[data-wa]").forEach(el => el.href = `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(BIZ.whatsappMessage)}`);
  $$("[data-ig]").forEach(el => el.href = BIZ.instagram);
  $$("[data-mail]").forEach(el => el.href = "mailto:" + BIZ.email);
  const yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Structured data (LocalBusiness), added on every page.
  const ld = { "@context": "https://schema.org", "@type": "HealthClub", name: BIZ.name, description: BIZ.tagline, url: BIZ.url, telephone: BIZ.phone, email: BIZ.email, priceRange: C.priceRange, image: `${BIZ.url}/assets/images/og.jpg`, sameAs: [BIZ.instagram],
    address: { "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.zip, addressCountry: a.country },
    openingHoursSpecification: BIZ.hours.map(h => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })) };
  if (BIZ.geo) ld.geo = { "@type": "GeoCoordinates", latitude: BIZ.geo.lat, longitude: BIZ.geo.lng };
  if (T.publishRatingSchema && !T.demo) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: T.rating, reviewCount: T.reviews };
  document.head.insertAdjacentHTML("beforeend", `<script type="application/ld+json">${JSON.stringify(ld)}<\/script>`);
  if (T.demo || C.testimonials.demo) console.warn("[template] Trust stats and testimonials are DEMO content. Replace before launch.");

  // Nav + mobile menu
  const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
  if (nav && burger && menu) {
    const onScroll = () => nav.classList.toggle("solid", scrollY > 30);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : ""; };
    burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", e => e.target.closest("a") && setMenu(false));
    addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });
    matchMedia("(min-width:960px)").addEventListener("change", e => e.matches && setMenu(false));
  }

  /* ---- page-specific sections: each guarded on its container ---- */

  // Hero (home page only)
  const heroImg = $("#heroImg");
  if (heroImg) {
    Object.assign(heroImg, { src: C.hero.image.src, alt: C.hero.image.alt });
    heroImg.dataset.fallback = C.hero.image.demo;
    heroImg.style.setProperty("object-position", C.hero.image.pos);
  }
  const heroTitle = $("#heroTitle"); if (heroTitle) heroTitle.innerHTML = `${C.hero.title[0]}<br><em>${C.hero.title[1]}</em>`;
  const heroSub = $("#heroSub"); if (heroSub) heroSub.textContent = C.hero.sub;

  // Trust stats (grid of 4 numbers) — may appear on more than one page
  const statsGrid = $("#statsGrid");
  if (statsGrid) {
    const stats = [ { text: T.rating.toFixed(1), label: `${T.source} rating from ${T.reviews}+ reviews`, star: 1 }, { value: T.members, suffix: "+", label: "Active members" }, { value: T.years, suffix: "+", label: "Years of experience" }, { value: T.trainers, suffix: "", label: "Certified trainers" } ];
    statsGrid.innerHTML = stats.map((s, i) => `<div class="stat rv" style="${stagger(i, 4)}"><b ${s.text ? "" : `data-count="${s.value}" data-suffix="${s.suffix}"`}>${s.text ? s.text + '<i aria-hidden="true">★</i>' : 0}</b><span>${s.label}</span></div>`).join("");
  }

  // About (image + title + copy + bullet points)
  const aboutImg = $("#aboutImg"); if (aboutImg) aboutImg.innerHTML = pic(C.about.image, "Gym floor");
  const aboutTitle = $("#aboutTitle"); if (aboutTitle) aboutTitle.textContent = C.about.title;
  const aboutText = $("#aboutText");
  if (aboutText) { const limit = +aboutText.dataset.limit || C.about.text.length; aboutText.innerHTML = C.about.text.slice(0, limit).map(t => `<p>${t}</p>`).join(""); }
  const aboutPoints = $("#aboutPoints"); if (aboutPoints) aboutPoints.innerHTML = C.about.points.map(p => `<li>${p}</li>`).join("");

  // Programmes / classes grid — data-limit="3" on the container shows a teaser subset
  const servicesGrid = $("#servicesGrid");
  if (servicesGrid) {
    const limit = +servicesGrid.dataset.limit || C.programs.length;
    servicesGrid.innerHTML = C.programs.slice(0, limit).map((s, i) => `<article class="card svc rv" style="${stagger(i, 3)}"><div class="frame">${pic(s.image, s.title)}</div><div class="svc__b"><h3>${s.title}</h3><p>${s.text}</p><span class="tag">${s.tag}</span></div></article>`).join("");
  }

  // Trainers grid
  const trainersGrid = $("#trainersGrid");
  if (trainersGrid) {
    const limit = +trainersGrid.dataset.limit || C.trainers.length;
    trainersGrid.innerHTML = C.trainers.slice(0, limit).map((t, i) => `<article class="card tr rv" style="${stagger(i, 4)}"><div class="frame">${pic(t.image, t.name)}</div><div class="tr__b"><h3>${t.name}</h3><small>${t.role}</small><p>${t.specialty}</p></div></article>`).join("");
  }

  // Plans / pricing grid
  const plansGrid = $("#plansGrid");
  if (plansGrid) {
    plansGrid.innerHTML = C.plans.map((p, i) => `<article class="card plan${p.popular ? " plan--pop" : ""} rv" style="${stagger(i, 3)}">${p.popular ? '<span class="badge">Most popular</span>' : ""}<h3>${p.name}</h3><div class="price">${money(p.price)} <small>${p.period}</small></div><ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul><a class="btn${p.popular ? "" : " btn--ghost"}" href="contact.html#contact-form" data-plan="${p.name}">${p.cta}</a></article>`).join("");
  }

  // Results / before-after gallery
  const galleryGrid = $("#galleryGrid");
  if (galleryGrid) {
    galleryGrid.innerHTML = C.gallery.map((g, i) => `<article class="card gal rv" style="${stagger(i, 3)}"><div class="gal__pair"><div class="frame"><em>Before</em>${pic(g.before, "Before")}</div><div class="frame"><em>After</em>${pic(g.after, "After")}</div></div><div class="gal__b"><b>${g.name}</b><p>${g.result}</p></div></article>`).join("");
  }

  [servicesGrid, trainersGrid, galleryGrid].forEach(makeRoll);

  // Reviews / testimonials
  const reviewsGrid = $("#reviewsGrid");
  if (reviewsGrid) reviewsGrid.innerHTML = C.testimonials.items.map((t, i) => `<figure class="card rev rv" style="${stagger(i, 3)}"><div class="stars" role="img" aria-label="${t.stars} out of 5 stars">${"★".repeat(t.stars)}</div><blockquote>${t.text}</blockquote><figcaption><cite>${t.name}</cite><small>${t.detail}</small></figcaption></figure>`).join("");
  const reviewLink = $("#reviewLink"); if (reviewLink && C.reviewsUrl) reviewLink.innerHTML = `<a href="${C.reviewsUrl}" target="_blank" rel="noopener">Read all ${T.reviews}+ reviews on ${T.source}</a>`;

  // FAQ accordion
  const faqList = $("#faqList"); if (faqList) faqList.innerHTML = C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  // Location / map
  const mapFrame = $("#mapFrame"); if (mapFrame) mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(BIZ.mapQuery)}&output=embed`;
  const dirLink = $("#dirLink"); if (dirLink) dirLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BIZ.mapQuery)}`;

  // Booking form
  const form = $("#form");
  if (form) {
    const opts = (list, ph) => `<option value="">${ph}</option>` + list.map(o => `<option>${o}</option>`).join("");
    const fInterest = $("#f-interest"); if (fInterest) fInterest.innerHTML = opts(C.form.interests, "Select a programme");
    const fTime = $("#f-time"); if (fTime) fTime.innerHTML = opts(C.form.times, "Select a time");
    const formNote = $("#formNote"); if (formNote) formNote.textContent = C.form.mode === "whatsapp" ? "Submitting opens WhatsApp with your details ready to send. This form does not store your information." : "We use your details only to arrange your trial.";

    const status = $("#status"), F = C.form, els = form.elements;
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
  }

  // Reveal + count-up — set up LAST, after every grid above has been filled in,
  // so the IntersectionObserver actually finds the .rv cards it needs to watch.
  const count = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix, t0 = performance.now(), fmt = n => n.toLocaleString("en-IN") + suf;
    if (reduce) return el.textContent = fmt(end);
    const tick = t => { const p = Math.min((t - t0) / 1200, 1); el.textContent = fmt(Math.round(end * (1 - (1 - p) ** 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  };
  const show = el => { el.classList.add("in"); const n = $("[data-count]", el); n && count(n); };
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -40px" }) : null;
  $$(".rv").forEach(el => io ? io.observe(el) : show(el));
})();