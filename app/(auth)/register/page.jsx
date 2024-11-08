"use client"
import { useApi } from '@/app/_context/APIDetailContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Register = () => {
  const { registerUser, error } = useApi(); // Get the register function and error from context
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
  const router = useRouter();

  const fixedInputStyle = 'px-5 py-1 border-2 rounded-lg outline-blue-600';

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await registerUser(form); // Call the registerUser function from context
    console.log("success "+ success);
    if (success) {
      router.push('/login'); // Redirect to login page upon successful registration
    }
  };

  return (
    <div className='relative flex items-center justify-center mt-10 h-screen'>
      <div className='absolute flex flex-col items-center top-[10%] bg-gray-400 border border-gray-300 rounded-lg px-5 py-2'>
        <h1 className='my-5 text-xl font-semibold text-white'>Register</h1>
        <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
          <div className='flex gap-5'>
            <input
              required
              type='text'
              name='firstName'
              value={form.firstName}
              onChange={handleChange}
              className={fixedInputStyle}
              placeholder='First Name'
            />
            <input
              required
              type='text'
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              className={fixedInputStyle}
              placeholder='Last Name'
            />
          </div>
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
            <input
              required
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className={fixedInputStyle}
              placeholder='Email'
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
          Already have an account?{' '}
          <Link href='/login' className='underline hover:text-blue-500'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
