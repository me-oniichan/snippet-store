import { Editor, useMonaco } from "@monaco-editor/react";
import "../assets/css/editor.css";
import { useEffect, useRef, useState, forwardRef } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { GiStarFormation } from "react-icons/gi";

interface editorProp {
  readOnly: boolean;
  children: string;
  language: string;
  height: string;
}

export default forwardRef((props: editorProp, ref: any) => {
  const editorRef: any = useRef();
  const monaco = useMonaco();

  const [language, setLanguage] = useState(props.language);

  useEffect(() => {
    setLanguage(props.language);
  }, [props.language]);

  const mount = (editor: any, monaco: any) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
    if (ref) ref.current = editor;
    editorRef.current = editor;
  };

  const changeLang = (element: any) => {
    setLanguage(element.target.value);
    if (monaco) {
      monaco.editor.setModelLanguage(
        editorRef.current.getModel(),
        element.target.value
      );
    }
  };

  return (
    <div className="editor" style={{ height: props.height }}>
      <div className="editor-header">
        <select
          className="language"
          id="language"
          onChange={changeLang}
          value={language}
        >
          <option value="plaintext">plaintext</option>
          <option value="python">python</option>
          <option value="html">html</option>
          <option value="css">css</option>
          <option value="javascript">javascript</option>
          <option value="java">java</option>
          <option value="c">c</option>
          <option value="cpp">c++</option>
          <option value="bat">bat</option>
          <option value="clojure">clojure</option>
          <option value="coffeescript">coffeescript</option>
          <option value="csharp">csharp</option>
          <option value="csp">csp</option>
          <option value="dart">dart</option>
          <option value="dockerfile">dockerfile</option>
          <option value="elixir">elixir</option>
          <option value="fsharp">fsharp</option>
          <option value="go">go</option>
          <option value="graphql">graphql</option>
          <option value="hcl">hcl</option>
          <option value="julia">julia</option>
          <option value="kotlin">kotlin</option>
          <option value="less">less</option>
          <option value="lua">lua</option>
          <option value="markdown">markdown</option>
          <option value="mysql">mysql</option>
          <option value="objective-c">objective-c</option>
          <option value="pascal">pascal</option>
          <option value="pascaligo">pascaligo</option>
          <option value="perl">perl</option>
          <option value="pgsql">pgsql</option>
          <option value="php">php</option>
          <option value="powershell">powershell</option>
          <option value="proto">proto</option>
          <option value="pug">pug</option>
          <option value="r">r</option>
          <option value="ruby">ruby</option>
          <option value="rust">rust</option>
          <option value="scala">scala</option>
          <option value="scss">scss</option>
          <option value="shell">shell</option>
          <option value="sql">sql</option>
          <option value="swift">swift</option>
          <option value="twig">twig</option>
          <option value="typescript">typescript</option>
          <option value="vb">vb</option>
          <option value="xml">xml</option>
          <option value="yaml">yaml</option>
          <option value="json">json</option>
        </select>

        <div className="editor-options">
          {!props.readOnly ? (
            <AiOutlineReload
              size={20}
              className="icon"
              onClick={() => {
                if (editorRef.current && !props.readOnly) {
                  editorRef.current.getModel().setValue("");
                }
              }}
            />
          ) : (
            ""
          )}
          <GiStarFormation
            size={20}
            className="icon"
            onClick={() => {
              editorRef.current.getAction("editor.action.formatDocument").run();
            }}
          />
        </div>
      </div>

      <Editor
        theme="vs-dark"
        language={language}
        onMount={mount}
        options={{
          readOnly: props.readOnly,
          domReadOnly: true,
          fontFamily: "Fira Code",
          fontSize: 18,
          showUnused: false,
          showDeprecated: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            horizontal: "visible",
            vertical: "visible"
          }
        }}
        value={props.children}
        height="95%"
      />
    </div>
  );
});
