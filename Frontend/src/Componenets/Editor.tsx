import { Editor } from "@monaco-editor/react";
import "../assets/css/editor.css"
import { useRef } from "react";

interface editorProp{
    readOnly: boolean,
}

export default function CodeArea(props : editorProp){
    const editorRef = useRef();

    const mount = (editor : any, monaco : any) =>{
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true
          });

        editorRef.current = editor;
        
    }
    console.log(props.readOnly)
    return(
        <div className="editor">
            <div className="editor-header">

            </div>
            <Editor height={600} width={600} theme="vs-dark" language="plaintext" onMount={mount} options={{
                readOnly : props.readOnly,
                
            }}/>
            <div className="editor-footer">

            </div>
        </div>
    )
} 