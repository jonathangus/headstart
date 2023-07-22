import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './ui/use-toast';

const tokenId = 8;

export function ClaimModal() {
  const [step, setSteps] = useState(1);
  const [loading, setLoading] = useState(false);
  const { address: account } = useAccount();
  const claimed = false;
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: (args: any) => {
      return axios.post('/api/claim', args);
    },
    onSuccess: () => {
      toast({
        title: 'Claim successful!',
        description:
          'Now you have a erc-6651 token and a 4337-account connected to it.',
      });
    },
  });

  if (claimed) {
    return null;
  }

  const authIt = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSteps(2);
    }, 1500);
  };

  let node = null;
  if (step === 1) {
    node = (
      <div>
        Claim your profile Connect your Dribbble account and create a Lens
        profile using your existing content in seconds. Create account
        <Button onClick={authIt}>auth</Button>
      </div>
    );
  } else if (step === 2) {
    node = (
      <div>
        <DialogTitle>Claim NFT to this address</DialogTitle>
        <DialogDescription>
          <div className="w-full mb-4">
            {account ? account : <ConnectButton />}
          </div>

          <Button
            onClick={() => {
              mutate({
                receiver: account,
                tokenId,
              });
            }}
            disabled={!account}
          >
            Claim
          </Button>
        </DialogDescription>
      </div>
    );
  }

  return (
    <Dialog
      onOpenChange={() => {
        setSteps(1);
      }}
    >
      <DialogTrigger>
        <Button>claim handle</Button>
      </DialogTrigger>
      <DialogContent>
        {node}
        {(loading || isLoading) && 'loading...'}
      </DialogContent>
    </Dialog>
  );
}
