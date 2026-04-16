(function () {
    "use strict";

    const video = document.querySelector("#mainVideo");
    const loader = document.querySelector("#loader");
    const container = document.querySelector(".container");
    
    container.classList.add("hidden");

    video.addEventListener("playing", function () {
        loader.style.display = "none";
        container.classList.remove("hidden");
    });

})();