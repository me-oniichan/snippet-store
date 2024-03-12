import React, { useEffect, useState } from "react"
import Snippet from "@/types/Snippet";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import axios from "axios";
import SnippetCard from "./SnippetCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Workspace() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    axios.get("/dashboard").then((res) => {
      setSnippets(res.data["snippets"])
      setUser(res.data["user"])
    });
  }, [user])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-8xl rounded-lg border bg-card"
    >
      <ResizablePanel defaultSize={30} minSize={10} maxSize={50} className="border-r-2 border-accent-foreground/50">
        <ScrollArea className="h-full p-0 m-0">

          <div className="divide-y divide-accent-foreground/40 p-3">

            {
              snippets?.map((snippet, index) => {
                return (
                  <SnippetCard></SnippetCard>
                )
              })
            }

            <SnippetCard></SnippetCard>
            <SnippetCard></SnippetCard>
            <SnippetCard></SnippetCard>
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">{user}</span>
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
  )
}