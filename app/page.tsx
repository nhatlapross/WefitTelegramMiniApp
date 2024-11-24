'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from "@/components/Loading";


const MainPage = () => {
  const router = useRouter();

  useEffect(() => {
    // You could add a small delay here if you want to show the loading message for a moment
    const timer = setTimeout(() => {
      router.push('/home');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <div><Loading /></div>;
};

export default MainPage;