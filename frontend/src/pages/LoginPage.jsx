import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const [login_id, setlogin_id] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login_id, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('token', data.access_token);
                navigate('/dashboard')
            } else {
                // Handle errors
                const errorData = await response.json();
                console.log(errorData);
                alert(`Error: Incorrect login details. Please try again.`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    return (
        <form className='w-25  mx-auto mt-4  '>
            {/* header login form */}
            <h1 className='text-center pb-2  '>Login page</h1>

            {/* <!-- Email input --> */}
            <div class="form-outline mb-4">
                <label class="form-label" for="form2Example1">Email address</label>
                <input type="email" id="form2Example1" class="form-control" value={login_id} onChange={(e) => setlogin_id(e.target.value)} />
            </div>

            {/* <!-- Password input --> */}
            <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">Password</label>
                <input type="password" id="form2Example2" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            {/* <!-- Submit button --> */}
            <button type="button" class="btn btn-primary btn-block mb-4" onClick={handleSubmit} >
                Log in
            </button>
        </form>
    )
}

export default LoginPage