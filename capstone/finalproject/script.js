const panel = document.querySelector("#panel");
const overlay = document.querySelector("#overlay");
const pbody = document.querySelector("#panel-body");
const entries = document.querySelectorAll(".entry");

const supabaseUrl = "https://wytooowufspasghfvkfr.supabase.co";
const supabaseKey = "sb_publishable_dU1SHu1wOfx-BySisvEC_w_8PAxt8dI";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const templates = {

    f451: function (b) {
        return themedPanel(b, "panel-f451");
    },

    orwell: function (b) {
        return themedPanel(b, "panel-orwell");
    },

    handmaid: function (b) {
        return themedPanel(b, "panel-handmaid");
    },

    androids: function (b) {
        return themedPanel(b, "panel-androids");
    },

    snowcrash: function (b) {
        return themedPanel(b, "panel-snow");
    },

    bnw: function (b) {
        return themedPanel(b, "panel-bnw");
    }
};

function openPanel(i, books) {
    var b = books[i];
    var tmpl = b.template && templates[b.template] ? b.template : "default";

    pbody.innerHTML = templates[tmpl](b);

    document.querySelector("#close-btn").addEventListener("click", closePanel);

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

    setTimeout(function () {
        panel.className = "";
        overlay.classList.remove("open");
    }, 360);
}

function themedPanel(b, cls) {
    panel.className = "open " + cls;

    panel.style.background = "";
    panel.style.borderColor = "";

    ["--p-accent", "--p-border"].forEach(function (v) {
        panel.style.removeProperty(v);
    });

    return `
        <button id="close-btn">close ✕</button>

        <p class="p-yr">set in ${b.set} — written ${b.year}</p>

        <h3>${b.title}</h3>

        <p class="p-auth">by ${b.author}</p>

        <div class="tags">
            ${b.tags.map(function (t) {
                return `<span class="tag-pill">${t}</span>`;
            }).join("")}
        </div>

        <hr>

        <p class="sec-label">SUMMARY</p>
        <p class="p-context">${b.context}</p>

        <hr>

        <p class="sec-label">BULLETS</p>
        <ul class="verdict-list verdict-list-main">
            ${b.main.map(function (p) {
                return `<li>${p}</li>`;
            }).join("")}
        </ul>

        <hr>

        <p class="sec-label">LOOKBACK</p>
        <p class="p-analysis">${b.analysis}</p>
    `;
}

overlay.addEventListener("click", closePanel);

fetch("books.json")
    .then(function (r) {
        return r.json();
    })
    .then(function (books) {
        entries.forEach(function (el) {
            el.style.opacity = "0";
            el.style.transform = "translateY(24px)";
        });

        var observer = new IntersectionObserver(function (observed) {
            observed.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var el = entry.target;
                var i = Array.prototype.indexOf.call(entries, el);

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

        entries.forEach(function (el) {
            observer.observe(el);
        });

        VanillaTilt.init(entries, {
            max: 15,
            speed: 500,
            glare: true,
            "max-glare": 0.08,
            perspective: 1200
        });

        entries.forEach(function (el, i) {
            el.addEventListener("click", function () {
                openPanel(i, books);
            });
        });
    });

var cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

var hoverTargets = document.querySelectorAll("button, .entry, a");

hoverTargets.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
        cursor.classList.add("active");
    });

    el.addEventListener("mouseleave", function () {
        cursor.classList.remove("active");
    });
});

var form = document.querySelector("#capsule-form");

var resultsPanel = document.createElement("div");
resultsPanel.id = "results";
resultsPanel.style.marginTop = "2rem";
document.querySelector(".capsule").appendChild(resultsPanel);

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var q1 = document.querySelector('input[name="q1"]:checked')?.value;
    var q2 = document.querySelector('input[name="q2"]:checked')?.value;
    var q3 = document.querySelector('input[name="q3"]:checked')?.value;
    var q4 = document.querySelector('input[name="q4"]:checked')?.value;

    if (!q1 || !q2 || !q3 || !q4) {
        alert("Please answer all questions.");
        return;
    }

    var insertResult = await supabaseClient
        .from("submissions")
        .insert([{ q1: q1, q2: q2, q3: q3, q4: q4 }]);

    if (insertResult.error) {
        console.error(insertResult.error);
        alert("Failed to save response.");
        return;
    }

    var fetchResult = await supabaseClient
        .from("submissions")
        .select("*");

    if (fetchResult.error) {
        console.error(fetchResult.error);
        alert("Failed to fetch results.");
        return;
    }

    var data = fetchResult.data;

    function count(field) {
        var map = {};
        data.forEach(function (row) {
            var val = row[field];
            map[val] = (map[val] || 0) + 1;
        });
        return map;
    }

    var q1Counts = count("q1");
    var q2Counts = count("q2");
    var q3Counts = count("q3");
    var q4Counts = count("q4");

    var total = data.length;

    function render(map) {
        var sorted = Object.entries(map).sort(function (a, b) {
            return b[1] - a[1];
        });

        return sorted
            .map(function (item) {
                var key = item[0];
                var val = item[1];
                var percent = (val / total) * 100;

                return `
                    <div class="bar-row">
                        <div class="bar-label">${key}</div>
                        <div class="bar-track">
                            <div class="bar-fill" style="width:${percent}%"></div>
                        </div>
                        <div class="bar-pct">${percent.toFixed(1)}%</div>
                    </div>
                `;
            })
            .join("");
    }

    resultsPanel.innerHTML =
        "<div class='results-wrap'>" +
        "<h2>Capsule Results</h2>" +
        "<h4>Most frightening future</h4>" +
        render(q1Counts) +
        "<h4>Most \"preferable\" future</h4>" +
        render(q2Counts) +
        "<h4>Likely to collapse</h4>" +
        render(q3Counts) +
        "<h4>Least \"human\"</h4>" +
        render(q4Counts) +
        "<p class='results-total'><em>Total responses: " + total + "</em></p>" +
        "</div>";
    form.reset();
});