import { useSafeKitContext } from '@/context/safe-kit-auth-context';

import { Button } from './ui/button';

export function SafekitLogin() {
  const { login, safeAuthSignInResponse } = useSafeKitContext();

  if (safeAuthSignInResponse) {
    return <div> your account {safeAuthSignInResponse.eoa}</div>;
  }

  return <Button onClick={() => login()}>sign in</Button>;
}
