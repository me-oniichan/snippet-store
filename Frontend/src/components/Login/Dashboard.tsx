import axios from 'axios';
import React from 'react';
import Cookies from 'universal-cookie';

const HelloWorld: React.FC = () => {
    const cookie = new Cookies(null, {path: "/"});
    const handleClick = () => {
        axios.post("/onii-auth/logout", {},
        {
            withCredentials: true,
            headers: {
                "X-CSRFToken": cookie.get("csrftoken"),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
    )};

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default HelloWorld;