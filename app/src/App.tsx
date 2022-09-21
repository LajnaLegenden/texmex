import React, { MutableRefObject, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import CodeEditor from './components/editor';
import config from './rules.json';
import SettingsElement from './components/setting';
import { Formatter } from './modules/formatter';
export interface Rule {
  type: string;
  label: string;
  options?: string[];
  value: boolean | number;
}

function formatTexCode(code: string, rules: Rule[]) {
  let formatter = new Formatter(rules);

  code = formatter.formatAll(code);

  return code;

}

function isFileTex(fileContent: string) {
  return fileContent.includes("\\documentclass");
}


function App() {
  //use rules from rules.json
  const [rules, setRules] = React.useState<Rule[]>(config as Rule[]);
  const [code, setCode] = React.useState<string>("");
  const inputFile = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };


  const getFileContent = () => {
    // @ts-ignore: Object is possibly 'null'.
    var file = inputFile.current.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        // @ts-ignore: Object is possibly 'null'.
        if (isFileTex(evt.target.result)) {
          // @ts-ignore: Object is possibly 'null'.
          setCode(evt.target.result);
        }
      }

    }
  }

  const formatCode = () => {
    setCode(formatTexCode(code, rules));
  }


  const ruleOnChange = (event: any, id: number) => {
    let newRules = [...rules];
    if (newRules[id].type == "checkbox") {
      newRules[id].value = event.target.checked;
    }
    if (newRules[id].type == "select") {
      newRules[id].value = event.target.selectedIndex;
    }
    setRules(newRules);
  }

  const handleEditorChange = (value: string | undefined, event: any) => {
    setCode(value as string);
  }
  return (
    <div className="App">
      <div className="code">
        <CodeEditor value={code} onChange={handleEditorChange} />
      </div>
      <div className="settings-container">
        {/* loop over rules */}

        <div className="settings">
          {rules.map((rule, i) => {
            return (
              <SettingsElement id={i} key={i} rule={rule} onChange={ruleOnChange} />
            )
          }
          )}

        </div>

        <div className="button-container">
          <div className="button" onClick={formatCode}>
            <p className="answer-choice">Format</p>
          </div>
          <div className="button" onClick={onButtonClick}>
            <p className="answer-choice">Open File</p>
            <input style={{ display: 'none' }} type="file" name="uploadedFile" id="file" onChange={getFileContent} ref={inputFile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
