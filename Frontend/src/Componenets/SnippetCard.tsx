import { AiOutlineEdit, AiOutlineDelete} from "react-icons/ai"

interface snippetData{
    children : string;
}

export default function SnippetCard(props : snippetData){
    return(
        <div className="snippet-card">
            <div className="snippet-header">
                Title
            </div>
            <div className="snippet-content">
                {props.children}
            </div> 

            <div className="snippet-footer">
                <AiOutlineEdit className="footer-icon" size={25}/>
                <AiOutlineDelete className="footer-icon" size={25}/>
            </div>
        </div>
    )
}