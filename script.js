document.addEventListener("DOMContentLoaded", () => {
  // NAVBAR HAMBURGER
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.setAttribute("aria-expanded", "false");

    const closeMenu = () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!link.closest(".nav-dropdown-menu")) closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // DROPDOWN "OUR PROJECT"
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;

    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    dropdown.querySelectorAll(".nav-dropdown-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        dropdown.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  // OUR SOLUTIONS: active card controls the desktop grid proportions.
  document.querySelectorAll(".solution-showcase").forEach((showcase) => {
    const cards = [
      showcase.querySelector(".solution-main"),
      ...showcase.querySelectorAll(".solution-side"),
    ].filter(Boolean);

    function activateCard(selectedCard) {
      cards.forEach((card, index) => {
        card.classList.toggle("solution-active", card === selectedCard);
        showcase.classList.toggle(
          `active-card-${index + 1}`,
          card === selectedCard,
        );
      });
    }

    if (cards.length) activateCard(cards[0]);

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          activateCard(card);
        }
      });
      card.addEventListener("focusin", () => activateCard(card));
      card.addEventListener("click", () => activateCard(card));
    });

    showcase.addEventListener("mouseleave", () => {
      if (
        cards[0] &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        activateCard(cards[0]);
      }
    });
  });

  // NEWS CARDS: touch scrolling works naturally; this adds mouse drag on desktop.
  document.querySelectorAll(".news-track").forEach((track) => {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let dragged = false;

    track.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      isDown = true;
      dragged = false;
      startX = event.clientX;
      scrollStart = track.scrollLeft;
      track.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 5) dragged = true;
      track.scrollLeft = scrollStart - distance;
    });

    const stopDragging = () => {
      isDown = false;
      track.classList.remove("is-dragging");
    };

    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    track.addEventListener(
      "click",
      (event) => {
        if (dragged) {
          event.preventDefault();
          event.stopPropagation();
          dragged = false;
        }
      },
      true,
    );
  });
});
