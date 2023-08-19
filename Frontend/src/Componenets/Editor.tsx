import { Editor, useMonaco } from "@monaco-editor/react";
import "../assets/css/editor.css";
import { useRef } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { GiStarFormation } from "react-icons/gi";

interface editorProp {
  readOnly: boolean,
  children: string,
  language: string
}

export default function CodeArea(props: editorProp) {
  const editorRef: any = useRef();
  const monaco = useMonaco();

  const mount = (editor: any, monaco: any) => {
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });

    editorRef.current = editor;
  };

  const changeLang = (element: any) => {
    if (monaco) {
      monaco.editor.setModelLanguage(
        editorRef.current.getModel(),
        element.target.value
      );
    }
  };

  console.log(props.readOnly);
  return (
    <div className="editor">
      <div className="editor-header">
        <select
          className="language"
          id="language"
          onChange={changeLang}
          defaultValue={props.language}
        >
          <option value="plaintext">plaintext</option>
          <option value="python">python</option>
          <option value="html">html</option>
          <option value="css">css</option>
          <option value="javascript">javascript</option>
          <option value="java">java</option>
          <option value="c">c</option>
          <option value="cpp">cpp</option>
          <option value="abap">abap</option>
          <option value="apex">apex</option>
          <option value="azcli">azcli</option>
          <option value="bat">bat</option>
          <option value="bicep">bicep</option>
          <option value="cameligo">cameligo</option>
          <option value="clojure">clojure</option>
          <option value="coffeescript">coffeescript</option>
          <option value="csharp">csharp</option>
          <option value="csp">csp</option>
          <option value="cypher">cypher</option>
          <option value="dart">dart</option>
          <option value="dockerfile">dockerfile</option>
          <option value="ecl">ecl</option>
          <option value="elixir">elixir</option>
          <option value="flow9">flow9</option>
          <option value="fsharp">fsharp</option>
          <option value="go">go</option>
          <option value="graphql">graphql</option>
          <option value="handlebars">handlebars</option>
          <option value="hcl">hcl</option>
          <option value="ini">ini</option>
          <option value="julia">julia</option>
          <option value="kotlin">kotlin</option>
          <option value="less">less</option>
          <option value="lexon">lexon</option>
          <option value="lua">lua</option>
          <option value="liquid">liquid</option>
          <option value="m3">m3</option>
          <option value="markdown">markdown</option>
          <option value="mips">mips</option>
          <option value="msdax">msdax</option>
          <option value="mysql">mysql</option>
          <option value="objective">objective-c</option>
          <option value="pascal">pascal</option>
          <option value="pascaligo">pascaligo</option>
          <option value="perl">perl</option>
          <option value="pgsql">pgsql</option>
          <option value="php">php</option>
          <option value="pla">pla</option>
          <option value="postiats">postiats</option>
          <option value="powerquery">powerquery</option>
          <option value="powershell">powershell</option>
          <option value="proto">proto</option>
          <option value="pug">pug</option>
          <option value="qsharp">qsharp</option>
          <option value="r">r</option>
          <option value="razor">razor</option>
          <option value="redis">redis</option>
          <option value="redshift">redshift</option>
          <option value="restructuredtext">restructuredtext</option>
          <option value="ruby">ruby</option>
          <option value="rust">rust</option>
          <option value="sb">sb</option>
          <option value="scala">scala</option>
          <option value="scheme">scheme</option>
          <option value="scss">scss</option>
          <option value="shell">shell</option>
          <option value="sol">sol</option>
          <option value="aes">aes</option>
          <option value="sparql">sparql</option>
          <option value="sql">sql</option>
          <option value="st">st</option>
          <option value="swift">swift</option>
          <option value="systemverilog">systemverilog</option>
          <option value="verilog">verilog</option>
          <option value="tcl">tcl</option>
          <option value="twig">twig</option>
          <option value="typescript">typescript</option>
          <option value="vb">vb</option>
          <option value="wgsl">wgsl</option>
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
          <GiStarFormation size={20} className="icon" onClick={()=>{
             editorRef.current.getAction('editor.action.formatDocument').run();
          }}/>
        </div>
      </div>

      <Editor
        theme="vs-dark"
        language={props.language}
        onMount={mount}
        options={{
          readOnly: props.readOnly,
          fontFamily: "Fira Code",
        }}
        value={props.children}
      />
      <div className="editor-footer"></div>
    </div>
  );
}
