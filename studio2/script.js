// silly time helper
// i was rlly stuck on how to make the times work so i figured this out with
// google and the ROBOTS...

function parseTime(str) {
    const isPM = str.includes("PM");
    const isAM = str.includes("AM");
    const parts = str.replace(/[APM]/g, "").split(":");
    let h = parseInt(parts[0]);
    let m = parseInt(parts[1]);

    if (isPM && h !== 12) { 
        h = h + 12; 
    }
    if (isAM && h === 12) { 
        h = 0; 
    }

    const totalMin = (h * 60) + m;
    const startMin = 23 * 60; // 11 pm
    let diff = totalMin - startMin;
    if (diff < 0) { 
        diff = diff + (24 * 60); 
    } // crossed midnight
    return diff;
}

const endMin = parseTime("2:00AM"); // full length of timeline in mins

// drunkenness based on pos
function drunkLvl(pos) {
    if (pos < 0.25) { return 0; }
    if (pos < 0.50) { return 1; }
    if (pos < 0.75) { return 2; }
    return 3
}

const drunkenness = ["\"hi guys!\"", "\"nah nah i'm good\"", "\"i'm feeling fiiiiine\"", "\"YOU'RE SO TUFFF!!\""];
const drunkCols = ["#5267b4", "#2f93c1", "#1fded1", "#77ff00"];

(async function () {
    // pull all the info from the json file
    const response = await fetch("drunkCalls.json");
    const drunkCalls = await response.json();

    // array of call objs
    // if there is a second time attribute, then just add separately
    const events = [];

    drunkCalls.forEach(function(call) {
        const t = parseTime(call.time);
        events.push({
            name: call.name,
            time: call.time,
            dialogue: call.dialogue,
            min: t,
            pos: t / endMin,
        });

        if (call.time2) {
            const t2 = parseTime(call.time2);
            events.push({
                name: call.name,
                time: call.time2,
                dialogue: call.dialogue2,
                min: t2,
                pos: t2 / endMin,
            });
        }
    });

    // sort so they show up on timeline accordingly
    events.sort(function(a, b) { 
        return a.min - b.min; 
    });

    // dom elements
    const timeline = document.querySelector(".timeline-track");
    const fill = document.querySelector(".timeline-fill");
    const ticks = document.querySelector(".timeline-ticks");
    const talking = document.querySelector(".jason-talk");
    const marker = document.querySelector(".drunk-head");
    const popup = document.querySelector(".popup");

    marker.innerHTML = '<img src="images/jason1.png" alt="jx">';

    // create tick marks at accurate positions
    // defo required some googling
    events.forEach(function(ev) {
        const tick = document.createElement("div");
        tick.className = "tick";
        tick.style.left = (ev.pos * 100) + "%";
        ticks.appendChild(tick);
    });

    // dragging logic
    let isDragging = false;

    function getPos(clientX) {
        const rect = timeline.getBoundingClientRect();
        return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    }

    function updateMarker(pos) {
        marker.style.left = (pos * 100) + "%";
        fill.style.width = (pos * 100) + "%";

        //update drunk level + colors
        const level = drunkLvl(pos);
        talking.textContent = drunkenness[level];
        talking.style.color = drunkCols[level];
        marker.style.background = drunkCols[level];
        marker.style.boxShadow = "0 0 18px 4px " + drunkCols[level] + "88";

        let imgNum = level + 1;
        marker.querySelector("img").src = "images/jason" + imgNum +".png"; // change pic for drunk jason head

        // check for tick within radius of 0.02
        const nearbyEvent = events.find(function(event) {
            return Math.abs(pos - event.pos) < 0.02;
        });

        if (nearbyEvent) {
            showPopup(nearbyEvent, pos);
        } else {
            hidePopup();
        }

        // tick style changer
        const allTicks = document.querySelectorAll(".tick");
        allTicks.forEach(function(tick, i) {
            if (pos >= events[i].pos - 0.005) {
                tick.classList.add("passed");
            } else {
                tick.classList.remove("passed");
            }
        });
    }

    function showPopup(ev, markerPos) { // fn to show the popup only when draggable jason is near tick
        document.querySelector(".popup-name").textContent = ev.name;
        document.querySelector(".popup-time").textContent = ev.time;
        document.querySelector(".popup-dialogue").textContent = ev.dialogue;

        popup.style.left = (markerPos * 100) + "%";
        popup.style.display = "block";
        popup.classList.add("visible");
    }

    function hidePopup() {
        popup.classList.remove("visible");
        // wait for fadeout before fully hiding
        setTimeout(function() {
            if (!popup.classList.contains("visible")) {
                popup.style.display = "none";
            }
        }, 250);
    }

    marker.addEventListener("mousedown", function(e) {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
        updateMarker(getPos(e.clientX));
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    updateMarker(0);
})();