import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                navigate('/app');
            } else if (json.error) {
                setShowerr(json.error);
            }
        } catch (e) {
            console.log('Error registering user: ' + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4">Register</h2>

                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input id="firstName" type="text" className="form-control"
                                value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input id="lastName" type="text" className="form-control"
                                value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input id="email" type="email" className="form-control"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="text-danger">{showerr}</div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input id="password" type="password" className="form-control"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
