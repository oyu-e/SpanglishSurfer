chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.active) {
      console.log("Extension activated");
      document.body.style.backgroundColor = "lightgreen";
    } else {
      console.log("Extension deactivated");
      document.body.style.backgroundColor = "";
    }
  });
  