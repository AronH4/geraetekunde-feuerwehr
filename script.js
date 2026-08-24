const devices = [
    { id: 1, name: "B-Strahlrohr", side: "fahrerseite", text: "F-Seite hinten | mittig", coords: "1788,660,1693,477" },
    { id: 2, name: "C-Strahlrohr", side: "fahrerseite", text: "F-Seite hinten | mittig", coords: "1686,655,1394,478" },
    { id: 3, name: "Druckbegrenzungsventil", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "608,73,1354,487" },
    { id: 4, name: "Feuerlöscher", side: "beifahrerseite", text: "BF-Seite vorne | hinter der Kübelspritze", coords: "1419,1205,1266,810" },
    { id: 5, name: "Feuerwehrleine", side: "mannschaftskabine", text: "Kabine hinten | bei den ATGs", coords: "1020,631,1285,1136" },
    { id: 6, name: "Handscheinwerfer", side: "mannschaftskabine", text: "Kabine vorne | zwischen den Sitzen", coords: "737,643,911,777" },
    { id: 7, name: "Kübelspritze", side: "beifahrerseite", text: "BF-Seite vorne | mittig unten", coords: "1459,1203,1305,762" },
    { id: 8, name: "Kupplungsschlüssel", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "608,73,1354,487" },
    { id: 9, name: "Mehrzweckleine", side: "heck", text: "Rückseite | im Maschinistenkorb (rot)", coords: "608,73,1354,487" },
    { id: 10, name: "Sammelstück", side: "heck", text: "Rückseite | oben links von der Pumpe", coords: "510,477,795,787" },
    { id: 11, name: "Saugkorb", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "608,73,1354,487" },
    { id: 12, name: "Saugschutzkorb", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "608,73,1354,487" },
    { id: 13, name: "Schachthaken", side: "beifahrerseite", text: "BF-Seite hinten | links am Rand", coords: "210,939,121,774" },
    { id: 14, name: "Schlauchhalter", side: "fahrerseite", text: "F-Seite vorne | oben links bei Beleuchtung", coords: "260,578,150,442" },
    { id: 15, name: "Standrohr", side: "beifahrerseite", text: "BF-Seite hinten | unterhalb der Schläuche", coords: "719,758,496,643" },
    { id: 16, name: "Stützkrümmer", side: "fahrerseite", text: "F-Seite hinten | mittig oben", coords: "1695,475,1589,328" },
    { id: 17, name: "Überflurhydrantenschlüssel", side: "beifahrerseite", text: "BF-Seite hinten | links von den Leitkegeln", coords: "365,1031,240,939" },
    { id: 18, name: "Verteiler", side: "beifahrerseite", text: "BF-Seite hinten | unten links", coords: "511,1368,250,1212" },
    { id: 19, name: "Unterflurhydrantenschlüssel", side: "beifahrerseite", text: "BF-Seite hinten | unterhalb des Standrohres", coords: "772,812,455,741" },
    { id: 20, name: "Übergangsstück A-B", side: "heck", text: "Rückseite | oben rechts von der Pumpe", coords: "1209,479,1451,608" },
    { id: 21, name: "Übergangsstück B-C", side: "beifahrerseite", text: "BF-Seite hinten | oberhalb vom Verteiler", coords: "568,1205,455,1149" },
    { id: 22, name: "Verbandskasten", side: "mannschaftskabine", text: "Kabine hinten | an der Rückwand", coords: "1791,741,1961,1121" },
    { id: 23, name: "Brechstange/Halligan Tool", side: "fahrerseite", text: "F-Seite vorne | ziemlich links am Rand", coords: "389,711,248,577" },
    { id: 24, name: "Feuerwehraxt", side: "fahrerseite", text: "F-Seite vorne | unten links", coords: "390,1118,251,948" },
    { id: 25, name: "Reservekraftstoffkanister", side: "fahrerseite", text: "F-Seite hinten | mittig oben", coords: "1589,476,1486,302" },
    { id: 26, name: "Unterlegkeil", side: "mannschaftskabine", text: "Kabine vorne | unter Fahrersitz", coords: "446,1032,685,1219" },
    { id: 27, name: "Werkzeugkasten", side: "beifahrerseite", text: "BF-Seite vorne | oben neben den Schläuchen", coords: "1442,663,1287,469" },
    { id: 28, name: "Warndreieck", side: "beifahrerseite", text: "BF-Seite hinten | rechts am Rahmen", coords: "852,835,768,715" },
    { id: 29, name: "Warnweste", side: "mannschaftskabine", text: "Kabine hinten | unter den Sitzen", coords: "1300,833,1614,1423" },
    { id: 30, name: "Warn-/Sicherungsleuchte", side: "beifahrerseite", text: "BF-Seite hinten | unten rechts im Korb", coords: "841,1046,586,834" }
];

let mode = "";
let currentQueue = [];
let currentTarget = null;
let currentSide = "";
let foundCount = 0;
let errorCount = 0;
let deviceAttempts = 0;
let startTime = 0;
let activeHighlightDev = null;

function showStartScreen() {
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("main-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
}

function startTest() {
    mode = "test";
    foundCount = 0;
    errorCount = 0;
    currentQueue = [...devices].sort(() => Math.random() - 0.5);
    
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("quiz-info").classList.remove("hidden");
    document.getElementById("overview-grid").classList.add("hidden");
    document.getElementById("info-box").classList.add("hidden");
    
    updateStats();
    startTime = Date.now();
    switchView('fahrerseite');
    nextTestDevice();
}

function nextTestDevice() {
    if (currentQueue.length === 0) {
        finishTest();
        return;
    }
    deviceAttempts = 0;
    currentTarget = currentQueue.pop();
    document.getElementById("target-device-name").innerText = currentTarget.name;
    document.getElementById("info-box").classList.add("hidden");
    hideHighlight();
}

function finishTest() {
    const durationSec = Math.floor((Date.now() - startTime) / 1000);
    const min = Math.floor(durationSec / 60);
    const sec = durationSec % 60;
    
    document.getElementById("main-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    
    document.getElementById("res-found").innerText = foundCount;
    document.getElementById("res-errors").innerText = errorCount;
    document.getElementById("res-time").innerText = `${min}m ${sec}s`;
}

function updateStats() {
    document.getElementById("found-count").innerText = foundCount;
    document.getElementById("error-count").innerText = errorCount;
}

function startOverview() {
    mode = "overview";
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("quiz-info").classList.add("hidden");
    document.getElementById("overview-grid").classList.remove("hidden");
    
    renderOverviewGrid();
    switchView("fahrerseite");
}

function renderOverviewGrid() {
    const grid = document.getElementById("overview-grid");
    grid.innerHTML = "";
    devices.forEach(dev => {
        const btn = document.createElement("button");
        btn.innerText = dev.name;
        btn.onclick = () => selectOverviewDevice(dev, btn);
        grid.appendChild(btn);
    });
}

function selectOverviewDevice(dev, btnElement) {
    document.querySelectorAll(".overview-grid button").forEach(b => b.classList.remove("active"));
    btnElement.classList.add("active");
    
    const infoBox = document.getElementById("info-box");
    infoBox.innerText = `${dev.name}: ${dev.text}`;
    infoBox.classList.remove("hidden");

    activeHighlightDev = dev;
    if (currentSide !== dev.side) {
        switchView(dev.side);
    } else {
        highlightDevice(dev);
    }
}

function switchView(side) {
    currentSide = side;
    const img = document.getElementById("vehicle-img");
    document.getElementById("view-title").innerText = side.toUpperCase();
    
    hideHighlight();

    const updateViewContent = () => {
        buildMap();
        if (activeHighlightDev && activeHighlightDev.side === currentSide) {
            highlightDevice(activeHighlightDev);
        }
    };

    img.onload = updateViewContent;

    if (side === "mannschaftskabine" || side === "vogelperspektive") {
        img.src = `./img/${side}.jpg`;
    } else {
        img.src = `./img/${side}.jpeg`;
    }

    if (img.complete && img.naturalWidth !== 0) {
        updateViewContent();
    }
}

function buildMap() {
    const map = document.getElementById("vehicle-map");
    const img = document.getElementById("vehicle-img");
    map.innerHTML = "";

    if (!img.naturalWidth || !img.naturalHeight) return;

    const sideDevices = devices.filter(d => d.side === currentSide);
    
    sideDevices.forEach(dev => {
        const raw = dev.coords.split(',').map(Number);
        
        const scaleX = img.clientWidth / img.naturalWidth;
        const scaleY = img.clientHeight / img.naturalHeight;

        const x1 = Math.round(Math.min(raw[0], raw[2]) * scaleX);
        const y1 = Math.round(Math.min(raw[1], raw[3]) * scaleY);
        const x2 = Math.round(Math.max(raw[0], raw[2]) * scaleX);
        const y2 = Math.round(Math.max(raw[1], raw[3]) * scaleY);

        const area = document.createElement("area");
        area.shape = "rect";
        area.coords = `${x1},${y1},${x2},${y2}`;
        area.href = "javascript:void(0);";
        area.onclick = () => handleAreaClick(dev);
        map.appendChild(area);
    });
}

// Hilfsfunktion: Prüft, ob zwei Koordinatenbereiche sich überlappen
function doCoordsOverlap(coordsA_str, coordsB_str) {
    const a = coordsA_str.split(',').map(Number);
    const b = coordsB_str.split(',').map(Number);
    
    const ax1 = Math.min(a[0], a[2]), ax2 = Math.max(a[0], a[2]);
    const ay1 = Math.min(a[1], a[3]), ay2 = Math.max(a[1], a[3]);
    
    const bx1 = Math.min(b[0], b[2]), bx2 = Math.max(b[0], b[2]);
    const by1 = Math.min(b[1], b[3]), by2 = Math.max(b[1], b[3]);

    return !(ax2 < bx1 || ax1 > bx2 || ay2 < by1 || ay1 > by2);
}

function handleAreaClick(clickedDev) {
    if (mode === "test") {
        // Richtiger Bereich, wenn gleiches Gerät ODER Überlappung am selben Fahrzeugbereich
        const isCorrectArea = (clickedDev.side === currentTarget.side && doCoordsOverlap(clickedDev.coords, currentTarget.coords)) 
                              || clickedDev.id === currentTarget.id;

        if (isCorrectArea) {
            foundCount++;
            updateStats();
            alert("Richtig gefunden!");
            nextTestDevice();
        } else {
            errorCount++;
            deviceAttempts++;
            updateStats();
            
            if (deviceAttempts < 2) {
                alert("Falsch! Du hast noch 1 Versuch.");
            } else {
                alert(`Leider falsch. Das gesuchte Gerät befindet sich hier: ${currentTarget.text}`);
                activeHighlightDev = currentTarget;
                if (currentTarget.side !== currentSide) {
                    switchView(currentTarget.side);
                } else {
                    highlightDevice(currentTarget);
                }
                setTimeout(nextTestDevice, 3500);
            }
        }
    } else if (mode === "overview") {
        const infoBox = document.getElementById("info-box");
        infoBox.innerText = `${clickedDev.name}: ${clickedDev.text}`;
        infoBox.classList.remove("hidden");
        activeHighlightDev = clickedDev;
        highlightDevice(clickedDev);
    }
}

function highlightDevice(dev) {
    if (!dev || dev.side !== currentSide) return;

    const img = document.getElementById("vehicle-img");
    const overlay = document.getElementById("highlight-overlay");

    if (!img.clientWidth || !img.naturalWidth) return;

    const coords = dev.coords.split(',').map(Number);
    
    const scaleX = img.clientWidth / img.naturalWidth;
    const scaleY = img.clientHeight / img.naturalHeight;

    const x1 = Math.min(coords[0], coords[2]) * scaleX;
    const y1 = Math.min(coords[1], coords[3]) * scaleY;
    const x2 = Math.max(coords[0], coords[2]) * scaleX;
    const y2 = Math.max(coords[1], coords[3]) * scaleY;

    const left = x1;
    const top = y1;
    const width = x2 - x1;
    const height = y2 - y1;

    overlay.style.left = `${left}px`;
    overlay.style.top = `${top}px`;
    overlay.style.width = `${width}px`;
    overlay.style.height = `${height}px`;
    overlay.style.display = "block";
}

function hideHighlight() {
    activeHighlightDev = null;
    const overlay = document.getElementById("highlight-overlay");
    if (overlay) overlay.style.display = "none";
}

window.addEventListener('resize', () => {
    buildMap();
    if (activeHighlightDev) {
        highlightDevice(activeHighlightDev);
    }
});
