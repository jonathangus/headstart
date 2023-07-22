import { useSafeKitContext } from '@/context/safe-kit-auth-context';
import { Button } from './ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { ReloadIcon } from '@radix-ui/react-icons';

type Props = {
  onNextStep: () => void;
};

export function GenerateWallet({ onNextStep }: Props) {
  const { login, isLoggingIn, safeAuthSignInResponse } = useSafeKitContext();

  if (safeAuthSignInResponse) {
    return (
      <div>
        <div className="mb-4">
          your new wallet address:{safeAuthSignInResponse.eoa}
        </div>
        <div>
          <Button className="w-full">finish</Button>
        </div>
      </div>
    );
  }

  return (
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
  );
}
