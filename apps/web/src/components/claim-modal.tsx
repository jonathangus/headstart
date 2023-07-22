import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";

import { DownloadIcon } from "@radix-ui/react-icons";
import { AvatarIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const tokenId = 1;
export function ClaimModal() {
  const [step, setSteps] = useState(1);
  const [loading, setLoading] = useState(false);
  const { address: account } = useAccount();
  const claimed = false;
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: (args: any) => {
      return axios.post("/api/claim", args);
    },
    onSuccess: () => {
      toast({
        title: "Claim successful!",
        description:
          "Now you have a erc-6651 token and a 4337-account connected to it.",
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
      <Dialog>
        <DialogTitle>Claim your profile</DialogTitle>
        <DialogDescription>
          Proceed by authenticating your account to prove you are the owner of
          this content & profile.
        </DialogDescription>
        {((loading || isLoading) && (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </Button>
        )) || <Button onClick={authIt}>Authenticate</Button>}
      </Dialog>
    );
  } else if (step === 2) {
    node = (
      <Dialog>
        <DialogTitle>Transfer ownership</DialogTitle>
        <DialogDescription>
          Connect your wallet to receive your EIP-6551 tokenbound account.
        </DialogDescription>
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
          <DownloadIcon className="mr-2 h-4 w-4" />
          Redeem account
        </Button>
      </Dialog>
    );
  }

  return (
    <Dialog
      onOpenChange={() => {
        setSteps(1);
      }}
    >
      <DialogTrigger>
        <Button variant="outline">
          {" "}
          <AvatarIcon className="mr-2 h-4 w-4" />
          Claim handle
        </Button>
      </DialogTrigger>
      <DialogContent>
        {node}
        {(loading || isLoading) && (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
