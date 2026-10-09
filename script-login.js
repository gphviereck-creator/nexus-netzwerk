// ========================================
// N.E.X.U.S. – LOGIN SYSTEM
// ========================================


// Richtige Zugangsdaten
const richtigeDaten = {
    teamname: "NEXUS",
    passwort: "GHOST"
};


// Elemente der Login-Seite
const teamnameInput = document.getElementById("teamname");
const passwortInput = document.getElementById("passwort");
const loginButton = document.getElementById("login-button");
const loginFehler = document.getElementById("login-fehler");


// Fehlernachricht beim Start verstecken
loginFehler.style.display = "none";


// Login-Button
loginButton.addEventListener("click", function () {

    const teamname = teamnameInput.value.trim();
    const passwort = passwortInput.value;


    // Zugangsdaten überprüfen
    if (
        teamname === richtigeDaten.teamname &&
        passwort === richtigeDaten.passwort
    ) {

        // Zugang gewährt
        window.location.href = "netzwerk.html";

    } else {

        // Zugang verweigert
        loginFehler.style.display = "block";

    }

});