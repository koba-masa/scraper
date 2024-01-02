chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if(message.type !== 'scraper') return;

  const elements = document.querySelectorAll(message.cssSelector);
  let contents = [];
  for (let element of elements) {
    const text = element.innerText
    contents.push(text);
  }

  sendResponse({
      contents: contents,
  });
});
