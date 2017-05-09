

chrome.runtime.onInstalled.addListener(function () {
    console.log('me sample! onInstalled!');
});

chrome.webNavigation.onBeforeNavigate.addListener(function (parameters) {
    var ns_query = getParameterByName('___ns_query', parameters.url);
    var query = getParameterByName('q', parameters.url);

    if (ns_query == 'true') {
        window.setTimeout(function () { getAddress(parameters, query); }, 500);
    }
});

function getAddress(parameters, query) {
    chrome.tabs.executeScript(parameters.tabId,
        // { code: 'var addresses = document.querySelectorAll("#rhs ._RBg [data-dtype=d3adr] ._Xbe"); if(addresses.length>0) addresses[0].innerText' },
        { file: 'client.js' },
        function (result) {
            if (!result.isEmpty) {
                const requestParameters = {
                    query: query,
                    content: result[0]
                };

                console.log(requestParameters);
                log('https://httpbin.org/post', requestParameters);
            }
            else
                console.warn('No address');
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