import { useEffect } from "react";
import { toast } from "sonner";

export function ApiErrorListener() {
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      toast.error(customEvent.detail ?? "Request failed");
    };

    window.addEventListener("api:error", handler);
    return () => window.removeEventListener("api:error", handler);
  }, []);

  return null;
}
