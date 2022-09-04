import React, {useState} from "react";

export default function Login() {
    async function handleSubmit(event) {
        event.preventDefault();
        const headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": document.cookie.match(/csrftoken=([^&]*)/)[1]
        }
        return await fetch("api/login/", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                username,
                password
            })
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
        })
    }
    
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState();
    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="csrfmiddlewaretoken" value={document.cookie.match(/csrftoken=([^&]*)/)[1]} />
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    )
}