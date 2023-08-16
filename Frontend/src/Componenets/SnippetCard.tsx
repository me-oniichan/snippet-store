interface cardProp{
    language: string,
    title: string,
    seleced: boolean
}

export default function(props: cardProp){
    return(
        <div className="snippet-card" style={ props.seleced? {borderColor: "var(--glow)"}:{}}>
            <div className="title">{props.title}</div>
            <div className="lang">{props.language}</div>
        </div>
    )
}