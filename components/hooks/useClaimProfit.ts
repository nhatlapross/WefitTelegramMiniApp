import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface MintNFTRes {
  code: number;
  data?: {
    tx: string;
    nfts?: {
      Flags: number;
      Issuer: string;
      NFTokenID: string;
      NFTokenTaxon: number;
      URI: string;
      nft_serial: number;
    }
  }
}

interface ClaimProfitProps {
  xrp_wallet: string;
  email: string;
  amount: number;
}

const useClaimProfit = () => {
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
  const Profit = useCallback(async (req: ClaimProfitProps): Promise<MintNFTRes | null> => {
    console.log('Minting NFT for email:', req.email); // Debug log
    setIsLoading(true);
    setError(null);

    try {
      if (!req.email) {
        throw new Error('Email is required');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/nft/mint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Correct way to stringify the request body
        body: JSON.stringify({
          xrp_wallet: req.xrp_wallet,
          email: req.email,
          amount: req.amount
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to claim profit');
      }

      const data = await response.json();
      toast.success('Claim profit successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while claim profit';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { Profit, isLoading, error };
};

export default useClaimProfit;