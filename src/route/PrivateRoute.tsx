import React, {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {AuthInfoContext} from "../system/AuthSystem";

function PrivateRoute({ children }: { children: any }) {
    const [authInfo] = React.useContext(AuthInfoContext);

    return (
        authInfo.loggedIn ? children : <Navigate to="/login" />
    );
}

export default PrivateRoute;