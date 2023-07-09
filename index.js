document.getElementById("btn").onclick = function() {
    chrome.runtime.sendMessage({
      from: "index",
      id: document.getElementById("CFId").value,
    });
}