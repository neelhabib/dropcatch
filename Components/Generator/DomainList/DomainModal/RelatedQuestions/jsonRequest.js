export default function jsonpRequest(url, callbackName, callback) {
  // Create a script element
  var script = document.createElement("script");

  // Set the script source with the callback parameter
  script.src = url + "&callback=" + callbackName;

  // Attach a callback function to the window object
  window[callbackName] = callback;

  // Append the script to the document
  document.head.appendChild(script);
}
