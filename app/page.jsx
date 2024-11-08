import React from 'react';

const Home = () => {
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
          <div className='flex flex-col items-center'>
            <p>Sachin</p>
            <p>89</p>
            <p className='text-orange-500'>Prize: $89</p>
          </div>

          <div className='flex flex-col items-center'>
            <p>Sachin</p>
            <p>89</p>
            <p className='text-orange-500'>Prize: $89</p>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <p>Irshad</p>
            <p>100</p>
            <p className='text-orange-500'>Prize: $109</p>
          </div>
        </div>
        
        <div>

        </div>        

      </div>
    </div>
  );
};

export default Home;
