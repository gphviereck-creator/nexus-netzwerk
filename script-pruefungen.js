// ========================================
// N.E.X.U.S.
// PRÜFUNGSFORTSCHRITT
// ========================================


// Gespeicherten Fortschritt laden.
// Wenn noch nichts gespeichert wurde,
// beginnt das Team bei Prüfung 1.

let nexusFortschritt =
    Number(localStorage.getItem("nexusFortschritt")) || 1;


// Sicherheitsgrenze

if (nexusFortschritt < 1) {
    nexusFortschritt = 1;
}

if (nexusFortschritt > 7) {
    nexusFortschritt = 7;
}


// Namen und Seiten der Prüfungen

const pruefungen = [

    {
        nummer: 1,
        seite: "pruefung-kryptographie.html"
    },

    {
        nummer: 2,
        seite: "pruefung-wahrnehmung.html"
    },

    {
        nummer: 3,
        seite: "pruefung-kommunikation.html"
    },

    {
        nummer: 4,
        seite: "pruefung-cybersicherheit.html"
    },

    {
        nummer: 5,
        seite: "pruefung-analyse.html"
    },

    {
        nummer: 6,
        seite: "pruefung-initiation.html"
    }

];


// ========================================
// ÜBERSICHT AKTUALISIEREN
// ========================================

pruefungen.forEach(function (pruefung) {

    const element =
        document.getElementById(
            "pruefung-" + pruefung.nummer
        );


    if (!element) {
        return;
    }


    const status =
        element.querySelector(".pruefung-status");


    // -------------------------------------
    // Prüfung bereits abgeschlossen
    // -------------------------------------

    if (pruefung.nummer < nexusFortschritt) {

        element.classList.remove("gesperrt");

        element.classList.add("abgeschlossen");

        status.textContent = "ABGESCHLOSSEN";


        // Prüfung darf erneut geöffnet werden

        element.addEventListener(
            "click",
            function () {

                window.location.href =
                    pruefung.seite;

            }
        );

        element.style.cursor = "pointer";
    }


    // -------------------------------------
    // Aktuelle Prüfung
    // -------------------------------------

    else if (pruefung.nummer === nexusFortschritt) {

        element.classList.remove("gesperrt");

        status.textContent = "VERFÜGBAR";


        element.addEventListener(
            "click",
            function () {

                window.location.href =
                    pruefung.seite;

            }
        );

        element.style.cursor = "pointer";
    }


    // -------------------------------------
    // Noch nicht freigeschaltet
    // -------------------------------------

    else {

        element.classList.add("gesperrt");

        status.textContent = "GESPERRT";
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