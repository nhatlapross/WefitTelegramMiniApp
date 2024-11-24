"use client";
import Image from 'next/image';
import myGif from '@/asset/480.gif'

export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Image src={myGif} alt="my gif" height={100} width={100} />
      </div>
      <div>Loading...</div>
    </div>
  );
}