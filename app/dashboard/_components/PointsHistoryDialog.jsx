"use client";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useApi } from '@/app/_context/APIDetailContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const PointsHistoryDialog = ({ open, user }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { fetchUserHistory, error } = useApi();
    const [history, setHistory] = useState([]);
    const router = useRouter();

    useEffect(() => {
        setIsOpen(!isOpen);
        const getUser = async () => {
            try {
                const data = await fetchUserHistory(user);
                console.log("Fetched user history:", data);
                setHistory(data);
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };
        getUser();
    }, [open]);

    return (
        <div>
            <Dialog open={isOpen} className='w-full'>
                <DialogContent className="w-full flex flex-col justify-center">
                    <DialogHeader >
                        <DialogTitle className="w-full text-3xl font-bold my-5 text-center">test's History</DialogTitle>
                        <DialogDescription>

                            {
                                history?.map((data, index) => (
                                    <div key={index}>
                                        <div className='w-full flex flex-col justify-between gap-1'>
                                            <p>Date: <span className='text-black'>{data.date}</span></p>
                                            <p>Points Awarded: <span className='text-black'>{data.pointsAwarded}</span></p>
                                        </div>
                                        <hr className='my-2 border' />
                                    </div>
                                ))
                            }

                            <Button className="hover:scale-105 transition-all mt-5" onClick={() => { router.replace('/'); setIsOpen(!isOpen); }} >Cancel</Button>
                            {/* <div className='flex items-center justify-around mt-8'>
                                <Button className=" hover:scale-105 hover:bg-gray-700 transition-all">Export</Button>
                            </div> */}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PointsHistoryDialog;