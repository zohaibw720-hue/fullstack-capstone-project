import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { urlConfig } from '../../config';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');

    const handleLogin = async () => {
        try {
            const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : ''
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const json = await res.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                navigate('/app');
            } else {
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                setIncorrect('Wrong password. Try again.');
                setTimeout(() => setIncorrect(''), 2000);
            }
        } catch (e) {
            console.log('Error logging in: ' + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4">Login</h2>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input id="email" type="email" className="form-control"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input id="password" type="password" className="form-control"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="text-danger">{incorrect}</span>
                        </div>

                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>

                        <p className="text-center mt-3">
                            New here? <Link to="/app/register" className="text-primary">Register Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
