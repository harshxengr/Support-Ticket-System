import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "./auth";

export function useSession() {
  const queryClient = useQueryClient();
  
  const { data, isPending, error } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: () => authClient.getSession(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const session = data?.data?.session;
  
  return {
    data,
    isPending,
    error,
    user: session?.user,
  };
}
