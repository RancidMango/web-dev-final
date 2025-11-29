const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
    });
}

const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const modalClose = document.getElementById("modal-close");
const loginForm = document.getElementById("login-form");
const formMessage = document.getElementById("form-message");

if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
        loginModal.classList.add("show");
    });
}

if (modalClose && loginModal) {
    modalClose.addEventListener("click", () => {
        loginModal.classList.remove("show");
        if (formMessage) {
            formMessage.textContent = "";
            formMessage.className = "form-message";
        }
    });
}

if (loginModal) {
    loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove("show");
            if (formMessage) {
                formMessage.textContent = "";
                formMessage.className = "form-message";
            }
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "demo@gmail.com" && password === "12345") {
            formMessage.textContent = "Login successful. This is a demo only.";
            formMessage.className = "form-message success";
        } else {
            formMessage.textContent = "Invalid demo credentials. Try demo@gmail.com and 12345.";
            formMessage.className = "form-message error";
        }
    });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            projectCards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow = filter === "all" || category === filter;
                card.style.display = shouldShow ? "block" : "none";
            });
        });
    });
}

const revealElements = document.querySelectorAll(".reveal");

const handleReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

const statValues = document.querySelectorAll(".stat-value");
let countersStarted = false;

const runCountersIfVisible = () => {
    const statsSection = document.getElementById("stats");
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.8;

    if (visible && !countersStarted) {
        countersStarted = true;
        statValues.forEach((el) => animateCounter(el));
    }
};

const animateCounter = (element) => {
    const target = Number(element.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 120));

    const step = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
        } else {
            element.textContent = current;
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

window.addEventListener("scroll", runCountersIfVisible);
window.addEventListener("load", runCountersIfVisible);

const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (contactMessage) {
            contactMessage.textContent = "Message sent. This is a front-end demo.";
            contactMessage.className = "form-message success";
        }
        contactForm.reset();
    });
}

const themeToggle = document.getElementById("theme-toggle");
const toggleIcon = themeToggle ? themeToggle.querySelector(".toggle-icon") : null;

const setTheme = (mode) => {
    if (mode === "light") {
        document.body.classList.add("light");
        if (toggleIcon) toggleIcon.textContent = "☀️";
    } else {
        document.body.classList.remove("light");
        if (toggleIcon) toggleIcon.textContent = "🌙";
    }
    localStorage.setItem("novatask-theme", mode);
};

const storedTheme = localStorage.getItem("novatask-theme");
setTheme(storedTheme === "light" ? "light" : "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light");
        setTheme(isLight ? "dark" : "light");
    });
}
