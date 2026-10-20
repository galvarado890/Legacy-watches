const heroTotal = 2;
let heroIndex = 0;
const heroImage = document.querySelector("#heroImage");
function showHero(index) {
  heroIndex = (index + heroTotal) % heroTotal;
  heroImage.classList.toggle("is-watch-two", heroIndex === 1);
  heroImage.setAttribute("aria-label", heroIndex === 0
    ? "A vintage Casio watch worn while picking up a golf ball"
    : "A different Casio watch worn at the golf bunker");
}
document.querySelectorAll("[data-hero-step]").forEach((button) => {
  button.addEventListener("click", () => showHero(heroIndex + Number(button.dataset.heroStep)));
});
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  nav.classList.toggle("is-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
}));
document.querySelectorAll(".feature").forEach((feature) => {
  feature.addEventListener("click", () => {
    const expanded = feature.getAttribute("aria-expanded") !== "true";
    feature.setAttribute("aria-expanded", String(expanded));
  });
});
const heroSection = document.querySelector(".hero");
const heroFeatures = [...heroSection.querySelectorAll(".feature")];
const heroScrollSection = document.querySelector(".hero-scroll");
let revealFrame = 0;
function updateHeroReveals() {
  revealFrame = 0;
  const sectionTop = heroScrollSection.getBoundingClientRect().top + window.scrollY;
  const scrollDistance = Math.max(1, heroScrollSection.offsetHeight - heroSection.offsetHeight);
  const progress = Math.min(1, Math.max(0,
    (window.scrollY - sectionTop) / scrollDistance
  ));
  heroFeatures.forEach((feature, index) => {
    feature.classList.toggle("is-revealed", progress >= 0.02 + index * 0.24);
  });
}
window.addEventListener("scroll", () => {
  if (!revealFrame) revealFrame = requestAnimationFrame(updateHeroReveals);
}, { passive: true });
window.addEventListener("resize", updateHeroReveals);
updateHeroReveals();
document.querySelectorAll("[data-product]").forEach((card) => {
  card.querySelectorAll(".expand-toggle").forEach((button) => button.addEventListener("click", () => {
    const expanded = card.classList.toggle("is-expanded");
    card.querySelectorAll(".expand-toggle").forEach((toggle) => toggle.setAttribute("aria-expanded", String(expanded)));
  }));
  card.querySelector(".rotate-toggle").addEventListener("click", () => card.classList.toggle("is-rotated"));
});
const collectionButton = document.querySelector(".collection-next");
const editorialGrid = document.querySelector("#editorialGrid");
collectionButton.addEventListener("click", () => {
  editorialGrid.classList.toggle("archive-shift");
  const tiles = [...editorialGrid.children];
  editorialGrid.append(tiles[0]);
});

// Pulse the hero arrows briefly until the visitor moves, scrolls, or uses a control.
const heroControls = document.querySelector(".hero-controls");
let idleTimer = window.setTimeout(() => heroControls.classList.add("is-idle"), 2600);
function stopArrowPrompt() {
  window.clearTimeout(idleTimer);
  heroControls.classList.remove("is-idle");
  ["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((eventName) => {
    window.removeEventListener(eventName, stopArrowPrompt);
  });
}
["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((eventName) => {
  window.addEventListener(eventName, stopArrowPrompt, { once: true, passive: true });
});




