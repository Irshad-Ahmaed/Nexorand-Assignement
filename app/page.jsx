"use client"
import { UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApi } from './_context/APIDetailContext';
import { toast } from "sonner"
import PointsHistoryDialog from './dashboard/_components/PointsHistoryDialog';

const Home = () => {
  const {fetchUsers, claimPoints, error } = useApi();
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [singleUser, setSingleUser] = useState([]);

  const getPoints = async(user) => {
    console.log(users);
    try {
      await claimPoints(user);
      toast(`Points claimed successfully for ${user.firstName}`);
      await refreshUsers();
      setSingleUser(user);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Error clamming points:", error);
    }
  }

  // Fetch user details on component mount
  const refreshUsers = async () => {
    try {
      const data = await fetchUsers(); // Fetch updated user data
      const rankedUsers = data
        .sort((a, b) => b.Points - a.Points) // Sort users by points
        .map((user, index) => ({ ...user, rank: index + 1 }));
      setUsers(rankedUsers); // Update the users state with new data
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    refreshUsers();
    console.log(users);
  }, []);
  

  return (
    <div className='relative h-screen w-screen flex items-center justify-center mt-5'>
      <div className='absolute w-1/2 flex flex-col items-center top-[5%] bg-gray-100 border border-gray-300 rounded-lg'>

        <div className='flex w-full justify-between items-center bg-blue-500 p-5 '>
          <div className='flex flex-col text-white'>
            <h3>3928 Today</h3>
            <p>$2875.00</p>
          </div>
          <div>LeaderBoard</div>
        </div>

        <div className='flex gap-5 w-full items-center justify-center mt-5'>
          <div className='px-2 py-1 bg-gray-300 border rounded-2xl cursor-pointer hover:bg-orange-500 hover:text-white'>Daily</div>
          <div className='px-2 py-1 bg-gray-300 border rounded-2xl cursor-pointer hover:bg-orange-500 hover:text-white'>Weekly</div>
          <div className='px-2 py-1 bg-gray-300 border rounded-2xl cursor-pointer hover:bg-orange-500 hover:text-white'>Monthly</div>
        </div>

        <div className='w-full flex justify-around items-center mt-5'>
        {
          users.map((user, index) => 
          index<3 &&
          <div className='flex flex-col items-center'>
            <p>{user.firstName}</p>
            <p>{user.Points}</p>
            <p className='text-orange-500'>Prize: ${user.Points}</p>
          </div>
        )}
          
        </div>

        <div className='w-full flex flex-col gap-1 mt-10'>
        {
          users.map((user, index) => 
          index<10 && (
          <div key={index} onClick={()=> getPoints(user)} className='flex items-center justify-between px-5 py-2 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer'>

            <div className='flex items-center gap-3'>
              <UserIcon />
              <div className='flex flex-col'>
                <p>{user.firstName}</p>
                <span>Rank {user.rank}</span>
              </div>
            </div>
            <span>Prize ${user.Points}</span> 
            <span>{user.Points}</span> 

          </div>))
        }
        </div>

      </div>

      <PointsHistoryDialog user={singleUser} open={isOpen} />
    </div>
  );
};

export default Home;
