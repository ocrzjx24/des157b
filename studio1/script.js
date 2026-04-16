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

    // rippling
    function initRipples() {
        const $wrapper = $(".video-wrapper");

        try {
            $wrapper.ripples({
                resolution:   256,
                perturbance:  0.03,
                interactive:  false 
            });
        } catch (e) {
            console.warn("jquery.ripples: WebGL unavailable", e);
            return;
        }

        document.addEventListener("click", function (e) {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            $wrapper.ripples("drop", x, y, 120, 0.05);
        });
    }

})();