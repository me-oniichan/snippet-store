import React, { useEffect, useState } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Workspace() {
  const [snippets, setSnippets] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    
  },[user])
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-8xl rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={10}>
        <div className="flex h-full justify-center p-6">
          <span className="font-semibold">One</span>
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