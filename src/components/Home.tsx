import React from "react";
import LogoutButton from "./LogoutButton";
import {AuthInfoContext} from "../system/AuthSystem";

const Home: React.FC = () => {
    const [authInfo] = React.useContext(AuthInfoContext);
    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <p>ログイン状態: {authInfo.loggedIn ? "ログイン中" : "ログインしていない"}</p>
            <p>Hello {authInfo.name}</p>
            <LogoutButton onLogoutClick={() => {}}/>
        </div>
    );
}
export default Home;