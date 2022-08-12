import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const host = "http://localhost:5000";
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({username: "", password: "", name: "", email: "", dob: "", cpassword: ""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {username, password, name, email, dob} = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, email, name, dob}),
        });
        const json = await response.json();
        console.log(json);
        if(json) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Account Created Successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }


    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
      
    return (
        <div className="mt-2">
            <h2 className="my-3">Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" minLength={3} onChange={onChange} required/>
                </div>
                <div className="my-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" aria-describedby="emailHelp" minLength={5} onChange={onChange} required/>
                </div>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onChange} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" minLength={6} onChange={onChange} required/>
                </div>
                <div className="my-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" minLength={6} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-outline-success" >Create an Account</button>
            </form>
        </div>
    )
}

export default Signup
