document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // NAVBAR HAMBURGER — HP & TABLET
  // ==========================================
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu setelah memilih link biasa
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!link.closest(".nav-dropdown-menu")) {
          nav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Tutup menu jika klik di luar navbar
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Tutup menu dengan Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Jika layar kembali ke desktop, reset menu mobile
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==========================================
  // DROPDOWN NAVBAR — OUR PROJECT
  // ==========================================
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

  // Tutup dropdown jika klik di luar
  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");

        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Tutup dropdown saat menekan Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");

        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });

  // ==========================================
  // OUR SOLUTIONS — ANIMASI CARD
  // ==========================================
  document.querySelectorAll(".solution-showcase").forEach((showcase) => {
    const mainCard = showcase.querySelector(".solution-main");
    const sideCards = showcase.querySelectorAll(".solution-side");
    const allCards = [mainCard, ...sideCards].filter(Boolean);

    function activateCard(selectedCard) {
      allCards.forEach((card) => {
        card.classList.toggle("solution-active", card === selectedCard);
      });
    }

    // Card utama aktif saat halaman dibuka
    if (mainCard) {
      activateCard(mainCard);
    }

    allCards.forEach((card) => {
      // Laptop: aktif saat diarahkan kursor
      card.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover)").matches) {
          activateCard(card);
        }
      });

      // Keyboard: aktif saat difokuskan
      card.addEventListener("focusin", () => {
        activateCard(card);
      });

      // HP/tablet: aktif saat disentuh
      card.addEventListener("click", () => {
        activateCard(card);
      });
    });

    // Kembali ke card utama ketika kursor meninggalkan area
    showcase.addEventListener("mouseleave", () => {
      if (mainCard && window.matchMedia("(hover: hover)").matches) {
        activateCard(mainCard);
      }
    });
  });
});
