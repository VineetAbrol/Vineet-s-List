//function that serves as a middle man between webpage and extention page
function getPageDetails(callback) { 
    chrome.tabs.executeScript(null, { file: 'content.js' }); 
    chrome.runtime.onMessage.addListener(function(message)  { 
        callback(message); 
    }); 
}; 
