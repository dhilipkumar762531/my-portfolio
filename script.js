const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const progressBar = document.querySelector(".scroll-progress");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const linkedInUrl = "";

document.querySelector("#year").textContent = String(new Date().getFullYear());

document.querySelectorAll(".linkedin-link").forEach((link) => {
  if (linkedInUrl) {
    link.href = linkedInUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.classList.remove("social-unavailable");
    link.removeAttribute("title");
  } else {
    link.href = "mailto:dhilipkumar762531@gmail.com?subject=LinkedIn%20profile%20request";
  }
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});

function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".primary-nav a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const email = String(data.get("email")).trim();
  const subject = String(data.get("subject")).trim();
  const message = String(data.get("message")).trim();
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:dhilipkumar762531@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formStatus.textContent = "Opening your email app with the message details. The message is not sent until you send it there.";
  window.location.href = mailto;
});
