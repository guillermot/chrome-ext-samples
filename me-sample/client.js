var result = {
    address: null,
    phone: null,
    isEmpty: true
};

var addresses = document.querySelectorAll("#rhs ._RBg [data-dtype=d3adr] ._Xbe");
var phones = document.querySelectorAll("#rhs ._RBg [data-dtype=d3ph] ._Xbe span span");

if (addresses.length > 0) {
    result.address = addresses[0].innerText;
    result.isEmpty = false;
}

if (phones.length > 0) {
    result.phone = phones[0].innerText;
    result.isEmpty = false;
}

result