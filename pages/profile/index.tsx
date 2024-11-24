import React, { useEffect, useState } from 'react';
import Profile from '@/components/Profile';
import Footer from '@/components/Footer';


const ProfilePage: React.FC = () => {
    return (
        <div className='bg-white'>
            <Profile />
            <Footer />
        </div>
    );

};

export default ProfilePage;