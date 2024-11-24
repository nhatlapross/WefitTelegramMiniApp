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

interface CreateChallengeProps {
  challengeId: number,
  amount: number,
  date: Date,
  owner: string,
  challenge_type: number,
  pool_prize: number,
  price: number,
  expected_return: number,
  expire_date: number,
  distance_goal: number,
  participants_limit: number
}

const useCreateChallenge = () => {
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
  const Challange = useCallback(async (req: CreateChallengeProps): Promise<MintNFTRes | null> => {
    console.log('Create challenge for ', req.owner); // Debug log
    setIsLoading(true);
    setError(null);

    try {
      if (!req.owner) {
        throw new Error('Owner is required');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/challenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Correct way to stringify the request body
        body: JSON.stringify({
          challengeId: req.challengeId,
          amount: req.amount,
          date: req.date,
          owner: req.owner,
          challenge_type: req.challenge_type,
          pool_prize: req.pool_prize,
          price: req.price,
          expected_return: req.expected_return,
          expire_date: req.expire_date,
          distance_goal: req.distance_goal,
          participants_limit: req.participants_limit
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create Challenge');
      }

      const data = await response.json();
      console.log(response);
      console.log(data);
      toast.success('Create challenge successfully!');
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

export default useCreateChallenge;