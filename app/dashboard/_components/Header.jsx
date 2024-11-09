"use client";
import { useApi } from '@/app/_context/APIDetailContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "@/components/ui/avatar";


const Header = () => {
    const { fetchUserInfo, error } = useApi();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUserInfo();
                console.log("Fetched user data:", data);
                setUsers(data.data);
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };
        getUsers();
    }, []);

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
            {
                users>0 ?
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
                    :
                    <div className='flex items-center justify-center gap-2'>
                        Welcome,
                        <DropdownMenu>
                            <DropdownMenuTrigger className='text-blue-500'>
                                <Avatar className='bg-black flex items-center justify-center text-white'>
                                    
                                    {users?.firstName?.substring(0,2)}
                                    
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>{users.username}</DropdownMenuItem>
                                <DropdownMenuItem>{users.email}</DropdownMenuItem>
                                <DropdownMenuItem>Points {users.Points}</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
            }
        </div>
    );
};

export default Header;