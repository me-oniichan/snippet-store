import React, { CSSProperties, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import Cookie from "universal-cookie";
import useTheme from "@/lib/themes";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const LoginPage: React.FC = () => {
  useTheme("dark");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const cookie = new Cookie(null, { path: "/" });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "/onii-auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": cookie.get("csrftoken"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.status == 302 || response.status == 200) {
          toast({
            title: "Successfully Logged In",
            description: "Redirecting to Dashboard",
            variant: "default"
          });
          window.location.href = "/";
        }
        else {
          toast({
            title: "Error",
            description: "Invalid Credentials",
            variant: "destructive"
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: "Invalid Credentials",
          variant: "destructive"
        });
        setIsLoading(false);
      });
  };



  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-3xl">Login</h2>{" "}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {
              isLoading ?
                <div style={{ height: 30, display: "flex", placeContent: "center" }}>
                  <PropagateLoader cssOverride={override} color="lime" />
                </div>
                : <></>
            }
            <div className="grid w-full items-center gap-4 text-lg w-[400px]">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="text-lg bg-background p-6"
                />
              </div>
              <div className="mb-3">
                <Label htmlFor="password">Password </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="text-lg bg-background p-6"
                />
              </div>
              <Button type="submit" variant={"outline"} className="text-xl">
                Login
              </Button>
            </div>

            <div className="text-center text-accent-foreground/40 mt-1 hover:text-primary">
              <a href="/onii-auth/signup" className="text-sm">
                Register yourself
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default LoginPage;
