import { useState } from "react";
import "./css_selector.scss";

export default function CssSelector() {
  const noElementsFoundMessage: Array<string> = [
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",

    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
    "No elements found.",
  ];

  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Array<string>>(noElementsFoundMessage);
  const [isClicked, setIsClicked] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cssSelector = event.target.value;
    setInputValue(cssSelector);
    setIsClicked(false);

    if (!cssSelector) {
      return;
    }

    const tabId: number | undefined = chrome.devtools.inspectedWindow.tabId;
    if (!tabId) {
      return;
    }

    chrome.runtime.sendMessage(
      {type: 'scraper', tabId: tabId, cssSelector: cssSelector}
    ).then((response) => {
      if (!response.contents) {
        setResults(noElementsFoundMessage);
      } else {
        setResults(response.contents);
      }
    }).catch((error) => {
      setResults([error.message]);
    });
  };

  const copy = async() => {
    const copyText = results.join("\n");
    await navigator.clipboard.writeText(copyText);
    setIsClicked(true);
  }

  return (
    <section className="cssSelector">
      <div className="input">
        <label htmlFor="selector">CSS Selector:</label>
        <input
          type="text"
          name="selector"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="results">
        <div className="head">
          <div className="buttonArea">
            <div className={ isClicked ? 'copyButton clicked' : 'copyButton unclicked' } onClick={copy}></div>
          </div>
        </div>
        <div className="body">
          {
            results.map((result, index) => (
              <div key={index}>{result}</div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
