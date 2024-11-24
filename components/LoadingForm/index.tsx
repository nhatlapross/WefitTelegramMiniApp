"use client";
import Image from 'next/image';
import myGif from '@/asset/gif/LoadingAnimation.gif'

export default function LoadingForm() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                    <Image src={myGif} alt="my gif" height={100} width={100} />
                    <div className='text-primary text-xl'>Loading...</div>
                </div>
            </div>
        </div>
    );
}