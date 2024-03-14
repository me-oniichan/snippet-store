import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
import SnippetCard from "./SnippetCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "./Context/hooks";
import { actions as snippetAction } from "./Context/snippetReducer";
import { actions as userAction } from "./Context/userReducer";
import { actions as miscAction } from "./Context/miscReducer";
import { actions as editAction } from "./Context/editReducer";
import GridLoader from "react-spinners/GridLoader";
import EditorArea from "./EditorArea";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function Workspace() {
  // Store's Data
  const snippets = useAppSelector((state) => state.snippetReducer.snippets);
  const selected = useAppSelector(state => state.snippetReducer.selectedSnippet);
  const user = useAppSelector((state) => state.userReducer.username);
  const loading = useAppSelector((state) => state.miscReducer.loading);
  const editDesc = useAppSelector((state) => state.editReducer.description);

  const mode = useAppSelector((state) => state.miscReducer.mode);

  // Store Dispatcher
  const dispatch = useAppDispatch();

  const [desc, setDesc] = useState<string>("");

  const loadDahsboard = async () => {
    dispatch(miscAction.setLoading(true));
    axios.get("/dashboard").then((res) => {
      if (res.status === 200) {
        dispatch(snippetAction.setSnippets(res.data.snippets));
        dispatch(userAction.setUser(res.data.user));
      }
      dispatch(miscAction.setLoading(false));
    });
  };

  useEffect(() => {
    loadDahsboard();
  }, [user]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-8xl rounded-lg border bg-card"
    >
      <ResizablePanel
        defaultSize={30}
        minSize={10}
        maxSize={50}
        className="border-r-2 border-accent-foreground/50"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <GridLoader loading={loading} color="rgb(34, 197, 94)"></GridLoader>
          </div>
        ) : (
          <ScrollArea className="h-full p-0 m-0">
            <div className="flex justify-between p-2 bg-popover">
              <span className="font-semibold">Snippets</span>
              <Button
                onClick={() => {
                  dispatch(snippetAction.setSelectedSnippet(-1));
                  dispatch(editAction.resetSnippet());
                  dispatch(miscAction.setMode("add"))
                }}
                size={"sm"}
              >
                Add
              </Button>
            </div>
            <div className="divide-y divide-accent-foreground/40 p-3">
              {snippets.map((snippet, idx) => {
                return (
                  <SnippetCard key={idx} {...snippet} idx={idx}></SnippetCard>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-0">
              <GridLoader loading={loading} color="rgb(34, 197, 94)" />
              <EditorArea language="plaintext" description={desc}>
                {" "}
              </EditorArea>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="h-full items-center justify-center p-3">
              <Textarea
                placeholder="description"
                value={mode === "read" && selected!==-1? snippets[selected].description : editDesc}
                onChange={(e) => dispatch(editAction.updateDesc(e.target.value))}
                className="h-full bg-popover mt-2"
                readOnly={mode === null || mode === "read"}
              ></Textarea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}