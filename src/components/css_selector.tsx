import { useState } from "react";

export default function CssSelector() {
  const noElementsFoundMessage: Array<string> = ["No elements found."];

  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Array<string>>(noElementsFoundMessage);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cssSelector = event.target.value;
    setInputValue(cssSelector);

    if (!cssSelector) {
      return;
    }

    const tabId: number | undefined = chrome.devtools.inspectedWindow.tabId;
    if (!tabId) {
      return;
    }
    setResults([String(tabId)]);
  };

  return (
    <section>
      <div>
        <input
          type="text"
          name="selector"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        {
          results.map((result, index) => (
            <p key={index}>{result}</p>
          ))
        }
      </div>
    </section>
  );
}
