import { ReactNode, useEffect } from "react";
import { useSession } from "@/lib/auth-react";
import { authClient } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data, isPending } = useSession();

  useEffect(() => {
    authClient.getSession();
  }, []);

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
