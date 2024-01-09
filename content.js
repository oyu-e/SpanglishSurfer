chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translateWords") {
        translateRandomWords();
    }
});

function translateRandomWords() {
    let textNodes = getTextNodes();
    let randomNodes = getRandomElements(textNodes, 5); // Choose 5 random elements

    randomNodes.forEach(node => {
        let words = node.textContent.split(' ');
        let randomWordIndex = Math.floor(Math.random() * words.length);
        words[randomWordIndex] = translateWordToSpanish(words[randomWordIndex]); // Placeholder function
        node.textContent = words.join(' ');
    });
}

function getTextNodes() {
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    let textNodes = [];

    while(node = walker.nextNode()) {
        textNodes.push(node);
    }

    return textNodes;
}

function getRandomElements(arr, count) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function translateWordToSpanish(word) {
    // Placeholder for actual translation logic
    // You might need to use Google Translate API or another service here
    return "Hola";
}