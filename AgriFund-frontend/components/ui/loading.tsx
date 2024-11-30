'use client';

import React from 'react';
import Loader from './loader/loader';
import { useRouter } from 'next/navigation';

const LoadingPage = (value: string, actionButton: boolean, butonText: string = '') => {
    const router = useRouter()

    const handleClick = async () => {    
        return router.push(`/signin`)
    }

    return (
        <div className='gap-5 w-full h-[100vh] grid grid-cols-1'>
            <div className='flex-wrap m-auto my-auto content-center bg-primary w-1/2 p-10 rounded-xl'>
                <div className='flex flex-col gap-5 items-center justify-center '>
                    <p className='font-bold text-center text-white text-3xl text-background'>{value}</p>

                    {actionButton ?
                        <button onClick={handleClick} type="submit" className="flex flex-row justify-center gap-3 w-1/2 bg-primary rounded-lg p-3 text-white font-bold text-xl">
                            <p className="text-white text-center">Login</p>
                        </button> :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
};

export default LoadingPage;
