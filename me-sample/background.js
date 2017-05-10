

chrome.runtime.onInstalled.addListener(function () {
    console.log('me sample! onInstalled!');
});

chrome.webNavigation.onBeforeNavigate.addListener(function (parameters) {

    var ns_query = getParameterByName('___ns_query', parameters.url);
    var query = getParameterByName('q', parameters.url);
    
    console.log(ns_query + ' - ' + query);

    if (ns_query == 'true') {
        window.setTimeout(function () { getAddress(parameters, query); }, 500);
    }
});

function getAddress(parameters, query) {

    chrome.tabs.executeScript(parameters.tabId,
        { file: 'client.js' },
        function (result) {
        }
    );
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function log(url, parameters) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(parameters));

    var result = xhr.responseText;
    console.log(result);
}