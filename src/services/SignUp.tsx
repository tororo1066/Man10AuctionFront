import Cookies from "js-cookie";

const SignUp = async (name: string, linkId: number, password: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            linkId: linkId,
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
}
export default SignUp;