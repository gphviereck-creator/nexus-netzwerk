// ========================================
// N.E.X.U.S. – WAHRNEHMUNG
// ========================================

// Richtige Antworten

const loesungen = {
    1: "eule",
    2: "27946",
    3: "faule eier",
    4: "geruchssinn"
};


// Eingaben vereinheitlichen

function normalisiereAntwort(text) {
    return text
        .trim()
        .toLocaleLowerCase("de-DE")
        .replace(/\s+/g, " ");
}


// ========================================
// AUFGABEN PRÜFEN
// ========================================

function pruefeAufgabe(nummer) {

    const eingabefeld =
        document.getElementById("antwort-" + nummer);

    const fehlermeldung =
        document.getElementById("fehler-" + nummer);

    const antwort =
        normalisiereAntwort(eingabefeld.value);


    if (antwort !== loesungen[nummer]) {
        fehlermeldung.style.display = "block";
        return;
    }

    fehlermeldung.style.display = "none";

    // Richtige Antwort nicht erneut bearbeiten
    eingabefeld.disabled = true;

    document.getElementById(
        "pruefen-" + nummer
    ).disabled = true;


    // Aufgabe 1: Eulensymbol anzeigen

    if (nummer === 1) {

        document.getElementById(
            "ergebnis-1"
        ).style.display = "block";

    }

    // Aufgabe 2 und 3: Nächste Aufgabe anzeigen

    else if (nummer < 4) {

        zeigeAufgabe(nummer + 1);

    }

    // Aufgabe 4: Prüfung abschließen

    else {

        schliessePruefungAb();

    }
}


// ========================================
// NÄCHSTE AUFGABE ANZEIGEN
// ========================================

function zeigeAufgabe(nummer) {

    const naechsteAufgabe =
        document.getElementById("aufgabe-" + nummer);

    naechsteAufgabe.classList.remove("versteckt");

    naechsteAufgabe.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// Buttons und Enter-Taste

for (let nummer = 1; nummer <= 4; nummer++) {

    document.getElementById(
        "pruefen-" + nummer
    ).addEventListener("click", function () {

        pruefeAufgabe(nummer);

    });

    document.getElementById(
        "antwort-" + nummer
    ).addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            pruefeAufgabe(nummer);
        }

    });
}


// Weiter nach dem Eulensymbol

document.getElementById(
    "weiter-1"
).addEventListener("click", function () {

    this.disabled = true;

    zeigeAufgabe(2);

});


// ========================================
// PRÜFUNG ABSCHLIESSEN
// ========================================

function schliessePruefungAb() {

    const aktuellerFortschritt =
        Number(
            localStorage.getItem("nexusFortschritt")
        ) || 1;

    // Prüfung 3 freischalten,
    // ohne einen höheren Fortschritt zurückzusetzen.

    if (aktuellerFortschritt < 3) {

        localStorage.setItem(
            "nexusFortschritt",
            "3"
        );

    }

    const abschluss =
        document.getElementById("abschluss-bereich");

    abschluss.classList.remove("versteckt");

    abschluss.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


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

const hinweisSchliessen =
    document.getElementById("hinweis-schliessen");


document.querySelectorAll(".hinweis-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const nummer = button.dataset.hinweis;

            hinweisTitel.textContent =
                "HINWEIS " + nummer.padStart(2, "0");

            hinweisText.textContent =
                hinweise[nummer];

            hinweisFenster.style.display = "flex";

        });

    });


function schliesseHinweis() {
    hinweisFenster.style.display = "none";
}

hinweisSchliessen.addEventListener(
    "click",
    schliesseHinweis
);

hinweisFenster.addEventListener(
    "click",
    function (event) {

        if (event.target === hinweisFenster) {
            schliesseHinweis();
        }

    }
);

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        schliesseHinweis();
    }

});


// ========================================
// NAVIGATION
// ========================================

const dropdown =
    document.querySelector(".nav-dropdown");

const dropdownButton =
    document.querySelector(".nav-dropdown-button");

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
