import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <div className='flex items-center justify-between shadow-md p-3 px-5'>
            <div className='flex items-center justify-center gap-5'>
                <Link href={"/"}>
                    <div className='font-semibold'>
                        Home
                    </div>
                </Link>
                <Link href={"/dashboard"}>
                    <div className='font-semibold'>
                        Pop-Up
                    </div>
                </Link>
            </div>
            <div className='flex gap-5'>
                <Button>
                    <Link href={'/login'}>Login</Link>
                </Button>
                <Button>
                    <Link href={'/register'}>
                        SignUp
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Header;