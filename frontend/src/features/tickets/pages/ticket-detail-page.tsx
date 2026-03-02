import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Clock3 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryBadge, PriorityBadge, StatusBadge } from "@/features/tickets/components/badges";
import { useTicketDetailQuery, useUpdateTicketStatusMutation } from "@/features/tickets/hooks/use-tickets";
import { enumLabel, statusOptions } from "@/features/tickets/lib/constants";
import { formatDate } from "@/lib/utils";

export default function TicketDetailPage() {
  const { id = "" } = useParams();
  const { data, isLoading } = useTicketDetailQuery(id);
  const statusMutation = useUpdateTicketStatusMutation();

  const timeline = useMemo(
    () =>
      data
        ? [
            { label: "Ticket created", time: formatDate(data.createdAt) },
            { label: "Last updated", time: formatDate(data.updatedAt) }
          ]
        : [],
    [data]
  );

  if (isLoading || !data) {
    return (
      <PageContainer>
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-60 w-full" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{data.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ticket ID: {data.id}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="glass-card rounded-2xl">
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{data.description}</p>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={data.status} />
                <PriorityBadge priority={data.priority} />
                <CategoryBadge category={data.category} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Update Status</p>
                <Select
                  value={data.status}
                  onValueChange={(value) => statusMutation.mutate({ id: data.id, status: value as typeof data.status })}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {enumLabel(item)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card rounded-2xl">
              <CardHeader>
                <CardTitle>AI Classification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Category</p>
                <CategoryBadge category={data.category} />
                <p className="pt-3 text-sm text-muted-foreground">Priority</p>
                <PriorityBadge priority={data.priority} />
                <p className="pt-3 text-xs text-muted-foreground">Source: {data.aiSource ?? "gemini"}</p>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-2xl">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-border/70 p-3">
                    <Clock3 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
