// 1. FIREBASE KONFIGURATION (Hier deine Daten eintragen!)
const firebaseConfig = {
    apiKey: "AIzaSyBs_FLSJQ_e0XfhvU-cOXPwLBDmFOIzwSQ",
    authDomain: "geraetetest-55f38.firebaseapp.com",
    projectId: "geraetetest-55f38",
    storageBucket: "geraetetest-55f38.firebasestorage.app",
    messagingSenderId: "17969635623",
    appId: "1:17969635623:web:4dc5acf75db62736858902",
    measurementId: "G-KPWR0S3SMF"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Admin-PIN für das Löschen festlegen
const ADMIN_PIN = "1122"; 
let isAdmin = false;

const devices = [
    { id: 1, name: "B-Strahlrohr", side: "fahrerseite", text: "Fahrerseite | hinten | mittig", coords: "1788,660,1693,477" },
    { id: 2, name: "C-Strahlrohr", side: "fahrerseite", text: "Fahrerseite | hinten | mittig", coords: "1686,655,1394,478" },
    { id: 3, name: "Druckbegrenzungsventil", side: "heck", text: "Heck | in der Maschinistenkiste", coords: "608,73,1354,487" },
    { id: 4, name: "Feuerlöscher", side: "beifahrerseite", text: "Beifahrerseite | vorne | hinter der Kübelspritze", coords: "1419,1205,1266,810" },
    { id: 5, name: "Feuerwehrleine", side: "mannschaftskabine", text: "Mannschaftskabine | bei den AGT-Sitzen", coords: "1020,631,1285,1136" },
    { id: 6, name: "Handscheinwerfer", side: "mannschaftskabine", text: "Fahrerkabine | zwischen den Sitzen", coords: "737,643,911,777" },
    { id: 7, name: "Kübelspritze", side: "beifahrerseite", text: "Beifahrerseite | vorne | mittig unten", coords: "1459,1203,1305,762" },
    { id: 8, name: "Kupplungsschlüssel", side: "heck", text: "Heck | in der Maschinistenkiste", coords: "608,73,1354,487" },
    { id: 9, name: "Mehrzweckleine", side: "heck", text: "Heck | in der Maschinistenkiste", coords: "608,73,1354,487" },
    { id: 10, name: "Sammelstück", side: "heck", text: "Heck | oben links", coords: "510,477,795,787" },
    { id: 11, name: "Saugkorb", side: "heck", text: "Heck | in der Maschinistenkiste", coords: "608,73,1354,487" },
    { id: 12, name: "Saugschutzkorb", side: "heck", text: "Heck | in der Maschinistenkiste", coords: "608,73,1354,487" },
    { id: 13, name: "Schachthaken", side: "beifahrerseite", text: "Beifahrerseite | hinten | links", coords: "210,939,121,774" },
    { id: 14, name: "Schlauchhalter", side: "fahrerseite", text: "Fahrerseite | vorne | oben links in der Beleuchtungskiste", coords: "260,578,150,442" },
    { id: 15, name: "Standrohr", side: "beifahrerseite", text: "Beifahrerseite | hinten | unterhalb der Schläuche", coords: "719,758,496,643" },
    { id: 16, name: "Stützkrümmer", side: "fahrerseite", text: "Fahrerseite | hinten | mittig oben", coords: "1695,475,1589,328" },
    { id: 17, name: "Überflurhydrantenschlüssel", side: "beifahrerseite", text: "Beifahrerseite | hinten | links von den Leitkegeln", coords: "365,1031,240,939" },
    { id: 18, name: "Verteiler", side: "beifahrerseite", text: "Beifahrerseite | hinten | unten links", coords: "511,1368,250,1212" },
    { id: 19, name: "Unterflurhydrantenschlüssel", side: "beifahrerseite", text: "Beifahrerseite | hinten | unterhalb des Standrohres", coords: "772,812,455,741" },
    { id: 20, name: "Übergangsstück A-B", side: "heck", text: "Heck | oben rechts", coords: "1209,479,1451,608" },
    { id: 21, name: "Übergangsstück B-C", side: "beifahrerseite", text: "Beifahrerseite | hinten | oberhalb vom Verteiler", coords: "568,1205,455,1149" },
    { id: 22, name: "Verbandskasten", side: "mannschaftskabine", text: "Mannschaftskabine | an der Rückwand", coords: "1791,741,1961,1121" },
    { id: 23, name: "Brechstange (Halligan Tool)", side: "fahrerseite", text: "Fahrerseite | vorne | mittig links", coords: "389,711,248,577" },
    { id: 24, name: "Feuerwehraxt", side: "fahrerseite", text: "Fahrerseite | vorne | unten links", coords: "390,1118,251,948" },
    { id: 25, name: "Reservekraftstoffkanister", side: "fahrerseite", text: "Fahrerseite | hinten | mittig oben", coords: "1589,476,1486,302" },
    { id: 26, name: "Unterlegkeil", side: "mannschaftskabine", text: "Fahrerkabine | unter dem Fahrersitz", coords: "446,1032,685,1219" },
    { id: 27, name: "Werkzeugkasten", side: "beifahrerseite", text: "Beifahrerseite | vorne | oben neben den Schläuchen", coords: "1442,663,1287,469" },
    { id: 28, name: "Warndreieck", side: "beifahrerseite", text: "Beifahrerseite | hinten | unterhalb rechts des Standrohres", coords: "852,835,768,715" },
    { id: 29, name: "Warnweste", side: "mannschaftskabine", text: "Mannschaftskabine | in der Sitzbank", coords: "1300,833,1614,1423" },
    { id: 30, name: "Warnleuchte", side: "beifahrerseite", text: "Beifahrerseite | hinten | in der Kiste rechts neben den Leitkegeln", coords: "841,1046,586,834" }
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
let feedbackTimeout = null;
let isWaitingForOk = false;
let totalDevicesCount = 0;
let finalScore = 0;
let finalDurationSec = 0;

document.addEventListener("DOMContentLoaded", () => {
    const imgElement = document.getElementById("vehicle-img");
    if (imgElement) {
        imgElement.addEventListener("click", () => {
            if (mode === "test" && !isWaitingForOk) {
                handleMissClick();
            }
        });
    }
});

function showStartScreen() {
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("main-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("highscore-screen").classList.add("hidden");
}

function startTest() {
    mode = "test";
    foundCount = 0;
    errorCount = 0;
    currentQueue = [...devices].sort(() => Math.random() - 0.5);
    totalDevicesCount = currentQueue.length;
    
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("highscore-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("quiz-info").classList.remove("hidden");
    document.getElementById("birdseye-container").classList.remove("hidden");
    document.getElementById("overview-grid").classList.add("hidden");
    document.getElementById("info-box").classList.add("hidden");
    document.getElementById("next-step-container").classList.add("hidden");
    
    hideFeedbacks();
    updateStats();
    startTime = Date.now();
    switchView('fahrerseite');
    nextTestDevice();
}

function nextTestDevice() {
    isWaitingForOk = false;
    document.getElementById("next-step-container").classList.add("hidden");

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
    finalDurationSec = Math.floor((Date.now() - startTime) / 1000);
    const min = Math.floor(finalDurationSec / 60);
    const sec = finalDurationSec % 60;
    
    // Score-Berechnung: Zeit + 5s je Fehler + 5s je nicht gefundenem Gerät
    const unassignedCount = totalDevicesCount - foundCount;
    finalScore = finalDurationSec + (errorCount * 5) + (unassignedCount * 5);

    document.getElementById("main-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    
    document.getElementById("res-found").innerText = `${foundCount}/${totalDevicesCount}`;
    document.getElementById("res-errors").innerText = errorCount;
    document.getElementById("res-time").innerText = `${min}m ${sec}s`;
    document.getElementById("res-score").innerText = finalScore;
    
    document.getElementById("highscore-form-container").classList.remove("hidden");
    document.getElementById("save-score-btn").disabled = false;
}

function saveHighscoreToFirebase() {
    const nameInput = document.getElementById("player-name");
    const name = nameInput.value.trim() || "Anonym";
    
    const min = Math.floor(finalDurationSec / 60);
    const sec = finalDurationSec % 60;
    const timeFormatted = `${min}m ${sec}s`;
    
    const now = new Date();
    const dateTimeFormatted = now.toLocaleDateString('de-DE') + ' ' + now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    document.getElementById("save-score-btn").disabled = true;

    db.collection("highscores").add({
        name: name,
        score: finalScore,
        time: timeFormatted,
        errors: errorCount,
        found: `${foundCount}/${totalDevicesCount}`,
        date: dateTimeFormatted,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        nameInput.value = "";
        showHighscoreScreen();
    }).catch(error => {
        alert("Fehler beim Speichern: " + error.message);
        document.getElementById("save-score-btn").disabled = false;
    });
}

function showHighscoreScreen() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("highscore-screen").classList.remove("hidden");

    loadHighscoresLive();
}

function loadHighscoresLive() {
    db.collection("highscores")
      .orderBy("score", "asc")
      .limit(20)
      .onSnapshot(snapshot => {
          const tbody = document.getElementById("highscore-body");
          tbody.innerHTML = "";

          if (snapshot.empty) {
              tbody.innerHTML = `<tr><td colspan="8" style="padding: 15px; color: #aaa;">Noch keine Highscores vorhanden.</td></tr>`;
              return;
          }

          let rank = 1;
          snapshot.forEach(doc => {
              const data = doc.data();
              const row = document.createElement("tr");
              row.style.borderBottom = "1px solid #333";
              
              row.innerHTML = `
                  <td style="padding: 8px; font-weight: bold; color: #ffea00;">#${rank++}</td>
                  <td style="padding: 8px;">${escapeHtml(data.name)}</td>
                  <td style="padding: 8px; font-weight: bold; color: #ff4d4d;">${data.score}</td>
                  <td style="padding: 8px;">${data.time}</td>
                  <td style="padding: 8px;">${data.errors}</td>
                  <td style="padding: 8px;">${data.found}</td>
                  <td style="padding: 8px; font-size: 0.85rem; color: #aaa;">${data.date || '-'}</td>
                  <td style="padding: 8px;" class="admin-col ${isAdmin ? '' : 'hidden'}">
                      <button onclick="deleteEntry('${doc.id}')" style="background: #d90429; padding: 2px 8px; font-size: 0.75rem; margin:0;">Löschen</button>
                  </td>
              `;
              tbody.appendChild(row);
          });
      });
}

function deleteEntry(docId) {
    if (confirm("Diesen Eintrag wirklich löschen?")) {
        db.collection("highscores").doc(docId).delete()
          .catch(err => alert("Löschen fehlgeschlagen: " + err.message));
    }
}

function toggleAdminMode() {
    if (!isAdmin) {
        const pin = prompt("Bitte Admin-PIN eingeben:");
        if (pin === ADMIN_PIN) {
            isAdmin = true;
            document.getElementById("admin-btn").innerText = "Admin beenden";
            document.getElementById("admin-btn").style.backgroundColor = "#d90429";
            document.querySelectorAll(".admin-col").forEach(el => el.classList.remove("hidden"));
        } else if (pin !== null) {
            alert("Falsche PIN!");
        }
    } else {
        isAdmin = false;
        document.getElementById("admin-btn").innerText = "Admin-Modus";
        document.getElementById("admin-btn").style.backgroundColor = "#444";
        document.querySelectorAll(".admin-col").forEach(el => el.classList.add("hidden"));
    }
}

function updateStats() {
    document.getElementById("found-count").innerText = foundCount;
    document.getElementById("error-count").innerText = errorCount;
}

function startOverview() {
    mode = "overview";
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("highscore-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    document.getElementById("quiz-info").classList.add("hidden");
    document.getElementById("birdseye-container").classList.add("hidden");
    document.getElementById("overview-grid").classList.remove("hidden");
    document.getElementById("next-step-container").classList.add("hidden");
    hideFeedbacks();
    
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
        switchView(dev.side, () => {
            highlightDevice(dev);
        });
    } else {
        highlightDevice(dev);
    }
}

function switchView(side, callback) {
    currentSide = side;
    const img = document.getElementById("vehicle-img");
    document.getElementById("view-title").innerText = side.toUpperCase();
    
    hideHighlight();

    const updateViewContent = () => {
        buildMap();
        if (activeHighlightDev && activeHighlightDev.side === currentSide) {
            highlightDevice(activeHighlightDev);
        }
        if (callback) callback();
    };

    img.onload = updateViewContent;

    if (side === "vogelperspektive") {
        img.src = `./img/${side}.png`;
    } else if (side === "mannschaftskabine") {
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
        area.onclick = (e) => {
            e.stopPropagation();
            if (!isWaitingForOk) {
                handleAreaClick(dev);
            }
        };
        map.appendChild(area);
    });
}

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
        const isCorrectArea = (clickedDev.side === currentTarget.side && doCoordsOverlap(clickedDev.coords, currentTarget.coords)) 
                              || clickedDev.id === currentTarget.id;

        if (isCorrectArea) {
            foundCount++;
            updateStats();
            showFeedback("correct", "Richtig!", 1500);
            setTimeout(nextTestDevice, 1000);
        } else {
            registerError();
        }
    } else if (mode === "overview") {
        const infoBox = document.getElementById("info-box");
        infoBox.innerText = `${clickedDev.name}: ${clickedDev.text}`;
        infoBox.classList.remove("hidden");
        activeHighlightDev = clickedDev;
        highlightDevice(clickedDev);
    }
}

function handleMissClick() {
    registerError();
}

function registerError() {
    errorCount++;
    deviceAttempts++;
    updateStats();
    
    if (deviceAttempts < 2) {
        showFeedback("wrong", "Falsch! Du hast noch 1 Versuch.", 2000);
    } else {
        isWaitingForOk = true;
        showFeedback("wrong", `Falsch! Lösung: ${currentTarget.text}`, 999999);
        
        activeHighlightDev = currentTarget;
        if (currentSide !== currentTarget.side) {
            switchView(currentTarget.side, () => {
                highlightDevice(currentTarget);
            });
        } else {
            highlightDevice(currentTarget);
        }
        
        document.getElementById("next-step-container").classList.remove("hidden");
    }
}

function confirmNextDevice() {
    hideFeedbacks();
    nextTestDevice();
}

function showFeedback(type, text, duration = 1500) {
    hideFeedbacks();
    const fb = document.getElementById(type === "correct" ? "correct-feedback" : "wrong-feedback");
    fb.innerText = text;
    fb.classList.remove("hidden");
    
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    if (duration < 90000) {
        feedbackTimeout = setTimeout(() => {
            fb.classList.add("hidden");
        }, duration);
    }
}

function hideFeedbacks() {
    document.getElementById("correct-feedback").classList.add("hidden");
    document.getElementById("wrong-feedback").classList.add("hidden");
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

    overlay.style.left = `${x1}px`;
    overlay.style.top = `${y1}px`;
    overlay.style.width = `${x2 - x1}px`;
    overlay.style.height = `${y2 - y1}px`;
    overlay.style.display = "block";
}

function hideHighlight() {
    activeHighlightDev = null;
    const overlay = document.getElementById("highlight-overlay");
    if (overlay) overlay.style.display = "none";
}

function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

window.addEventListener('resize', () => {
    buildMap();
    if (activeHighlightDev) {
        highlightDevice(activeHighlightDev);
    }
});
