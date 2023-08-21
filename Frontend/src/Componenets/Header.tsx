import { useAppSelector } from "../Context/storeEvents"

export default function Header(){
    const username  = useAppSelector(state => state.userReducer.username);
    return(
        <div className="header">
            <div className="store-logo">Snippet Store</div>

            <div className="header-list">
                <div className="header-option">Search</div>
                <div className="header-option">Sippets</div>
                <div className="header-option">Create</div>
                <div className="header-option">{username}</div>
            </div>
        </div>
    )
}