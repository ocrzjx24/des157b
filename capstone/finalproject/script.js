const books = [
    {
        year: 1949,
        title: "Nineteen Eighty-Four",
        author: "George Orwell",
        premise: "book summary here",
        notes: [
        { v: "true",    claim: "prediction one",   detail: "true or not analysis" },
        { v: "partial", claim: "prediction two",   detail: "true or not analysis" },
        { v: "false",   claim: "Prediction three", detail: "true or not analysis" },
        ]
    },
    {
        year: 1968,
        title: "Do Androids Dream of Electric Sheep?",
        author: "Philip K. Dick",
        premise: "book summary here",
        notes: [
        { v: "true",    claim: "prediction one",   detail: "true or not analysis" },
        { v: "partial", claim: "prediction two",   detail: "true or not analysis" },
        { v: "false",   claim: "Prediction three", detail: "true or not analysis" },
        ]
    },
    {
        year: 1985,
        title: "The Handmaid's Tale",
        author: "Margaret Atwood",
        premise: "book summary here",
        notes: [
        { v: "true",    claim: "prediction one",   detail: "true or not analysis" },
        { v: "partial", claim: "prediction two",   detail: "true or not analysis" },
        { v: "false",   claim: "Prediction three", detail: "true or not analysis" },
        ]
    },
    {
        year: 1992,
        title: "Snow Crash",
        author: "Neal Stephenson",
        premise: "book summary here",
        notes: [
        { v: "true",    claim: "prediction one",   detail: "true or not analysis" },
        { v: "partial", claim: "prediction two",   detail: "true or not analysis" },
        { v: "false",   claim: "Prediction three", detail: "true or not analysis" },
        ]
    },
    {
        year: 1953,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        premise: "book summary here",
        notes: [
        { v: "true",    claim: "prediction one",   detail: "true or not analysis" },
        { v: "partial", claim: "prediction two",   detail: "true or not analysis" },
        { v: "false",   claim: "Prediction three", detail: "true or not analysis" },
        ]
    },
    {
        year: 1932,
        title: "Brave New World",
        author: "Aldous Huxley",
        premise: "book summary here",
        notes: [
        { v: "true",    claim: "prediction one",   detail: "true or not analysis" },
        { v: "partial", claim: "prediction two",   detail: "true or not analysis" },
        { v: "false",   claim: "Prediction three", detail: "true or not analysis" },
        ]
    },
];

const entries = document.querySelectorAll(".entry");

entries.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
});

const observer = new IntersectionObserver((observed) => {
    observed.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const i  = [...entries].indexOf(el);
        anime({
            targets: el,
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 600,
            delay: i * 80,
            easing: "easeOutQuart"
        });
        observer.unobserve(el);
    });
}, { threshold: 0.1 });

entries.forEach(el => observer.observe(el));

VanillaTilt.init(entries, {
    max: 15,
    speed: 500,
    glare: true,
    "max-glare": 0.08,
    perspective: 1200
});

const panel   = document.getElementById("panel");
const overlay = document.getElementById("overlay");
const pbody   = document.getElementById("panel-body");
const labels  = { true: "Came true", partial: "Partially true", false: "Didn't come true" };

function openPanel(i) {
    const b = books[i];
    pbody.innerHTML = `
        <button id="close-btn">close ✕</button>
        <p class="p-yr">${b.year}</p>
        <h3>${b.title}</h3>
        <p class="p-auth">by ${b.author}</p>
        <hr>
        <p class="p-premise">${b.premise}</p>
        <hr>
        <ul class="findings">
        ${b.notes.map(n => `
            <li class="finding finding-${n.v}">
            <span class="verdict">${labels[n.v]}</span>
            <p>${n.claim}</p>
            <p class="detail">${n.detail}</p>
            </li>
        `).join("")}
        </ul>
    `;
    document.getElementById("close-btn").addEventListener("click", closePanel);
    panel.classList.add("open");
    overlay.classList.add("open");
    anime({ 
        targets: panel,   
        translateX: ["100%", "0%"], 
        duration: 400, 
        easing: "easeOutQuart" 
    });
    anime({ 
        targets: overlay, 
        opacity: [0, 1],
        duration: 300 
    });
}

function closePanel() {
    anime({ 
        targets: panel,   
        translateX: "100%", 
        duration: 350, 
        easing: "easeInQuart" 
    });
    anime({ 
        targets: overlay, 
        opacity: 0, 
        duration: 300 
    });
    
    setTimeout(() => {
        panel.classList.remove("open");
        overlay.classList.remove("open");
    }, 360);
}

overlay.addEventListener("click", closePanel);
entries.forEach((el, i) => el.addEventListener("click", () => openPanel(i)));