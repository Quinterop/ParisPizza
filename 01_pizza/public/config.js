$(document).ready(function() {
    // Add scrollspy to <body>
    $('body').scrollspy({
        target: ".navbar",
        offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#myNavbar a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});


function eid(id) {
    //renvoie l'élément de la page ayant l'id passé en paramètre
    return document.getElementById(id);
}

function price() {
    //on récupère les différentes valeurs et options
    var size = parseFloat(eid("taille").value);

    //on affiche le total d'arès le calcul
    eid("prix").innerHTML = size;
}