document.addEventListener('DOMContentLoaded', () => {

  /* ==============================
     MENÚ HAMBURGUESA - CORREGIDO
  ============================== */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    // Abrir/cerrar menú al hacer clic en el botón
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle("active");
      
      // Cambiar ícono del menú
      const icon = menuToggle.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Cerrar menú al hacer clic en un enlace
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  /* ==============================
     BOTÓN SCROLL TOP
  ============================== */
  const btnTop = document.getElementById("btnTop");
  if (btnTop) {
    window.addEventListener("scroll", () => {
      btnTop.style.display = window.scrollY > 300 ? "flex" : "none";
    });
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==============================
     MODAL CERTIFICADOS
  ============================== */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("imgModal");
  const closeModal = document.getElementById("closeModal");

  if (modal && modalImg) {
    const certImgs = document.querySelectorAll(".cert-img");
    certImgs.forEach(img => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalImg.alt = img.alt || "Certificado";
      });
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  /* ==============================
     BOTÓN VER CERTIFICADO (Toggle imagen)
  ============================== */
  const certButtons = document.querySelectorAll(".btn-ver-certificado");
  certButtons.forEach(button => {
    // Estado inicial: asegurar que la imagen está oculta
    const timelineContent = button.closest(".timeline-content");
    if (timelineContent) {
      const img = timelineContent.querySelector(".cert-img");
      if (img && img.style.display !== "block") {
        img.style.display = "none";
      }
    }

    button.addEventListener("click", () => {
      const container = button.closest(".timeline-content");
      if (container) {
        const img = container.querySelector(".cert-img");
        if (img) {
          if (img.style.display === "none" || img.style.display === "") {
            img.style.display = "block";
            button.textContent = "Ocultar certificado";
          } else {
            img.style.display = "none";
            button.textContent = "Ver certificado";
          }
        }
      }
    });
  });

  /* ==============================
     MATRIX HACKER VERDE + AZUL
  ============================== */
  const canvas = document.getElementById("matrix");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let fontSize = 18;
    let columns = [];
    let columnSpeeds = [];
    let animationFrameId = null;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      initColumns();
    }

    function initColumns() {
      if (!canvas) return;
      const cols = Math.floor(canvas.width / fontSize);
      columns = [];
      columnSpeeds = [];
      const baseSpeed = 1.5;
      for (let i = 0; i < cols; i++) {
        columns[i] = Math.random() * canvas.height;
        columnSpeeds[i] = baseSpeed * (canvas.height / window.innerHeight) * (0.8 + Math.random() * 0.4);
      }
    }

    function drawMatrix() {
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = "rgba(2, 6, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < columns.length; i++) {
        const char = String.fromCharCode(33 + Math.random() * 94);
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(0, 255, 70, 0.9)" : "rgba(56, 189, 248, 0.9)";
        ctx.fillText(char, i * fontSize, columns[i]);
        columns[i] += columnSpeeds[i];

        if (columns[i] > canvas.height) columns[i] = 0;
      }

      animationFrameId = requestAnimationFrame(drawMatrix);
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
    });

    setTimeout(() => {
      resizeCanvas();
      drawMatrix();
    }, 100);
  }

  /* ==============================
     SCROLL SUAVE PARA ENLACES INTERNOS
  ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});
