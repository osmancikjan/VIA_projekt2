$(function() {
    $(window).ready(function() {
        odpocet(document.getElementById('odpocet'));
        $('#contactForm').on('submit', function(e) {
            var jmeno = document.getElementById("jmeno").value;
            var subject = document.getElementById("subject").value;
            var valid = parseInt(document.getElementById("valid").value);
            var message = document.getElementById("message").value;
            var datum = new Date();
            var dnes = parseInt(datum.getDate());

            if (jmeno !== "" && valid === dnes) {
                var link = "mailto:j.osmancik@gmail.com" +
                    "?subject=" + encodeURIComponent(subject) +
                    "&body=" + encodeURIComponent(message + '\n \n' + jmeno + '\n');
                window.location.href = link;
            } else {
                $('.alert-danger')
                $('.alert-danger').show();
            }
            return false;
        })

    })
});

function initMap() {
    var icon = {
        url: "img/home.svg",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 40)
    };
    var uluru = { lat: 49.835831, lng: 18.041100 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: icon
    });
}

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("scrollUp").style.display = "block";
    } else {
        document.getElementById("scrollUp").style.display = "none";
    }
}

var vterina = 1000;
var minuta = vterina * 60;
var hodina = minuta * 60;
var den = hodina * 24;
var rok = den * 365.24219;

var slova = {
    roku: ["rok", "roky", "let"],
    dnu: ["den", "dny", "dnů"],
    hodin: ["hodina", "hodiny", "hodin"],
    minut: ["minuta", "minuty", "minut"],
    vterin: ["vteřina", "vteřiny", "vteřin"]
};

function sklonovani(pocet, co) {
    if (pocet == 1) return slova[co][0];
    if (pocet < 5 && pocet > 0) return slova[co][1];
    return slova[co][2];
}

function odpocet(el) {
    var konec = new Date(el.getAttribute("data-konec"));
    var ted = new Date();
    var rozdil = konec - ted;
    if (rozdil < vterina) {
        el.innerHTML = el.getAttribute("data-hlaska");
        return;
    }
    var zbyva = {
        roku: Math.floor(rozdil / rok),
        dnu: Math.floor(rozdil % rok / den),
        hodin: Math.floor((rozdil % den) / hodina),
        minut: Math.floor((rozdil % hodina) / minuta),
        vterin: Math.floor((rozdil % minuta) / vterina)
    }

    var vypis = el.getAttribute("data-zbyva");
    for (co in zbyva) {
        var pocet = zbyva[co];
        if (pocet > 0) vypis += " " + pocet + " " + sklonovani(pocet, co);

    }

    el.innerHTML = vypis;
    setTimeout(function() {
        odpocet(el);
    }, vterina);
}