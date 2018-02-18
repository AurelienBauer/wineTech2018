var info = {
    "DHL": 1.50,
    "FEDEX": 1.70,
    "COLI" : 1.62
};

var export_percent = {
    "dhl" : 1,
    "fedex" : 0.90,
    "coli" : 1.5
};

var transport = {
    "France" : 3.5 * 0.75,
    "Belgique" : 5 * 0.75,
    "Allemagne" : 5 * 0.75,
    "Bresil" : 8 * 0.75
};


var frais = {
    "France" : 0,
    "Belgique" : 68,
    "Allemagne" : 50,
    "Bresil" : 0
};

$('#simulated').click(function () {
    calc_values();
});

$(document).ready(function() {
    $('select').material_select();
});
// 200 = 350
function get_html_cost(cost, fee, country, imprt) {
    var html;
    if (country == "Bresil")
        html = "Coût transport : " + cost + " €</br>Taxes total : "+imprt+" €";
    else
        html = cost + " €</br>Frais d'exportation : " + fee + " €";
    return html;
}

function calc_values() {
    var val = $('#valeur').val();
    var colis = $('#nbr_colis').val();
    var nbr_bottel = $('#nbr_bouteilles').val();
    var country = $('#pays').val();

    if (!(["France", "Allemagne", "Belgique", "Bresil"].indexOf(country) > -1))
        country = "France";
    if (!val)
        val = 0;
    if (!colis)
        colis = 1;
    if (!nbr_bottel)
        nbr_bottel = 0;
    var coli = info['COLI'] * nbr_bottel * colis * transport[country];
    var dhl = info['DHL'] * nbr_bottel * colis * transport[country] + 10;
    var fedex = info['FEDEX'] * nbr_bottel * colis * transport[country];

    var prix = {
        "coli": coli,
        "dhl": dhl,
        "fedex": fedex
    };

    var obj = {
        'coli' : coli + frais[country] * export_percent['coli'],
        'fedex':  fedex + frais[country] * export_percent['fedex'],
        'dhl' : dhl + frais[country] * export_percent['dhl']
    };
    var result = [];

    for (var key in obj) result.push([key, obj[key]]);

    result.sort(function(a, b) {
        a = a[1];
        b = b[1];

        return a < b ? -1 : (a > b ? 1 : 0);
    });
    result.forEach(function (v) {
        var elem = $('#'+v[0]);
        elem.remove();
        $('#select').before(elem);
        $('#'+v[0]+"_price").html(get_html_cost(prix[v[0]].toFixed(2),
            frais[country] * export_percent[v[0]], country, (3/2 * val).toFixed(2)));
    });
}
