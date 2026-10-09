// ========================================
// N.E.X.U.S. – KOMMUNIKATION
// ========================================

// ========================================
// RICHTIGE ANTWORTEN
// ========================================

// Hier später die drei Antworten
// aus deinem Textdokument einfügen.

const richtigeAntworten = [
    "***",
    "***",
    "***"
];


// ========================================
// HILFSFUNKTIONEN
// ========================================

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


// ========================================
// SCHRITT 1 – ERSTE AUDIONACHRICHT
// ========================================

document.getElementById("weiter-1")
    .addEventListener("click", function () {

        this.disabled = true;
        anzeigen("schritt-2");

    });


// ========================================
// SCHRITT 2 – DIGITALER SCHALTER
// ========================================

// Anfangseinstellung: 000

const ziffern = [0, 0, 0];

let schalterEntsperrt = false;


// Zahlenräder aktualisieren

function aktualisiereSchalter() {

    ziffern.forEach(function (zahl, index) {

        document.getElementById(
            "ziffer-" + index
        ).textContent = zahl;

    });

}


// Plus-Buttons

document.querySelectorAll(".rad-plus")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            if (schalterEntsperrt) return;

            const index = Number(button.dataset.rad);

            ziffern[index] = (ziffern[index] + 1) % 10;

            aktualisiereSchalter();

        });

    });


// Minus-Buttons

document.querySelectorAll(".rad-minus")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            if (schalterEntsperrt) return;

            const index = Number(button.dataset.rad);

            ziffern[index] = (ziffern[index] + 9) % 10;

            aktualisiereSchalter();

        });

    });


// Code bestätigen

document.getElementById("schalter-pruefen")
    .addEventListener("click", function () {

        const code = ziffern.join("");

        if (code !== "769") {

            document.getElementById(
                "schalter-fehler"
            ).style.display = "block";

            return;
        }

        // Richtiger Code

        schalterEntsperrt = true;

        document.getElementById(
            "schalter-fehler"
        ).style.display = "none";

        this.disabled = true;

        document.querySelectorAll(
            ".rad-plus, .rad-minus"
        ).forEach(function (button) {
            button.disabled = true;
        });

        anzeigen("audio-2-bereich");

        // Zweite Audionachricht abspielen

        const audio2 = document.getElementById("audio-2");

        audio2.play().catch(function () {
            // Falls der Browser automatisches Abspielen
            // verhindert, kann die Aufnahme über den
            // sichtbaren Audio-Player gestartet werden.
        });

    });


// ========================================
// WEITER NACH AUDIO 2
// ========================================

document.getElementById("weiter-2")
    .addEventListener("click", function () {

        this.disabled = true;

        anzeigen("schritt-3");

    });


// ========================================
// SCHRITT 3 – INFORMATIONEN ÜBERMITTELN
// ========================================

function pruefeAntworten() {

    const eingaben = [

        document.getElementById("antwort-1").value,

        document.getElementById("antwort-2").value,

        document.getElementById("antwort-3").value

    ];

    const fehlermeldung =
        document.getElementById("antworten-fehler");



    // Alle drei Antworten vergleichen

    const alleRichtig = eingaben.every(
        function (eingabe, index) {

            return normalisieren(eingabe) ===
                normalisieren(richtigeAntworten[index]);

        }
    );

    if (!alleRichtig) {

        fehlermeldung.textContent =
            "Übermittlung fehlgeschlagen. " +
            "Überprüft eure Angaben.";

        fehlermeldung.style.display = "block";
        return;
    }

    // Alle Antworten richtig

    fehlermeldung.style.display = "none";

    for (let i = 1; i <= 3; i++) {

        document.getElementById(
            "antwort-" + i
        ).disabled = true;

    }

    document.getElementById(
        "antworten-pruefen"
    ).disabled = true;

    anzeigen("bestaetigung");

}


// Button

document.getElementById("antworten-pruefen")
    .addEventListener("click", pruefeAntworten);


// Enter-Taste

for (let i = 1; i <= 3; i++) {

    document.getElementById("antwort-" + i)
        .addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                pruefeAntworten();
            }

        });

}


// ========================================
// SCHRITT 4 – PRÜFUNG ABSCHLIESSEN
// ========================================

document.getElementById("weiter-3")
    .addEventListener("click", function () {

        this.disabled = true;

        // Prüfung 4 freischalten

        const aktuellerFortschritt =
            Number(
                localStorage.getItem("nexusFortschritt")
            ) || 1;

        if (aktuellerFortschritt < 4) {

            localStorage.setItem(
                "nexusFortschritt",
                "4"
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
