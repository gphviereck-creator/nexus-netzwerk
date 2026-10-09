// ========================================
// N.E.X.U.S. – CYBERSICHERHEIT
// ========================================

// LÖSUNGEN

const phishingCode = "235";
const richtigerEindringling = "2"; // TESTLÖSUNG
const gegenmassnahmeCode = "***";


// HILFSFUNKTIONEN

function anzeigen(id) {
    const element = document.getElementById(id);

    element.classList.remove("versteckt");

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function normalisieren(text) {
    return text
        .trim()
        .toLocaleLowerCase("de-DE")
        .replace(/\s+/g, " ");
}

function fehlerAnzeigen(id, sichtbar) {
    document.getElementById(id).style.display =
        sichtbar ? "block" : "none";
}


// ========================================
// SCHRITT 1 – EINLEITUNG
// ========================================

document.getElementById("weiter-1")
    .addEventListener("click", function () {

        this.disabled = true;
        anzeigen("schritt-2");

    });


// ========================================
// SCHRITT 2 – NACHRICHTEN
// ========================================

document.getElementById("weiter-2")
    .addEventListener("click", function () {

        this.disabled = true;
        anzeigen("schritt-3");

    });


// ========================================
// SCHRITT 3 – PHISHING
// ========================================

function pruefePhishing() {

    const eingabe = document.getElementById(
        "phishing-code"
    );

    if (eingabe.value.trim() !== phishingCode) {
        fehlerAnzeigen("phishing-fehler", true);
        return;
    }

    fehlerAnzeigen("phishing-fehler", false);

    eingabe.disabled = true;

    document.getElementById(
        "phishing-pruefen"
    ).disabled = true;

    anzeigen("protokoll-bereich");
}

document.getElementById("phishing-pruefen")
    .addEventListener("click", pruefePhishing);

document.getElementById("phishing-code")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            pruefePhishing();
        }

    });


// ========================================
// SCHRITT 4 – EINDRINGLING
// ========================================

document.getElementById("eindringling-pruefen")
    .addEventListener("click", function () {

        const auswahl = document.querySelector(
            'input[name="eindringling"]:checked'
        );

        if (!auswahl ||
            auswahl.value !== richtigerEindringling) {

            fehlerAnzeigen("eindringling-fehler", true);
            return;
        }

        fehlerAnzeigen("eindringling-fehler", false);

        document.querySelectorAll(
            'input[name="eindringling"]'
        ).forEach(function (feld) {
            feld.disabled = true;
        });

        this.disabled = true;

        anzeigen("schritt-4");

    });


// ========================================
// SCHRITT 5 – GEGENMASSNAHMEN
// ========================================

function pruefeGegenmassnahme() {

    const eingabe = document.getElementById(
        "gegenmassnahme-code"
    );

    if (normalisieren(eingabe.value) !==
        normalisieren(gegenmassnahmeCode)) {

        fehlerAnzeigen("gegenmassnahme-fehler", true);
        return;
    }

    fehlerAnzeigen("gegenmassnahme-fehler", false);

    eingabe.disabled = true;

    document.getElementById(
        "gegenmassnahme-pruefen"
    ).disabled = true;

    anzeigen("bestaetigung");
}

document.getElementById("gegenmassnahme-pruefen")
    .addEventListener("click", pruefeGegenmassnahme);

document.getElementById("gegenmassnahme-code")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            pruefeGegenmassnahme();
        }

    });


// ========================================
// PRÜFUNG ABSCHLIESSEN
// ========================================

document.getElementById("weiter-3")
    .addEventListener("click", function () {

        this.disabled = true;

        const fortschritt = Number(
            localStorage.getItem("nexusFortschritt")
        ) || 1;

        // Prüfung 5 – Analyse freischalten

        if (fortschritt < 5) {
            localStorage.setItem(
                "nexusFortschritt",
                "5"
            );
        }

        anzeigen("abschluss-bereich");

    });


// ========================================
// HINWEISE
// ========================================

const hinweise = {
    1: "Hinweis 1 wird noch festgelegt.",
    2: "Hinweis 2 wird noch festgelegt.",
    3: "Hinweis 3 wird noch festgelegt."
};

const hinweisFenster =
    document.getElementById("hinweis-fenster");

const hinweisTitel =
    document.getElementById("hinweis-titel");

const hinweisText =
    document.getElementById("hinweis-text");

document.querySelectorAll(".hinweis-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const nummer = button.dataset.hinweis;

            hinweisTitel.textContent =
                "HINWEIS " + nummer.padStart(2, "0");

            hinweisText.textContent = hinweise[nummer];

            hinweisFenster.style.display = "flex";

        });

    });

function schliesseHinweis() {
    hinweisFenster.style.display = "none";
}

document.getElementById("hinweis-schliessen")
    .addEventListener("click", schliesseHinweis);

hinweisFenster.addEventListener("click", function (event) {
    if (event.target === hinweisFenster) {
        schliesseHinweis();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        schliesseHinweis();
    }
});


// ========================================
// NAVIGATION
// ========================================

const dropdown = document.querySelector(".nav-dropdown");
const dropdownButton = document.querySelector(
    ".nav-dropdown-button"
);

if (dropdown && dropdownButton) {

    dropdownButton.addEventListener("click", function () {
        dropdown.classList.toggle("offen");
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("offen");
        }
    });
}
