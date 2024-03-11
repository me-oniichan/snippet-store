import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

export default function(){
    return(
        <div>
            <Card className="group shadow-none mt-1 mb-1 rounded-md border-none hover:bg-accent">
                <CardContent className="p-2 pt-2 pb-2 group-hover:text-primary">
                    Content
                </CardContent>
                <CardFooter className="p-2 pt-0 gap-3">
                    <CardDescription>Language</CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}