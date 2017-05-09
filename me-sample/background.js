

chrome.runtime.onInstalled.addListener(function () {
    console.log('me sample! onInstalled!');
});

// chrome.webRequest.onCompleted.addListener(function (details) {
//     console.log('me sample! onCompleted ' + details.url);
// },
//     { urls: ["http://*/*"] }
// );

chrome.webNavigation.onCompleted.addListener(function (parameters) {
    console.log('me sample! webNavigation.onCompleted!', parameters);

    var ns_query = getParameterByName('ns_query', parameters.url);

    if (ns_query == 'true') {
        console.log('ns_query == true');
        const parameters = {
            hello: 'kitty'
        };

        log('https://httpbin.org/post', parameters);
    }
    else {
        console.log('ns_query == false');
    }

    console.log(ns_query);
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

function log(url, parameters) {
    
    console.log('log:');
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, false);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(parameters));

    var result = xhr.responseText;
    console.log('post: ' + result);
}