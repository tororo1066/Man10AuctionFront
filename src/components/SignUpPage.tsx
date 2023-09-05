import React, {useContext, useState} from 'react';
import SignUp from "../services/SignUp";
import {AuthInfoContext} from "../system/AuthSystem";
import {useNavigate} from "react-router-dom";

interface SignUpFormState {
    name: string;
    linkId: number;
    pass: string;
}

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormState>({
        name: '',
        linkId: 0,
        pass: '',
    });

    const navigate = useNavigate();

    const [, setAuthInfo] = useContext(AuthInfoContext)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'name' || name === 'pass') {
            setFormData({ ...formData, [name]: value });
        }
        if (name === 'linkId') {
            setFormData({ ...formData, [name]: Number(value) });
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { name, linkId, pass } = formData;

        SignUp(name, linkId, pass)
            .then((e) => {
                if (e) {
                    setAuthInfo({
                        loggedIn: true,
                        name: name,
                    });
                    navigate('/')
                } else {
                    setFormData({ ...formData, pass: '' });
                    alert("ログインに失敗しました");
                }
            })
            .catch();
    }

    return (
        <div>
            <h2>サインアップ</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">ユーザー名:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="linkId">リンクID:</label>
                    <input
                        type="number"
                        id="linkId"
                        name="linkId"
                        value={formData.linkId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="pass">パスワード:</label>
                    <input
                        type="password"
                        id="pass"
                        name="pass"
                        value={formData.pass}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">サインアップ</button>
            </form>
        </div>
    );
}

export default SignUpPage;
