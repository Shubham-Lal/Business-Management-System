import { useState } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

export interface AuthProps {
    setTab: React.Dispatch<React.SetStateAction<"login" | "signup">>
}

export default function Auth() {
    const [tab, setTab] = useState<"login" | "signup">("login");

    return tab === "login" ? (
        <Login setTab={setTab} />
    ) : tab === "signup" ? (
        <Signup setTab={setTab} />
    ) : null
}