import { useSession } from 'next-auth/react';
import Login from '@/components/Login';
import Account from '@/components/Account';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  const { data: session } = useSession() || {};
  console.log(session);
  if (session) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black p-4">
            <Account />
            <Footer />
        </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Login />
    </div>
  );
};

export default Home;