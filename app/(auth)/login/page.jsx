"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { useApi } from '@/app/_context/APIDetailContext';


const Login = () => {
    const { loginUser, error } = useApi();
    const router = useRouter(); // Initialize useRouter
    const [form, setForm] = useState({ username: '', password: '' });

    const fixedInputStyle = 'px-5 py-1 border-2 rounded-lg outline-blue-600';

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(form); // Call the loginUser function from context

        if (success) {
            router.push('/'); // Redirect to home page upon successful login
        }
    };

    return (
        <div className='relative flex items-center justify-center mt-5 h-screen'>
            <div className='absolute flex flex-col items-center top-[10%] bg-gray-400 border border-gray-300 rounded-lg px-5 py-2'>
                <h1 className='my-5 text-xl font-semibold text-white'>Login</h1>
                <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
                    <div className='flex gap-5'>
                        <input
                            required
                            type='text'
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            className={fixedInputStyle}
                            placeholder='Username'
                        />
                    </div>
                    <div className='flex items-center justify-center'>
                        <input
                            required
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            className={fixedInputStyle}
                            placeholder='Password'
                        />
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                <p className='text-white text-center my-5'>
                    Don&apos;t have an account?{' '}
                    <Link href='/register' className='underline hover:text-blue-500'>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
