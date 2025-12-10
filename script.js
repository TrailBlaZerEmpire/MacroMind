// ========== STARFIELD ANIMATION ==========
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let width, height, stars;

function initStarfield() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  const starCount = Math.floor((width * height) / 8000);
  stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005
    });
  }
}

function drawStarfield() {
  ctx.clearRect(0, 0, width, height);

  for (let star of stars) {
    star.alpha += star.twinkleSpeed * (Math.random() > 0.5 ? 1 : -1);
    if (star.alpha < 0.1) star.alpha = 0.1;
    if (star.alpha > 1) star.alpha = 1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 220, 255, ${star.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStarfield);
}

window.addEventListener("resize", initStarfield);

initStarfield();
drawStarfield();

// ========== SCROLL-IN OBSERVER ==========
const fadeSections = document.querySelectorAll(".fade-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

fadeSections.forEach((section) => observer.observe(section));
