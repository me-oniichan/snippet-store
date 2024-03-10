import React, { useEffect, useState } from "react"
import Snippet from "@/types/Snippet";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import axios from "axios";

export default function Workspace() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("/dashboard").then((res) => {
      setSnippets(res.data["snippets"])
      console.log(res.data["snippets"]);
    });
  }, [user])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-8xl rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={10}>
        <div className="flex h-full justify-center p-6">
          {
            snippets?.map((snippet, index) => {
              return (
                <div key={index} className="flex justify-center items-center p-2">
                  <span className="font-semibold">{snippet.title}</span>
                </div>
              )
            })
          }
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
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