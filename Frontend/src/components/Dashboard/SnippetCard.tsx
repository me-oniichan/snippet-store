import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import Snippet from "@/types/Snippet"
import { useState } from "react"

export default function (props: Snippet) {
  return (
    <div>
      <Card className="group shadow-none mt-1 mb-1 rounded-md border-none hover:bg-accent">
        <CardContent className="p-2 pt-2 pb-2 group-hover:text-primary">
          {props.title}
        </CardContent>
        <CardFooter className="p-2 pt-0 gap-3">
          <CardDescription>{props.language}</CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}