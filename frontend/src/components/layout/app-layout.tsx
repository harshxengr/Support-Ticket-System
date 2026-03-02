import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Ticket, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tickets", label: "Tickets", icon: Ticket },
  { to: "/tickets/create", label: "Create Ticket", icon: PlusCircle }
];

export function AppLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 border-r bg-card/95 p-5 backdrop-blur transition-transform lg:static lg:w-auto lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-8 flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/15 text-primary grid place-content-center font-bold">ST</div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
              <p className="font-semibold">Support Desk</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setOpen((prev) => !prev)}>
                  <Menu className="h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground">Support Ticket System</p>
              </div>
              <ThemeToggle />
            </div>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
