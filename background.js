let isModificationEnabled = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ 'isModificationEnabled': false });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.query === 'toggleState') {
        sendResponse(isModificationEnabled);
    } else if (message.toggleChanged !== undefined) {
        isModificationEnabled = message.toggleChanged;
        chrome.storage.local.set({ 'isModificationEnabled': isModificationEnabled });
        
        // Inject or remove script based on the state
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                if (isModificationEnabled) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ['contentScript.js']
                    });
                } else {
                    chrome.tabs.reload(tabs[0].id);
                }
            }
        });
    }
});
