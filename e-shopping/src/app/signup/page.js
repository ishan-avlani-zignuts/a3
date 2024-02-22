// Import necessary modules
"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Import setUser action creator
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter hook
//import { setUser } from '@/Redux/userSlice';
import { setUser } from '../../Redux/userSlice';

function Page() {
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize useRouter hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        password: ''
    });

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    return (
        <div>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: "100vw", height: "100vh", backgroundColor: "#16202c" }}
            >
                <div
                    className="card p-4"
                    style={{ width: "400px", backgroundColor: "white" }}
                >
                    <h2 className="text-center mb-4" style={{ fontSize: "36px" }}>
                        Sign Up
                    </h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">
                                Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="number"
                                onChange={handleChange}
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
                            />
                        </div>
                        <button
                            type="button" // Change type to button to prevent form submission
                            className="btn btn-success"
                            style={{ background: "green" }}
                            onClick={() => {
                                dispatch(setUser(formData)); // Dispatch setUser action with form data
                                router.push('/login'); // Redirect user to login page
                                console.log('Form Data:', formData); // Log form data to console
                            }}
                        >
                            Submit
                        </button>
                        <Link href="/userlogin" className="btn btn-danger ms-2">
                            Back
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
