document.documentElement.classList.add("js");

const config = window.PORTFOLIO_CONFIG ?? {};
const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];

document.querySelectorAll("[data-brand-name]").forEach((node) => {
  node.textContent = config.name || "Seu nome";
});
document.title = `${config.name || "Seu nome"} — Design & desenvolvimento web`;
document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
document.querySelector("#year").textContent = new Date().getFullYear();

const safeExternalUrl = (value) => {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
};

const projectGrid = document.querySelector("#project-grid");
const dialog = document.querySelector("#project-dialog");
const dialogClose = dialog.querySelector(".dialog-close");
let lastProjectTrigger = null;

function createProjectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card reveal";

  const trigger = document.createElement("button");
  trigger.className = "project-trigger";
  trigger.type = "button";
  trigger.setAttribute("aria-label", `Ver detalhes de ${project.title}, conceito fictício`);

  const imageWrap = document.createElement("span");
  imageWrap.className = "project-image-wrap";
  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.alt;
  image.width = 1200;
  image.height = 900;
  image.loading = "lazy";
  image.decoding = "async";

  const concept = document.createElement("span");
  concept.className = "concept-label";
  concept.textContent = "Conceito fictício";
  const openMark = document.createElement("span");
  openMark.className = "project-open";
  openMark.setAttribute("aria-hidden", "true");
  openMark.textContent = "↗";
  imageWrap.append(image, concept, openMark);

  const info = document.createElement("div");
  info.className = "project-info";
  const heading = document.createElement("h3");
  const titleButton = document.createElement("button");
  titleButton.className = "project-title-button";
  titleButton.type = "button";
  titleButton.textContent = project.title;
  titleButton.setAttribute("aria-label", project.title);
  heading.append(titleButton);

  const category = document.createElement("p");
  category.className = "project-category";
  category.textContent = project.category;
  const year = document.createElement("span");
  year.className = "project-meta project-year";
  year.textContent = project.year || "";
  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;
  info.append(heading, category, year, description);
  trigger.append(imageWrap);

  const openProject = (event) => {
    const liveUrl = safeExternalUrl(project.liveUrl);
    if (liveUrl) {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
      return;
    }
    openProjectDetails(project, event.currentTarget);
  };
  trigger.addEventListener("click", openProject);
  titleButton.addEventListener("click", openProject);

  article.append(trigger, info);
  if (safeExternalUrl(project.liveUrl)) {
    const liveLink = document.createElement("a");
    liveLink.className = "project-live";
    liveLink.href = safeExternalUrl(project.liveUrl);
    liveLink.target = "_blank";
    liveLink.rel = "noopener noreferrer";
    liveLink.append("Abrir projeto ");
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    liveLink.append(arrow);
    info.append(liveLink);
  }

  article.style.setProperty("--project-order", String(index));
  return article;
}

function openProjectDetails(project, trigger) {
  lastProjectTrigger = trigger;
  dialog.querySelector(".dialog-image").src = project.image;
  dialog.querySelector(".dialog-image").alt = project.alt;
  dialog.querySelector("#dialog-title").textContent = project.title;
  dialog.querySelector(".dialog-description").textContent = project.description;
  dialog.querySelector(".dialog-category").textContent = project.category;
  dialog.querySelector(".dialog-year").textContent = project.year || "";

  const liveLink = dialog.querySelector(".dialog-live-link");
  const liveUrl = safeExternalUrl(project.liveUrl);
  liveLink.hidden = !liveUrl;
  if (liveUrl) liveLink.href = liveUrl;
  dialog.showModal();
}

projects.forEach((project, index) => projectGrid.append(createProjectCard(project, index)));

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  dialog.close();
});
dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    dialog.close();
  }
});
dialog.addEventListener("close", () => {
  if (lastProjectTrigger?.isConnected) lastProjectTrigger.focus({ preventScroll: true });
});

const emailLink = document.querySelector("[data-email-link]");
const email = typeof config.email === "string" ? config.email.trim() : "";
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  emailLink.href = `mailto:${email}`;
  emailLink.textContent = email;
} else {
  emailLink.href = "#contato";
  emailLink.textContent = "E-mail pendente";
}

const contactLink = document.querySelector("[data-whatsapp]");
const contactStatus = document.querySelector("#contact-status");
const whatsappNumber = String(config.whatsapp || "").replace(/\D/g, "");
const whatsappConfigured = whatsappNumber.length >= 10 && whatsappNumber.length <= 15;
contactStatus.textContent = whatsappConfigured
  ? "Atendimento via WhatsApp."
  : "Configure o WhatsApp em js/projects.js.";

contactLink.addEventListener("click", (event) => {
  if (!whatsappConfigured) {
    event.preventDefault();
    contactStatus.textContent = "O número do WhatsApp ainda não foi configurado. Nenhum link foi aberto.";
    return;
  }

  event.preventDefault();
  const message = encodeURIComponent("Olá! Encontrei seu portfólio e gostaria de conversar sobre um projeto.");
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  contactStatus.textContent = "Sua conversa está sendo aberta no WhatsApp.";
});

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function setMenuOpen(open, returnFocus = false) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mainNav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  if (open) mainNav.querySelector("a")?.focus();
  else if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!open, open);
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    setMenuOpen(false, isMobile);
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false, true);
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && document.visibilityState !== "hidden" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let observerReady = false;
  const revealFallback = window.setTimeout(() => {
    if (!observerReady || document.visibilityState === "hidden") {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }, 1800);

  const revealObserver = new IntersectionObserver((entries, observer) => {
    if (document.visibilityState !== "hidden") {
      observerReady = true;
      window.clearTimeout(revealFallback);
    }
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
