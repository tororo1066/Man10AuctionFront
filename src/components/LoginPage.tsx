import React, {useContext, useState} from 'react';
import Login from "../services/Login";
import {AuthInfoContext} from "../system/AuthSystem";
import {useNavigate} from "react-router-dom";

interface LoginFormState {
    name: string;
    pass: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormState>({
        name: '',
        pass: '',
    });

    const navigate = useNavigate();

    const [, setAuthInfo] = useContext(AuthInfoContext)

    // フォームの入力が変更されたときに呼ばれるハンドラ
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // フォームの送信が行われたときに呼ばれるハンドラ
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { name, pass } = formData;

        try {
            Login(name, pass).then((result) => {
                if (result) {
                    setAuthInfo({
                        loggedIn: true,
                        name: name,
                        token: result
                    });
                    navigate('/');
                } else {
                    setFormData({
                        ...formData,
                        pass: '',
                    });
                    alert("ログインに失敗しました");
                }
            }).catch()
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    const { name, pass } = formData;

    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">ユーザー名:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="pass">パスワード:</label>
                    <input
                        type="password"
                        id="pass"
                        name="pass"
                        value={pass}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}

export default LoginPage;
