import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface WalletResponse {
  email: string;
  evm_wallet:string;
  xrp_wallet:string;
}

const useGenerate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  function getFirstAndLastFourChars(str: string): string {
    if (str.length <= 8) {
      return str; // If the string is too short, return it as is
    }
    const firstFour = str.slice(0, 4);
    const lastFour = str.slice(-4);
    return `${firstFour}...${lastFour}`;
  }  
  const walletAddress = useCallback(async (email: string): Promise<WalletResponse | null> => {
    console.log('Generating wallet for email:', email); // Debug log
    setIsLoading(true);
    setError(null);

    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to generate wallet');
      }

      const data = await response.json();
      toast.success('Wallet generated successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while generating the wallet';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { walletAddress, isLoading, error };
};

export default useGenerate;