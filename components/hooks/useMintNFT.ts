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

interface MintNFTProps {
  email: string;
  xrp_wallet: string;
  challengeId: number;
}

const useMintNFT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const NFT = useCallback(async (req: MintNFTProps): Promise<MintNFTRes | null> => {
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
          challengeId: req.challengeId
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to mint NFT');
      }

      const data = await response.json();
      toast.success('Mint NFT successfully');
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while minting NFT';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { NFT, isLoading, error };
};

export default useMintNFT;