let isExtensionActive = false;

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener(async (tab) => {
  // Only proceed if the tab URL is valid
  if (tab && tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://")) {
    // Toggle the active state
    isExtensionActive = !isExtensionActive;

    // Toggle the icon based on the extension state
    try {
      await chrome.action.setIcon({
        path: isExtensionActive ? "icon-active16.png" : "icon-inactive16.png",
        tabId: tab.id
      });
      console.log("Icon updated successfully");
    } catch (error) {
      console.error("Failed to set icon:", error);
    }

    // Inject content script if not already present
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (error) {
      console.error("Issue injecting content script:", error);
    }

    // Send a message to the content script to enable/disable functionality
    try {
      chrome.tabs.sendMessage(tab.id, { active: isExtensionActive });
    } catch (error) {
      console.error("Couldn't send message to content script:", error);
    }
  } else {
    console.warn("Cannot access chrome:// or chrome-extension:// URLs.");
  }
});
