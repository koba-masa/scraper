chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type !== 'scraper') return;

    const tabId = request.tabId;
    chrome.tabs.sendMessage(
        tabId,
        {
            type: request.type,
            cssSelector: request.cssSelector
        }
    ).then((response) => {
        console.log(response.contents);
        sendResponse({contents: response.contents});
    }).catch((err) => {
        console.log(err);
    });
    return true;
});
