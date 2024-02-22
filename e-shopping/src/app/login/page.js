// Import necessary modules
"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/Redux/userSlice'; // Import loginUser action creator
import { useRouter } from 'next/navigation'; // Import useRouter hook

function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize useRouter hook
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch loginUser action with form data
        dispatch(loginUser(formData));
        // Redirect user to dashboard page upon successful login
        router.push('/products');
        // Log form data
        console.log('Form Data:', formData);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
