// ========================================
// N.E.X.U.S. – KRYPTOGRAPHIE
// ========================================


// Elemente

const weiterButton =
    document.getElementById("weiter-button");

const passwortBereich =
    document.getElementById("passwort-bereich");

const loesungswort =
    document.getElementById("loesungswort");

const passwortButton =
    document.getElementById("passwort-button");

const passwortFehler =
    document.getElementById("passwort-fehler");

const abschlussBereich =
    document.getElementById("abschluss-bereich");


// ========================================
// WEITER
// ========================================

weiterButton.addEventListener("click", function () {

    passwortBereich.style.display = "block";

    weiterButton.style.display = "none";

    loesungswort.focus();

});


// ========================================
// PASSWORT PRÜFEN
// ========================================

function pruefeLoesungswort() {

    const eingabe =
        loesungswort.value.trim().toLowerCase();


    if (eingabe === "regenbogen") {

        passwortFehler.style.display = "none";

        passwortBereich.style.display = "none";

        abschlussBereich.style.display = "block";


        // Prüfung 1 ist abgeschlossen.
        // Prüfung 2 wird freigeschaltet.

        const aktuellerFortschritt =
            Number(
                localStorage.getItem(
                    "nexusFortschritt"
                )
            ) || 1;


        // Fortschritt niemals zurücksetzen,
        // falls das Team diese Prüfung
        // später erneut öffnet.

        if (aktuellerFortschritt < 2) {

            localStorage.setItem(
                "nexusFortschritt",
                "2"
            );

        }

    } else {

        passwortFehler.style.display = "block";

    }

}


// Button

passwortButton.addEventListener(
    "click",
    pruefeLoesungswort
);


// Enter-Taste

loesungswort.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            pruefeLoesungswort();

        }

    }
);


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


document
    .querySelectorAll(".hinweis-button")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const nummer =
                    button.dataset.hinweis;


                hinweisTitel.textContent =
                    "HINWEIS " +
                    String(nummer).padStart(2, "0");


                hinweisText.textContent =
                    hinweise[nummer];


                hinweisFenster.style.display =
                    "flex";

            }
        );

    });


hinweisSchliessen.addEventListener(
    "click",
    function () {

        hinweisFenster.style.display = "none";

    }
);


// Auch schließen, wenn außerhalb
// des Fensters geklickt wird.

hinweisFenster.addEventListener(
    "click",
    function (event) {

        if (event.target === hinweisFenster) {

            hinweisFenster.style.display =
                "none";

        }

    }
);


// ========================================
// NAVIGATION
// ========================================

const dropdown =
    document.querySelector(".nav-dropdown");

const dropdownButton =
    document.querySelector(".nav-dropdown-button");


if (dropdown && dropdownButton) {

    dropdownButton.addEventListener(
        "click",
        function () {

            dropdown.classList.toggle("offen");

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (!dropdown.contains(event.target)) {

                dropdown.classList.remove("offen");

            }

        }
    );

}