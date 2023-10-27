import React from 'react';
import Cookies from "js-cookie";
import {AuthInfoContext} from "../system/AuthSystem";

interface LogoutButtonProps {
    onLogoutClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutClick }) => {
    const [authInfo, setAuthInfo] = React.useContext(AuthInfoContext);

    if (!authInfo.loggedIn) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#fff',
                padding: '10px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
            onClick={ () => {
                Cookies.remove("token");
                setAuthInfo({
                    loggedIn: false,
                    name: ""
                });
                onLogoutClick();
            }
        }
        >
            ログアウト
        </div>
    );
};

export default LogoutButton;
