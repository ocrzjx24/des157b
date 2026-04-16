(function () {
    "use strict";

    const video     = document.querySelector("#mainVideo");
    const loader    = document.querySelector("#loader");
    const container = document.querySelector(".container");
    const wrapper   = document.querySelector(".video-wrapper");

    function showVideo() {
        loader.style.display = "none";
        container.classList.remove("hidden");
        initRipples();
    }

    // handle cached video
    if (video.readyState >= 2) {
        showVideo();
    } else {
        video.addEventListener("loadeddata", showVideo, { once: true });
    }

    // parallax
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        wrapper.style.transform = `translate(${x}px, ${y}px)`;
    });

    // ripples courtesy jsquery script i found
    function initRipples() {
        const $ripple = $(".ripple-layer");

        $ripple.ripples({
            resolution:  256,
            perturbance: 0.02,
            dropRadius:  20,
            interactive: false
        });

        document.querySelector(".ripple-layer").addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            $ripple.ripples("drop", x, y, 20, 0.08);
        });
    }

    // lines that show up when you click
    // random poem i thought of at 3am
    const lines = [
        "we find ourselves here again",
        "familiar, comfortable",
        "i think of my brothers",
        "the pearl and the anchor",
        "and i smile",
        "'some of my favorite memories...'",
        "'are the ones i think the least of in the moment'",
        "a fellow feeling",
        "something i can forever trust",
        "however far it may seem",
        "eventually",
    ];

    let lineIndex = 0;

    document.addEventListener("click", function (e) {
        const el = document.createElement("span");
        el.classList.add("poem-line");
        el.textContent = lines[lineIndex % lines.length];
        el.style.left = e.clientX + "px";
        el.style.top  = e.clientY + "px";

        document.body.appendChild(el);
        el.addEventListener("animationend", () => el.remove());
        lineIndex++;
    });

})();