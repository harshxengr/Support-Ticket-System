import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/components/providers/auth-provider";

const DashboardPage = lazy(() => import("@/features/tickets/pages/dashboard-page"));
const TicketListPage = lazy(() => import("@/features/tickets/pages/ticket-list-page"));
const CreateTicketPage = lazy(() => import("@/features/tickets/pages/create-ticket-page"));
const TicketDetailPage = lazy(() => import("@/features/tickets/pages/ticket-detail-page"));
const NotFoundPage = lazy(() => import("@/features/tickets/pages/not-found-page"));
const LoginPage = lazy(() => import("@/features/auth/pages/login-page"));
const RegisterPage = lazy(() => import("@/features/auth/pages/register-page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "tickets", element: <TicketListPage /> },
      { path: "tickets/create", element: <CreateTicketPage /> },
      { path: "tickets/:id", element: <TicketDetailPage /> }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
]);
