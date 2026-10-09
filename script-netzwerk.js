// ========================================
// N.E.X.U.S. – NETZWERK
// ========================================


// AUS- UND WEITERBILDUNG DROPDOWN

const dropdown = document.querySelector(".nav-dropdown");

const dropdownButton =
    document.querySelector(".nav-dropdown-button");


if (dropdown && dropdownButton) {

    dropdownButton.addEventListener("click", function () {

        dropdown.classList.toggle("offen");

    });


    // Menü schließen, wenn außerhalb geklickt wird

    document.addEventListener("click", function (event) {

        if (!dropdown.contains(event.target)) {

            dropdown.classList.remove("offen");

        }

    });

}