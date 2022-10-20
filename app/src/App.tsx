import React, { MutableRefObject, useRef } from 'react';
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



function App() {
  //use rules from rules.json
  const [rules, setRules] = React.useState<Rule[]>(config as Rule[]);
  const [code, setCode] = React.useState<string>("");
  const [time, setTime] = React.useState<number>(0);
  const [nrOfLines, setNrOfLines] = React.useState<number>(0);
  const inputFile = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;

  const formatTexCode = (code: string, rules: Rule[]) => {
    let formatter = new Formatter(rules);
    formatter.on("time", (time) => {
      setTime(time);
    });

    formatter.on("nrOfLines", (nrOfLines) => {
      setNrOfLines(nrOfLines)
    })
    code = formatter.formatAll(code);

    return code;

  }

  const isFileTex = (fileContent: string) => {
    return fileContent.includes("\\documentclass");
  }



  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.value = "";
    inputFile.current.click();
  };


  const getFileContent = () => {
    // @ts-ignore: Object is possibly 'null'.
    var file = inputFile.current.files[inputFile.current.files?.length - 1];
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

  const formatCode = async () => {
    setCode(formatTexCode(code, rules));
  }
  const saveToFile = () => {
    let string = `formatted-${new Date().getTime()}.tex`
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    pom.setAttribute('download', string);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }

  }


  const ruleOnChange = (event: any, id: number) => {
    let newRules = [...rules];
    if (newRules[id].type === "checkbox") {
      newRules[id].value = event.target.checked;
    }
    if (newRules[id].type === "select") {
      newRules[id].value = event.target.selectedIndex;
    }
    setRules(newRules);
  }

  const handleEditorChange = (value: string | undefined, event: any) => {
    setCode(value as string);
  }
  return (
    <div>


      <div className="App">
        <div className="code">
          <CodeEditor value={code} onChange={handleEditorChange} />
        </div>
        <div className="settings-container">
          {/* loop over rules */}
          <div className="settings">
            <h2>TexMex</h2>
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
            <div className="button" onClick={saveToFile}>
              <p className="answer-choice">Save to file</p>
            </div>
            <div className="button" onClick={onButtonClick}>
              <p className="answer-choice">Open File</p>
              <input style={{ display: 'none' }} type="file" name="uploadedFile" onChange={getFileContent} id="file" ref={inputFile} />
            </div>
          </div>
        </div>
      </div>
      <div className="bar">
        <p>Version: 0.3.0</p>
        {time !== 0 ? (
          <p>Processed {nrOfLines} lines in {time.toFixed(2)} ms</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
