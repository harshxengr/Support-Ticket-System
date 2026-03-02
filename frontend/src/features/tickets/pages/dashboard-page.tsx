import { Activity, AlertTriangle, CheckCircle2, CircleDashed } from "lucide-react";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardQuery } from "@/features/tickets/hooks/use-tickets";
import { StatCard } from "@/features/tickets/components/stat-card";
import { TicketCard } from "@/features/tickets/components/ticket-card";

export default function DashboardPage() {
  const { data, isLoading } = useDashboardQuery();

  if (isLoading || !data) {
    return (
      <PageContainer>
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-28" />
          ))}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of all active support tickets.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Open" value={data.cards.open} icon={CircleDashed} gradient="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/40" />
          <StatCard label="In Progress" value={data.cards.inProgress} icon={Activity} gradient="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/40" />
          <StatCard label="Resolved" value={data.cards.resolved} icon={CheckCircle2} gradient="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/40" />
          <StatCard label="Critical" value={data.cards.critical} icon={AlertTriangle} gradient="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/40" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card className="glass-card rounded-2xl">
            <CardHeader>
              <CardTitle>Ticket trend (last 14 days)</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
                    stroke="hsl(var(--foreground))"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </PageContainer>
  );
}
