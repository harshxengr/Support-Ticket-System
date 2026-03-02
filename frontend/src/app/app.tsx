import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Skeleton } from "@/components/ui/skeleton";

function AppFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6 md:px-6">
      <Skeleton className="h-10 w-52" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<AppFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
