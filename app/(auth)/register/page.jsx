import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Register = () => {
  const fixedInputStyle = 'px-5 py-1 border-2 rounded-lg outline-blue-600';
  return (
    <div className='relative flex items-center justify-center mt-10 h-screen'>
      <div className='absolute flex flex-col items-center top-[10%] bg-gray-400 border border-gray-300 rounded-lg px-5 py-2'>
        <h1 className='my-5 text-xl font-semibold text-white'>Register</h1>
        <form className='flex flex-col gap-10'>
          <div className='flex gap-5'>
            <input required type='text' className={fixedInputStyle} placeholder='First Name' />
            <input required type='text' className={fixedInputStyle} placeholder='Last Name' />
          </div>
          <div className='flex gap-5'>
            <input required type='text' className={fixedInputStyle} placeholder='username' />
            <input required type='email' className={fixedInputStyle} placeholder='Email' />
          </div>
          <div className='flex items-center justify-center'>
            <input required type='password' className={fixedInputStyle} placeholder='Password' />
          </div>
          <Button>Submit</Button>
        </form>
        <p className='text-white text-center my-5'>Already have an account? <Link href='/login' className='underline hover:text-blue-500'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;