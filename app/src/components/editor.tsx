import React, { useState } from "react";
import { model } from "../model";
import * as mon from 'monaco-editor'
import Editor, { Monaco, OnChange } from "@monaco-editor/react";

const CodeEditor = ({ onChange, value }: { value: string, onChange: OnChange }) => {

    const [language, setLanguage] = useState("javascript")

    function handleEditorDidMount(editor: mon.editor.IStandaloneCodeEditor, monaco: Monaco) {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        if (!monaco.editor.getModel(mon.Uri.parse('inmemory://model/1')))
            monaco.editor.createModel(model, 'tex', mon.Uri.parse('inmemory://model/1'))

        setLanguage("tex")
    }

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="100vh"
                width={`100%`}
                language={language}
                theme={'vs-dark'}
                value={value}
                defaultValue="// some comment"
                //@ts-ignore
                onMount={handleEditorDidMount}
                onChange={onChange}
            />
        </div>
    );
};
export default CodeEditor;