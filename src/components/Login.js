import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: credentials.username, password: credentials.password}),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successful!", "success");
            navigate('/');
        } else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
      



    return (
        <div className="mt-2">
            <h2 className="my-3">Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={credentials.username} onChange={onChange} minLength={3} required/>
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="password" minLength={6} required/>
                </div>
                <button type="submit" className="btn btn-outline-success" >Login</button>
            </form>
        </div>
    )
}

export default Login
