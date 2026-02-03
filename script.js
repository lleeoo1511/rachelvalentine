document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     Floating Hearts Background
  =============================== */
  function createFloatingHearts() {
    const container = document.getElementById("bgHearts");
    if (!container) return;

    const hearts = ["💕", "💖", "💗", "💝", "💘", "❤️"];

    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart-float";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = Math.random() * 10 + 10 + "s";
      container.appendChild(heart);

      setTimeout(() => heart.remove(), 17000);
    }, 3000);
  }

  createFloatingHearts();

  /* ===============================
     First YES / NO Buttons
  =============================== */
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const buttonContainer = document.getElementById("buttonContainer");
  const successSection = document.getElementById("successSection");

  if (!yesBtn || !noBtn || !buttonContainer) return;

  let noAttempts = 0;
  const isTouch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const moveEvent = isTouch ? "touchstart" : "mouseenter";

  // 😈 NO button runs away
  noBtn.addEventListener(moveEvent, (e) => {
    if (isTouch) e.preventDefault();

    noAttempts++;
    noBtn.style.position = "absolute";

    const rect = buttonContainer.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - noBtn.offsetWidth);
    const maxY = Math.max(0, rect.height - noBtn.offsetHeight);

    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

    // YES button grows
    yesBtn.style.transform = `scale(${1 + noAttempts * 0.15})`;
  });

  // 💖 YES button works normally
  yesBtn.addEventListener("click", () => {
    buttonContainer.style.display = "none";
    successSection.classList.add("show");

    setTimeout(() => {
      successSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });

  /* ===============================
     Envelope Toggle
  =============================== */
  const envelope = document.getElementById("envelope");
  if (envelope) {
    envelope.addEventListener("click", () => {
      envelope.classList.toggle("open");
    });
  }

  /* ===============================
     Photo Reveal
  =============================== */
  window.revealPhoto = function (card) {
    const placeholder = card.querySelector(".photo-placeholder");
    const content = card.querySelector(".photo-content");

    if (!content.classList.contains("revealed")) {
      placeholder.style.display = "none";
      content.classList.add("revealed");
    }
  };

  /* ===============================
     Surprise Messages
  =============================== */
  window.toggleSurprise = function (num) {
    const msg = document.getElementById("surprise" + num);
    if (msg) msg.classList.toggle("show");
  };

  /* ===============================
     Final YES / NO Buttons
  =============================== */
  const noBtn2 = document.getElementById("noBtn2");
  const consequenceMsg = document.getElementById("consequenceMsg");

  if (noBtn2 && consequenceMsg) {
    let noBtn2Attempts = 0;
    const finalMoveEvent = isTouch ? "touchstart" : "mouseenter";

    noBtn2.addEventListener(finalMoveEvent, (e) => {
      if (isTouch) e.preventDefault();

      noBtn2Attempts++;
      noBtn2.style.position = "absolute";

      const parent = noBtn2.parentElement;
      const rect = parent.getBoundingClientRect();

      const maxX = Math.max(0, rect.width - noBtn2.offsetWidth);
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * 80 - 40;

      noBtn2.style.left = randomX + "px";
      noBtn2.style.top = randomY + "px";

      noBtn2.style.transform =
        `scale(${Math.max(0.6, 1 - noBtn2Attempts * 0.1)}) rotate(${Math.random() * 360}deg)`;

      // After 3 tries → happy ending
      if (noBtn2Attempts >= 3) {
        noBtn2.style.display = "none";
        consequenceMsg.style.display = "block";
        consequenceMsg.style.animation = "bounceIn 0.6s ease-out";
      }
    });

    // Backup click handler
    noBtn2.addEventListener("click", () => {
      noBtn2.style.display = "none";
      consequenceMsg.style.display = "block";
      consequenceMsg.style.animation = "bounceIn 0.6s ease-out";
    });
  }

});

// Needed for the final "Absolutely!" button
window.showConsequence = function () {
  const noBtn2 = document.getElementById("noBtn2");
  const consequenceMsg = document.getElementById("consequenceMsg");

  if (noBtn2) noBtn2.style.display = "none";

  if (consequenceMsg) {
    consequenceMsg.style.display = "block";
    consequenceMsg.style.animation = "bounceIn 0.6s ease-out";
  }
};


