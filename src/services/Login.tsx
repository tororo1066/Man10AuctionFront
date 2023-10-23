import Cookies from "js-cookie";

const Login = async (name: string, password: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                pass: password
            })
        });
        if (response.ok) {
            const data = await response.text();
            Cookies.set('token', data);
            return data;
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
}

export default Login;