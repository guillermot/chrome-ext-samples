var popover = document.createElement('div');
popover.setAttribute('id', 'ns_popover');
popover.setAttribute('class', ' gb_ha gb_g');
popover.setAttribute('style', ' top: 273px; left: -221px; width: 210px;');
popover.innerHTML = '<div class="gb_qb"><p><strong>Nosis Leads</strong></p><p>¿Desea confirmar la dirección?</p><p><button id="ns_popover_accept">Aceptar</button><button id="ns_popover_cancel">Cancelar</button></p></div>';;

var arrow = document.createElement('div');
arrow.setAttribute('id', 'ns_popover_arrow');
arrow.setAttribute('class', 'gb_lb');
arrow.setAttribute('style', 'width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #c5c5c5; display: block; top: 291px; left: -9px;');

var card = document.querySelectorAll("#rhs ._RBg")[0];
card.appendChild(popover);
card.appendChild(arrow);

document.getElementById('ns_popover_cancel').addEventListener('click', function () {
    document.getElementById("ns_popover").remove();
    document.getElementById("ns_popover_arrow").remove();
});

document.getElementById('ns_popover_accept').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();

    var parameters = {
        query: getParameterByName('q', window.location.href),
        address: null,
        phone: null
    };

    var addresses = document.querySelectorAll("#rhs ._RBg [data-dtype=d3adr] ._Xbe");
    var phones = document.querySelectorAll("#rhs ._RBg [data-dtype=d3ph] ._Xbe span span");

    if (addresses.length > 0) {
        parameters.address = addresses[0].innerText;
    }

    if (phones.length > 0) {
        parameters.phone = phones[0].innerText;
    }

    xhr.open("POST", 'https://httpbin.org/post', false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(parameters));

    var result = xhr.responseText;

    document.getElementById("ns_popover").remove();
    document.getElementById("ns_popover_arrow").remove();

    console.log(result);
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}