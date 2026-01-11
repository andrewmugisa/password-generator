// Receive messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "PASSWORD_PAGE_DETECTED") {
        console.log("📨 Background received PASSWORD_PAGE_DETECTED");

        // Optionally store the state to retrieve in popup
        chrome.storage.local.set({ passwordPageDetected: true });
    }
});
