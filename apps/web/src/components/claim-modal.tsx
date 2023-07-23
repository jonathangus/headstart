import { DownloadIcon } from '@radix-ui/react-icons';
import { AvatarIcon } from '@radix-ui/react-icons';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileContext } from '@/context/profile-context';
import { useSafeKitContext } from '@/context/safe-kit-auth-context';

import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export function ClaimModal() {
  const { user, isClaimed } = useProfileContext();
  const [step, setSteps] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login, isLoggingIn, safeAuthSignInResponse } = useSafeKitContext();

  const { isSuccess, mutate, isLoading } = useMutation({
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
    onError: (e: any) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.message,
      });
    },
  });

  if (isClaimed) {
    return <div>verified ✅</div>;
  }

  const authIt = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSteps(2);
    }, 1500);
  };

  let node = null;
  let open = isLoading || isLoggingIn ? true : undefined;

  if (isSuccess) {
    open = false;
  }

  if (step === 1) {
    node = (
      <>
        <DialogTitle>Claim your profile</DialogTitle>
        <DialogDescription>
          Proceed by authenticating your account to prove you are the owner of
          this content & profile.
        </DialogDescription>

        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              disabled
              id="name"
              value="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              disabled
              id="username"
              value="************"
              className="col-span-3"
            />
          </div>
        </div>

        {loading || isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </Button>
        ) : (
          <Button onClick={() => authIt()}>Authenticate</Button>
        )}
      </>
    );
  } else if (step === 2) {
    node = (
      <>
        <DialogTitle>Transfer ownership</DialogTitle>
        <DialogDescription>
          {safeAuthSignInResponse
            ? 'This token bound account token will be transfered to your wallet'
            : 'You are indeed the owner of this account! Use social login with SAFE kit to generate a wallet'}
        </DialogDescription>

        {safeAuthSignInResponse && (
          <div>
            <div>
              <div className="mb-4 text-xs text-gray-500">
                your new wallet address: <div>{safeAuthSignInResponse.eoa}</div>
              </div>
              <div className="w-full">
                <Button
                  onClick={() => {
                    mutate({
                      receiver: safeAuthSignInResponse?.eoa,
                      tokenId: user.tokenId,
                    });
                  }}
                  className="w-full"
                >
                  {isLoading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <DownloadIcon className="mr-2 h-4 w-4" /> Redeem token
                      bound account
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
        {!safeAuthSignInResponse && (
          <div>
            <Button
              onClick={() => {
                login();
              }}
            >
              {isLoggingIn ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Create wallet'
              )}
            </Button>
          </div>
        )}
      </>
    );
  }
  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button variant="outline">
          <AvatarIcon className="mr-2 h-4 w-4" />
          Claim handle
        </Button>
      </DialogTrigger>
      <DialogContent>{node}</DialogContent>
    </Dialog>
  );
}
