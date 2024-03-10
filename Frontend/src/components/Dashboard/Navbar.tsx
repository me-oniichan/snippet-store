import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import Cookies from "universal-cookie";
const Navbar: React.FC = () => {
    const cookie = new Cookies(null, {path: "/"});
    const handleLogout = () => {
        axios.post("/onii-auth/logout", {},
        {
            withCredentials: true,
            headers: {
                "X-CSRFToken": cookie.get("csrftoken"),
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(() => {
            window.location.href = "/";
        });
    };
  return (
    <nav className="bg-gray-800 max-w-1300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <img className="h-8 w-50" src="/logo.svg" alt="Snippet Store" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                <span>
                    username
                </span>
                <Button variant={"destructive"} size={"sm"} className="m-1" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
