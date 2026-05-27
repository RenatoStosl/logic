/* ─────────────────────────────────────────
   Logic Gate — Informática & Assistência Técnica
   main.js
   ───────────────────────────────────────── */

/* ─── Hamburger Menu (mobile) ─── */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });
}

/* ─── Scroll Reveal ─── */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on element index within its parent
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll(".reveal"),
        );
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.08}s`;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

/* Hero stats counter */
const formatStatValue = (value, decimals, prefix, suffix) => {
  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return `${prefix}${formatted}${suffix}`;
};

const animateStat = (el) => {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatStatValue(target * eased, decimals, prefix, suffix);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = formatStatValue(target, decimals, prefix, suffix);
    }
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".stat-num[data-count]")
          .forEach(animateStat);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsBlock = document.querySelector(".stats");
if (statsBlock) statsObserver.observe(statsBlock);

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.style.color = "var(--white)";
          }
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => sectionObserver.observe(s));

/* ─── Smooth scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─── Nav background opacity on scroll ─── */
const nav = document.querySelector("nav");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 60) {
      nav.style.background = "rgba(10,12,16,0.97)";
    } else {
      nav.style.background = "rgba(10,12,16,0.85)";
    }
  },
  { passive: true },
);
