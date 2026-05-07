import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import { NeatGradient } from "https://cdn.jsdelivr.net/npm/@firecms/neat@latest/+esm";

const CARD_CONFIGS = [
    {
        colors: [
            { color: "#fff4f1", enabled: true },
            { color: "#92969a", enabled: true },
            { color: "#e2e8e3", enabled: true },
            { color: "#5b5459", enabled: true },
        ],
        speed: 5,
        horizontalPressure: 5,
        verticalPressure: 3,
        waveFrequencyX: 3,
        waveFrequencyY: 4,
        waveAmplitude: 7,
        shadows: 1,
        highlights: 2,
        colorSaturation: 9,
        colorBrightness: 1.1,
        colorBlending: 7,
        backgroundColor: "#7B1000",
    },

    {
        colors: [
            { color: "#437f2b", enabled: true },
            { color: "#b7f03c", enabled: true },
            { color: "#3badff", enabled: true },
            { color: "#77b428", enabled: true },
        ],
        speed: 3,
        horizontalPressure: 6,
        verticalPressure: 4,
        waveFrequencyX: 2,
        waveFrequencyY: 2,
        waveAmplitude: 4,
        shadows: 1,
        highlights: 5,
        colorSaturation: 6,
        colorBrightness: 1.2,
        colorBlending: 5,
        backgroundColor: "#004E64",
    },

    {
        colors: [
            { color: "#7B2D8B", enabled: true },
            { color: "#C77DFF", enabled: true },
            { color: "#3A0CA3", enabled: true },
            { color: "#F72585", enabled: true },
        ],
        speed: 4,
        horizontalPressure: 4,
        verticalPressure: 6,
        waveFrequencyX: 4,
        waveFrequencyY: 3,
        waveAmplitude: 9,
        shadows: 3,
        highlights: 2,
        colorSaturation: 8,
        colorBrightness: 0.9,
        colorBlending: 8,
        backgroundColor: "#1A0030",
    },

    {
        colors: [
            { color: "#fac55b", enabled: true },
            { color: "#f5eab9", enabled: true },
            { color: "#fa692f", enabled: true },
            { color: "#ee9631", enabled: true },
        ],
        speed: 6,
        horizontalPressure: 3,
        verticalPressure: 5,
        waveFrequencyX: 5,
        waveFrequencyY: 2,
        waveAmplitude: 6,
        shadows: 1,
        highlights: 6,
        colorSaturation: 10,
        colorBrightness: 1.3,
        colorBlending: 6,
        backgroundColor: "#7A3900",
    },

    {
        colors: [
            { color: "#010911", enabled: true },
            { color: "#0c3149", enabled: true },
            { color: "#2980B9", enabled: true },
            { color: "#00BFFF", enabled: true },
        ],
        speed: 2,
        horizontalPressure: 7,
        verticalPressure: 4,
        waveFrequencyX: 2,
        waveFrequencyY: 5,
        waveAmplitude: 5,
        shadows: 5,
        highlights: 1,
        colorSaturation: 5,
        colorBrightness: 0.75,
        colorBlending: 4,
        backgroundColor: "#020B18",
    },

    {
        colors: [
            { color: "#FF6FA8", enabled: true },
            { color: "#FFAFCC", enabled: true },
            { color: "#BDE0FE", enabled: true },
            { color: "#CDB4DB", enabled: true },
        ],
        speed: 3.5,
        horizontalPressure: 7,
        verticalPressure: 5,
        waveFrequencyX: 2,
        waveFrequencyY: 3,
        waveAmplitude: 5,
        shadows: 1,
        highlights: 2,
        colorSaturation: 4,
        colorBrightness: 1.1,
        colorBlending: 5,
        backgroundColor: "#5E2A4E",
    },

    {
        colors: [
            { color: "#6774d6", enabled: true },
            { color: "#5b74ee", enabled: true },
            { color: "#5eb2d7", enabled: true },
            { color: "#8ed0e3", enabled: true },
        ],
        speed: 2,
        horizontalPressure: 4,
        verticalPressure: 4,
        waveFrequencyX: 2,
        waveFrequencyY: 2,
        waveAmplitude: 2,
        shadows: 0,
        highlights: 4,
        colorSaturation: 6,
        colorBrightness: 1,
        colorBlending: 2,
        backgroundColor: "#0f88f1",
    },

    {
        colors: [
            { color: "#6c091b", enabled: true },
            { color: "#ef2738", enabled: true },
            { color: "#ff7a38", enabled: true },
            { color: "#f8e2c3", enabled: true },
        ],
        speed: 3.5,
        horizontalPressure: 5,
        verticalPressure: 5,
        waveFrequencyX: 3,
        waveFrequencyY: 3,
        waveAmplitude: 5,
        shadows: 0,
        highlights: 4,
        colorSaturation: 6,
        colorBrightness: 1.1,
        colorBlending: 5,
        backgroundColor: "#6d224e",
    },
];

// good amount of reading documentation
// and using google + THE ROBOTS...
// to get this all to work T-T

const track = document.body.querySelector(".card-track");

// clone cards for fake infinite scroll
const originals = [...document.querySelectorAll(".card")];

originals.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

const cards = [...document.querySelectorAll(".card")];
const gradients = [];

// init each card + gradient
cards.forEach((card, index) => {
    const canvas = card.querySelector(".card-gradient");

    const config =
        CARD_CONFIGS[index % CARD_CONFIGS.length];

    const gradient = new NeatGradient({
        ref: canvas,
        ...config,
        // as a note, lower res = runs better without much visual impact
        resolution: 0.35,
    });

    gradients.push(gradient);

    const isEven = index % 2 === 1;

    // init tilt
    card.style.transform =
        isEven
            ? "rotateY(-18deg) rotateX(6deg) translateY(20px)"
            : "rotateY(-18deg) rotateX(6deg)";

    // anim for hover on card
    // lifts + straightens
    card.addEventListener("mouseenter", () => {
        card.classList.add("is-hovered");

        // framer motion is super nice here
        animate(
            card,
            {
                rotateY: 0,
                rotateX: 0,
                scale: 1.06,
                y: 0,
            },
            {
                duration: 0.55,
                easing: [0.22, 1, 0.36, 1],
            }
        );

        gradient.speed = config.speed * 2;
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("is-hovered");

        animate(
            card,
            {
                rotateY: -18,
                rotateX: 6,
                scale: 1,
                y: isEven ? 20 : 0,
            },
            {
                duration: 0.6,
                easing: [0.22, 1, 0.36, 1],
            }
        );

        gradient.speed = config.speed;
    });
});

// stagger intro anim
cards.forEach((card, index) => {
    const isEven = index % 2 === 1;

    animate(
        card,
        {
            opacity: [0, 1],
            rotateY: [-28, -18],
            rotateX: [9, 6],
            y: [60, isEven ? 20 : 0],
            scale: [0.96, 1],
        },
        {
            duration: 1,
            delay: index * 0.05,
            easing: [0.22, 1, 0.36, 1],
        }
    );
});

// infinite scroll logic (found off google)
const singleSetWidth = track.scrollWidth / 2;

track.scrollLeft = singleSetWidth / 2;

function autoScroll() {
    track.scrollLeft += 0.4;

    if (track.scrollLeft >= singleSetWidth) {
        track.scrollLeft -= singleSetWidth;
    }

    requestAnimationFrame(autoScroll);
}

autoScroll();

// cleanup so no webGL leak (apparently important idk)
window.addEventListener("beforeunload", () => {
    gradients.forEach((gradient) => {
        gradient.destroy();
    });
});