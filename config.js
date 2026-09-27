/* =====================================================================
   CONFIG — THE ONLY FILE YOU EDIT FOR A NEW CLIENT
   Every piece of client-specific content lives in this one object, grouped
   by section. Images: drop files into assets/images/ using the filenames
   given to IMG() below. Loaded before app.js on every page. The only
   things NOT here are each page's 6 lines of SEO/social meta tags in
   <head> (title, description, canonical, og:*) — those must stay static
   HTML for search engines and link previews, which don't run JavaScript.
   ===================================================================== */
// pos = focal point for cropping. `demo` is an auto-generated stock-photo URL used ONLY
// as a fallback while assets/images/<file> doesn't exist yet — drop in the real file and
// the demo photo is never requested. Safe to delete once every real image is in place.
const IMG = (file, alt, pos = "50% 50%") => ({ src: "assets/images/" + file, alt, pos, demo: `https://picsum.photos/seed/${file.replace(/\.[a-z]+$/i, "")}/1200/1200` });
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

  // ---- hero: top-of-page banner (home page only) -----------------------
  // image filename must match the <link rel="preload"> href in index.html
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