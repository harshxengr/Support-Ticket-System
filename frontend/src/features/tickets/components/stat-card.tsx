import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  gradient
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
}) {
  return (
    <Card className={cn("overflow-hidden border-0 shadow-sm", gradient)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
          </div>
          <div className="grid h-11 w-11 place-content-center rounded-xl bg-background/80 text-primary shadow-sm">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
