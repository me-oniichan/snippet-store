import { useEffect } from "react";
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
import GridLoader from "react-spinners/GridLoader";

export default function Workspace() {
  const snippets = useAppSelector((state) => state.snippetReducer.snippets);
  const user = useAppSelector((state) => state.userReducer.username);
  const loading = useAppSelector((state) => state.miscReducer.loading);

  const dispatch = useAppDispatch();

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
        {
          loading ?
            <div className="flex items-center justify-center h-full">
              <GridLoader loading={loading} color="rgb(34, 197, 94)"></GridLoader>
            </div>
            :
            <ScrollArea className="h-full p-0 m-0">
              <div className="divide-y divide-accent-foreground/40 p-3">
                {snippets.map((snippet, idx) => {
                  return <SnippetCard key={idx} {...snippet}></SnippetCard>;
                })}

              </div>
            </ScrollArea>
        }
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <GridLoader loading={loading} color="rgb(34, 197, 94)" />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
