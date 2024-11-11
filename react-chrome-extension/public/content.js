let isExtensionActive = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.active) {
    console.log("Extension activated");
    isExtensionActive = true;
    document.body.style.backgroundColor = "lightgreen";
    document.addEventListener("mouseup", handleTextSelection);
  } else {
    console.log("Extension deactivated");
    isExtensionActive = false;
    document.body.style.backgroundColor = "";
    document.removeEventListener("mouseup", handleTextSelection);
  }
});

async function handleTextSelection() {
  if (isExtensionActive) {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      console.log("Highlighted text:", selectedText);

      // Send the selected text to the Python server
      const response = await fetch('http://localhost:6000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence: selectedText })
      });

      const data = await response.json();
      console.log("Translated text:", data.translated_text);
      console.log("Omitted verb:", data.omitted_verb);

      // Insert an input box where the verb was omitted
      const range = window.getSelection()?.getRangeAt(0);
      if (range && data.translated_text) {
        const span = document.createElement("span");
        span.innerHTML = `${data.translated_text} <input type="text" placeholder="Fill in the verb" style="margin-left: 5px;" />`;
        range.deleteContents();
        range.insertNode(span);
      }
    }
  }
}
