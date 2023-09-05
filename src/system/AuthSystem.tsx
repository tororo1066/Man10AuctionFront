import React, {PropsWithChildren, useEffect, useState} from "react";
import Cookies from "js-cookie";


type AuthInfo = {
    loggedIn: boolean;
    name: string;
};

// 認証情報と認証情報セットのContext
export const AuthInfoContext = React.createContext<
    [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>]
>([{ loggedIn: false, name: "" }, () => {}]);


export const AuthContextProvider: React.FC<PropsWithChildren<{}>> = (props) => {
    // stateの定義
    const [authInfo, setAuthInfo] = useState<AuthInfo>({ loggedIn: false, name: "" });

    // authInfoのバリデーション
    useEffect(() => {
        autoLogin().then();
    }, []);
    return (
        <AuthInfoContext.Provider value={[authInfo, setAuthInfo]}>
            {props.children}
        </AuthInfoContext.Provider>
    );

    async function autoLogin() {
        const token = Cookies.get("token");
        if (token) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/loginwithtoken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tokenString: token
                })
            });
            if (response.ok) {
                const data = await response.text();
                setAuthInfo({
                    loggedIn: true,
                    name: data
                });
            } else {
                console.log(response.text());
                setAuthInfo({
                    loggedIn: false,
                    name: ""
                })
                Cookies.remove("token");
            }
        }
    }
};

