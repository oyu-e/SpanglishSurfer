let isExtensionActive = false;

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener(async (tab) => {
  // Ensure the tab URL is not a restricted URL
  if (tab && tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://")) {
    // Toggle the active state
    isExtensionActive = !isExtensionActive;

    // Update the browser action icon
    try {
      await chrome.action.setIcon({
        path: isExtensionActive ? "icon-active16.png" : "icon-inactive16.png",
        tabId: tab.id
      });
      console.log("Icon updated successfully");
    } catch (error) {
      console.error("Failed to set icon:", error);
    }

    // Inject the content script if it hasn't been injected already
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      console.log("Content script injected successfully");
    } catch (error) {
      console.error("Error injecting content script:", error);
    }

    // Send a message to the content script to enable or disable functionality
    try {
      chrome.tabs.sendMessage(tab.id, { active: isExtensionActive });
    } catch (error) {
      console.error("Error sending message to content script:", error);
    }
  } else {
    console.warn("Cannot access chrome:// or chrome-extension:// URLs.");
  }
});
