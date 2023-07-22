import {
  useAccount,
  useBalance,
  useContractWrite,
  useTransaction,
  useWaitForTransaction,
} from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { Button } from "./ui/button";
import { encodeFunctionData } from "viem";
import { aaImplementationABI, erc20ABI } from "abi";
import { useToast } from "./ui/use-toast";

const usdcAddress = "0xF493Af87835D243058103006e829c72f3d34b891";

export function WithdrawFunds() {
  const tokenId = 1;
  const ownerOfToken = "0xAd88438F0DF2939e383648D7d2c783C47086A5e6";
  const tbaAddress = "0x99E832Fb6AB7f5F18a73d7cdcCca0d20aF2bEE79";
  const balance = useBalance({
    address: tbaAddress,
    watch: true,
    token: usdcAddress,
    chainId: polygonMumbai.id,
  });
  const { address: account } = useAccount();
  const amount = <div>{balance?.data?.formatted} USDC collected</div>;
  const { toast } = useToast();

  const {
    write: executeCall,
    isLoading,
    data,
  } = useContractWrite({
    abi: aaImplementationABI,
    address: tbaAddress,
    functionName: "executeCall",
    value: BigInt(0),
  });

  const { isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      toast({
        title: "Withdraw success! ",
        description: "USDC claimed for TBA to EOA.",
      });
    },
  });

  if (!account) {
    return amount;
  }

  if (ownerOfToken.toLowerCase() !== account.toLowerCase()) {
    return amount;
  }

  if (balance.data?.value === BigInt(0)) {
    return amount;
  }

  console.log("VALUE", balance.data?.value);

  const withdraw = () => {
    const data = encodeFunctionData({
      abi: erc20ABI,
      functionName: "transfer",
      args: [account, balance.data?.value || BigInt(0)],
    });

    executeCall({
      args: [usdcAddress, BigInt(0), data],
    });
  };

  return (
    <div>
      {amount}

      {/* Shouldn't be visible if the user has no funds */}
      <Button disabled={isLoading || txLoading} onClick={withdraw}>
        withdraw USDC
      </Button>
    </div>
  );
}
