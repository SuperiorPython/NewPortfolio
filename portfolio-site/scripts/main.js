/* ============================================================
   1. MOBILE NAV TOGGLE + OVERLAY DIMMING
   ============================================================ */

const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links-center");
const overlay = document.querySelector(".menu-overlay");

hamburger?.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";

    // toggle menu
    hamburger.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
});

// clicking overlay closes menu
overlay?.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", false);
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
});


/* ============================================================
   2. SMOOTH SCROLL FOR NAVIGATION
   ============================================================ */

document.querySelectorAll('.nav-links-center a').forEach(link => {
    link.addEventListener('click', (e) => {
        // close mobile menu when clicked
        hamburger.setAttribute("aria-expanded", false);
        navLinks.classList.remove("active");
        overlay.classList.remove("active");

        const targetID = link.getAttribute("href");
        if (targetID.startsWith("#")) {
            e.preventDefault();
            document.querySelector(targetID)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


/* ============================================================
   3. SCROLL-SPY: Highlight active section in navbar
   ============================================================ */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links-center a");

function updateActiveNav() {
    let scrollPos = window.scrollY + 150; // offset for fixed navbar

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
            navItems.forEach(item => item.classList.remove("active"));

            const newActive = document.querySelector(
                `.nav-links-center a[href="#${id}"]`
            );
            newActive?.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav(); // initial state on load


/* ============================================================
   4. SKILLS CAROUSEL — Smooth left/right scrolling
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("skillsTrack");
    const leftBtn = document.querySelector(".skills-arrow-left");
    const rightBtn = document.querySelector(".skills-arrow-right");

    if (!track || !leftBtn || !rightBtn) return;

    const SCROLL_AMOUNT = 220; // px per arrow tap

    leftBtn.addEventListener("click", () => {
        track.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
        track.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    });
});
