import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import Snippet from "@/types/Snippet"
import axios from "axios"
import { actions as editAction } from "./Context/editReducer"
import { useAppDispatch, useAppSelector } from "./Context/hooks"
import { actions as miscAction } from "./Context/miscReducer"
import { actions as snippetAction } from "./Context/snippetReducer"

export default function (props: {idx: number}&Snippet) {
  const selected = useAppSelector(state=>state.snippetReducer.selectedSnippet) === props.idx;
  const snippet = useAppSelector(state=> state.snippetReducer.snippets)[props.idx]
  const dispatch = useAppDispatch();

  async function updateView(){
    dispatch(miscAction.setMode("read"))
    if(snippet.code == undefined){
      await axios.get("/onii-store/get-snippet/"+snippet.pk).then(res=>{
        if (res.status == 200){
          dispatch(snippetAction.updateSnippet(res.data.snippet))
        }
      }).catch(error=>{
        console.log(error);
        
      })
    }
    else{
      dispatch(editAction.loadSnippet(snippet))
    }
    dispatch(snippetAction.setSelectedSnippet(props.idx))
  }

  return (
    <div>
      <Card className={"group shadow-none rounded-none bg-card "+ (selected?"bg-secondary border-none hover:border-foreground": "border-none hover:bg-secondary")}
        onClick={updateView}
      >
        <CardContent className="p-2 pt-2 pb-1 group-hover:text-primary">
          {props.title}
        </CardContent>
        <CardFooter className="p-2 pt-0 gap-3">
          <CardDescription>{props.language}</CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}