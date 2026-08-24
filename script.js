const devices = [
    { id: 1, name: "B-Strahlrohr", side: "fahrerseite", text: "F-Seite hinten | mittig", coords: "1795,668,1679,478" },
    { id: 2, name: "C-Strahlrohr", side: "fahrerseite", text: "F-Seite hinten | mittig", coords: "1690,664,1388,414" },
    { id: 3, name: "Druckbegrenzungsventil", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "632,772,1104,317" },
    { id: 4, name: "Feuerlöscher", side: "beifahrerseite", text: "BF-Seite vorne | hinter der Kübelspritze", coords: "1251,1081,1390,775" },
    { id: 5, name: "Feuerwehrleine", side: "mannschaftskabine", text: "Kabine hinten | bei den ATGs", coords: "1542,811,1921,1533,2755,442,2990,947" },
    { id: 6, name: "Handscheinwerfer", side: "mannschaftskabine", text: "Kabine vorne | zwischen den Sitzen", coords: "1088,793,1369,1034,2068,935,2248,1118,1417,1240,1645,1554" },
    { id: 7, name: "Kübelspritze", side: "beifahrerseite", text: "BF-Seite vorne | mittig unten", coords: "1296,1206,1473,754" },
    { id: 8, name: "Kupplungsschlüssel", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "632,772,1104,317" },
    { id: 9, name: "Mehrzweckleine", side: "heck", text: "Rückseite | im Maschinistenkorb (rot)", coords: "632,772,1104,317" },
    { id: 10, name: "Sammelstück", side: "heck", text: "Rückseite | oben links von der Pumpe", coords: "239,1047,547,716" },
    { id: 11, name: "Saugkorb", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "632,772,1104,317" },
    { id: 12, name: "Saugschutzkorb", side: "heck", text: "Rückseite | im Maschinistenkorb", coords: "632,772,1104,317" },
    { id: 13, name: "Schachthaken", side: "beifahrerseite", text: "BF-Seite hinten | links am Rand", coords: "133,941,205,763" },
    { id: 14, name: "Schlauchhalter", side: "fahrerseite", text: "F-Seite vorne | oben links bei Beleuchtung", coords: "278,579,143,436" },
    { id: 15, name: "Standrohr", side: "beifahrerseite", text: "BF-Seite hinten | unterhalb der Schläuche", coords: "500,745,727,649" },
    { id: 16, name: "Stützkrümmer", side: "fahrerseite", text: "F-Seite hinten | mittig oben", coords: "1700,477,1581,326" },
    { id: 17, name: "Überflurhydrantenschlüssel", side: "beifahrerseite", text: "BF-Seite hinten | links von den Leitkegeln", coords: "225,1037,370,934" },
    { id: 18, name: "Verteiler", side: "beifahrerseite", text: "BF-Seite hinten | unten links", coords: "234,1385,531,1163" },
    { id: 19, name: "Unterflurhydrantenschlüssel", side: "beifahrerseite", text: "BF-Seite hinten | unterhalb des Standrohres", coords: "444,805,777,733" },
    { id: 20, name: "Übergangsstück A-B", side: "heck", text: "Rückseite | oben rechts von der Pumpe", coords: "943,865,1198,745" },
    { id: 21, name: "Übergangsstück B-C", side: "beifahrerseite", text: "BF-Seite hinten | oberhalb vom Verteiler", coords: "446,1218,583,1147" },
    { id: 22, name: "Verbandskasten", side: "mannschaftskabine", text: "Kabine hinten | an der Rückwand", coords: "2681,993,2917,1493" },
    { id: 23, name: "Brechstange/Halligan Tool", side: "fahrerseite", text: "F-Seite vorne | ziemlich links am Rand", coords: "375,717,244,574" },
    { id: 24, name: "Feuerwehraxt", side: "fahrerseite", text: "F-Seite vorne | unten links", coords: "392,1127,246,951" },
    { id: 25, name: "Reservekraftstoffkanister", side: "fahrerseite", text: "F-Seite hinten | mittig oben", coords: "1602,475,1482,297" },
    { id: 26, name: "Unterlegkeil", side: "mannschaftskabine", text: "Kabine vorne | unter Fahrersitz", coords: "653,1382,952,1604" },
    { id: 27, name: "Werkzeugkasten", side: "beifahrerseite", text: "BF-Seite vorne | oben neben den Schläuchen", coords: "1286,671,1439,461" },
    { id: 28, name: "Warndreieck", side: "beifahrerseite", text: "BF-Seite hinten | rechts am Rahmen", coords: "765,852,857,719" },
    { id: 29, name: "Warnweste", side: "mannschaftskabine", text: "Kabine hinten | unter den Sitzen", coords: "1974,1121,2431,1894" },
    { id: 30, name: "Warn-/Sicherungsleuchte", side: "beifahrerseite", text: "BF-Seite hinten | unten rechts im Korb", coords: "579,983,841,836" }
];

let mode = "";
let currentQueue = [];
let currentTarget = null;
let currentSide = "";
let foundCount = 0;
let errorCount = 0;
let deviceAttempts = 0;
let startTime = 0;

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
    
    switchView(dev.side);
    
    const infoBox = document.getElementById("info-box");
    infoBox.innerText = `${dev.name}: ${dev.text}`;
    infoBox.classList.remove("hidden");

    highlightDevice(dev);
}

function switchView(side) {
    currentSide = side;
    const img = document.getElementById("vehicle-img");
    
    // Unterscheidung der Dateiendungen je nach Bild
    if (side === "mannschaftskabine") {
        img.src = `./img/${side}.jpg`;
    } else {
        img.src = `./img/${side}.jpeg`;
    }
    
    document.getElementById("view-title").innerText = side.toUpperCase();
    hideHighlight();

    img.onload = () => {
        buildMap();
        if (typeof imageMapResize === "function") imageMapResize();
    };
}

function buildMap() {
    const map = document.getElementById("vehicle-map");
    map.innerHTML = "";

    const sideDevices = devices.filter(d => d.side === currentSide);
    
    sideDevices.forEach(dev => {
        const area = document.createElement("area");
        area.shape = "rect";
        area.coords = dev.coords;
        area.href = "javascript:void(0);";
        area.onclick = () => handleAreaClick(dev);
        map.appendChild(area);
    });
}

function handleAreaClick(clickedDev) {
    if (mode === "test") {
        if (clickedDev.id === currentTarget.id) {
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
                switchView(currentTarget.side);
                highlightDevice(currentTarget);
                setTimeout(nextTestDevice, 3000);
            }
        }
    } else if (mode === "overview") {
        const infoBox = document.getElementById("info-box");
        infoBox.innerText = `${clickedDev.name}: ${clickedDev.text}`;
        infoBox.classList.remove("hidden");
        highlightDevice(clickedDev);
    }
}

function highlightDevice(dev) {
    if (dev.side !== currentSide) return;

    const img = document.getElementById("vehicle-img");
    const overlay = document.getElementById("highlight-overlay");
    
    const coords = dev.coords.split(',').map(Number);
    
    const scaleX = img.clientWidth / img.naturalWidth;
    const scaleY = img.clientHeight / img.naturalHeight;

    const x1 = coords[0] * scaleX;
    const y1 = coords[1] * scaleY;
    const x2 = coords[2] * scaleX;
    const y2 = coords[3] * scaleY;

    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);

    overlay.style.left = `${left}px`;
    overlay.style.top = `${top}px`;
    overlay.style.width = `${width}px`;
    overlay.style.height = `${height}px`;
    overlay.style.display = "block";
}

function hideHighlight() {
    document.getElementById("highlight-overlay").style.display = "none";
}
