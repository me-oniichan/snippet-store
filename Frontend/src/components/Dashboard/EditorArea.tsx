import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState, forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "./Context/hooks";
import { Input } from "../ui/input";
import axios from "axios";
import Cookie from "universal-cookie";
import { useAppDispatch } from "./Context/hooks";
import { actions as snippetAction } from "./Context/snippetReducer";
import { actions as editAction } from "./Context/editReducer";
import { Label } from "../ui/label";
import { actions as miscAction } from "./Context/miscReducer";
import { useUtils } from "./utils/useUtils";

interface editorProp {
  children: string;
  language: string;
  description?: string;
}

export default forwardRef((props: editorProp, ref: any) => {
  // Store's Data
  const selected = useAppSelector(
    (state) => state.snippetReducer.selectedSnippet
  );
  const mode = useAppSelector((state) => state.miscReducer.mode);
  const snippets = useAppSelector((state) => state.snippetReducer.snippets);

  // dispatcher
  const dispatch = useAppDispatch();

  //monaco variables
  const editorRef = useRef<any>(null);
  const monaco = useMonaco();

  // Edit Reducer vars
  const editCode = useAppSelector((state) => state.editReducer.code);
  const editTitle = useAppSelector((state) => state.editReducer.title);
  const editPrefix = useAppSelector((state) => state.editReducer.prefix);
  const editLang = useAppSelector((state) => state.editReducer.language);

  // cookie
  const cookie = new Cookie();

  //functions
  const mount = (editor: any, monaco: any) => {
    if (ref) ref.current = editor;
    editorRef.current = editor;
  };

  const changeLang = (element: any) => {
    dispatch(editAction.updateLanguage(element));
  };

  // send data to backend
  const {addSnippet, editSnippet} = useUtils();

  function changeEdit() {
    if (selected == -1) {
      dispatch(editAction.resetSnippet());
    } else {
      dispatch(editAction.loadSnippet(snippets[selected]));
      dispatch(miscAction.setMode("edit"));
    }
  }

  function deleteSnippet() {
    if (selected !== -1) {
      axios
        .post(
          "/onii-store/delete",
          { snippet_id: snippets[selected].pk },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-CSRFToken": cookie.get("csrftoken"),
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch(snippetAction.deleteSnippet(selected));
          }
        });
    }
  }

  if (selected == -1 && mode !== "add") return <>Nothing to see here</>;
  return (
    <div className="h-full w-full">
      <div className="h-[40px] m-1 flex justify-between gap-6">
        <Select
          onValueChange={changeLang}
          value={mode === "read" ? snippets[selected].language : editLang}
        >
          <SelectTrigger className="bg-popover w-40">
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="plaintext">plaintext</SelectItem>
              <SelectItem value="python">python</SelectItem>
              <SelectItem value="html">html</SelectItem>
              <SelectItem value="css">css</SelectItem>
              <SelectItem value="javascript">javascript</SelectItem>
              <SelectItem value="java">java</SelectItem>
              <SelectItem value="c">c</SelectItem>
              <SelectItem value="cpp">c++</SelectItem>
              <SelectItem value="bat">bat</SelectItem>
              <SelectItem value="clojure">clojure</SelectItem>
              <SelectItem value="coffeescript">coffeescript</SelectItem>
              <SelectItem value="csharp">csharp</SelectItem>
              <SelectItem value="csp">csp</SelectItem>
              <SelectItem value="dart">dart</SelectItem>
              <SelectItem value="dockerfile">dockerfile</SelectItem>
              <SelectItem value="elixir">elixir</SelectItem>
              <SelectItem value="fsharp">fsharp</SelectItem>
              <SelectItem value="go">go</SelectItem>
              <SelectItem value="graphql">graphql</SelectItem>
              <SelectItem value="hcl">hcl</SelectItem>
              <SelectItem value="julia">julia</SelectItem>
              <SelectItem value="kotlin">kotlin</SelectItem>
              <SelectItem value="less">less</SelectItem>
              <SelectItem value="lua">lua</SelectItem>
              <SelectItem value="markdown">markdown</SelectItem>
              <SelectItem value="mysql">mysql</SelectItem>
              <SelectItem value="objective-c">objective-c</SelectItem>
              <SelectItem value="pascal">pascal</SelectItem>
              <SelectItem value="pascaligo">pascaligo</SelectItem>
              <SelectItem value="perl">perl</SelectItem>
              <SelectItem value="pgsql">pgsql</SelectItem>
              <SelectItem value="php">php</SelectItem>
              <SelectItem value="powershell">powershell</SelectItem>
              <SelectItem value="proto">proto</SelectItem>
              <SelectItem value="pug">pug</SelectItem>
              <SelectItem value="r">r</SelectItem>
              <SelectItem value="ruby">ruby</SelectItem>
              <SelectItem value="rust">rust</SelectItem>
              <SelectItem value="scala">scala</SelectItem>
              <SelectItem value="scss">scss</SelectItem>
              <SelectItem value="shell">shell</SelectItem>
              <SelectItem value="sql">sql</SelectItem>
              <SelectItem value="swift">swift</SelectItem>
              <SelectItem value="twig">twig</SelectItem>
              <SelectItem value="typescript">typescript</SelectItem>
              <SelectItem value="vb">vb</SelectItem>
              <SelectItem value="xml">xml</SelectItem>
              <SelectItem value="yaml">yaml</SelectItem>
              <SelectItem value="json">json</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label className="flex justify-center items-center gap-2">
          Prefix
          <Input
            className=""
            placeholder="Prefix"
            readOnly={mode === "read"}
            value={mode === "read" ? snippets[selected]?.prefix : editPrefix}
            onChange={(e) => dispatch(editAction.updatePrefix(e.target.value))}
          ></Input>
        </Label>

        <Label className="flex items-center gap-2 w-full">
          Title
          <Input
            placeholder="Title"
            readOnly={mode === "read"}
            value={mode == "read" ? snippets[selected].title : editTitle}
            onChange={(e) => dispatch(editAction.updateTitle(e.target.value))}
          ></Input>
        </Label>

        <div className="flex gap-2">
          {mode == "read" ? (
            <Button size={"sm"} onClick={changeEdit}>
              Edit
            </Button>
          ) : (
            <></>
          )}
          {mode === "read" ? (
            <Button size={"sm"} variant={"destructive"} onClick={deleteSnippet}>
              Delete
            </Button>
          ) : (
            <></>
          )}
          {mode === "add" ? (
            <Button size={"sm"} onClick={addSnippet}>
              Save
            </Button>
          ) : (
            <></>
          )}
          {mode === "edit" ? <Button size={"sm"} onClick={editSnippet}>Save</Button> : <></>}
          {mode === "edit" || mode === "add" ? (
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => dispatch(miscAction.setMode("read"))}
            >
              Cancel
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Editor
        theme="vs-dark"
        language={mode === "read" ? snippets[selected].language : editLang}
        onMount={mount}
        options={{
          readOnly: mode === "read",
          domReadOnly: true,
          fontFamily: "Fira Code",
          fontSize: 16,
          showUnused: false,
          showDeprecated: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            horizontal: "visible",
            vertical: "visible",
          },
        }}
        height={"calc(100% - 40px)"}
        value={mode === "read" ? snippets[selected].code : editCode}
        onChange={(code) => dispatch(editAction.updateCode(code))}
      />
    </div>
  );
});
