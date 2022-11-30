var getPoll = 'function httpGet(theUrl) {return fetch(theUrl, {method: "GET",headers: {"Accept": "application/json","Content-Type": "application/json",},}).then(response => response.json());}';
var pause = 'function pause(milliseconds) { \n   const date = Date.now(); \n   let currentDate = null; \n   do { \n     currentDate = Date.now(); \n  } while (currentDate - date < milliseconds);\n }';
var functions = getPoll + ' ' + pause;
