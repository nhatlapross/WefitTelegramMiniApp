import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface MintNFTRes {
  code: number,
  data: {
      blockHash: string,
      blockNumber: number,
      contractAddress: string,
      cumulativeGasUsed: number,
      from: string,
      gasUsed: string,
      logsBloom: string,
      status: boolean,
      to: string,
      transactionHash: string,
      transactionIndex: number,
      type: string,
      events: {}
  }
}

interface WithDrawChallengeProps {
  sender: string,
  amount: number,
  challengeId: string
}

const useWithDrawChallenge = () => {
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
  const Challange = useCallback(async (req: WithDrawChallengeProps): Promise<MintNFTRes | null> => {
    console.log('Withdraw challenge for ', req.sender); // Debug log
    setIsLoading(true);
    setError(null);

    try {
      if (!req.sender) {
        throw new Error('Owner is required');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/challenge/withdrawChallenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Correct way to stringify the request body
        body: JSON.stringify({
          challengeId: req.challengeId,
          amount: req.amount,
          sender: req.sender
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to withdraw Challenge');
      }

      const data = await response.json();
      console.log(response);
      console.log(data);
      toast.success('Withdraw challenge successfully!');
      toast.success('Transaction hash:\n'+getFirstAndLastFourChars(data.data.transactionHash));
      localStorage.setItem('tx_hash',data.data.transactionHash)
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while create Challenge';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { Challange, isLoading, error };
};

export default useWithDrawChallenge;