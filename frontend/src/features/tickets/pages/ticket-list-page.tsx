import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/features/tickets/components/empty-state";
import { TicketsTable } from "@/features/tickets/components/tickets-table";
import { useDebounce } from "@/features/tickets/hooks/use-debounce";
import { useTicketsQuery } from "@/features/tickets/hooks/use-tickets";
import { categoryOptions, enumLabel, priorityOptions, statusOptions } from "@/features/tickets/lib/constants";

export default function TicketListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const filters = useMemo(
    () => ({
      q: debouncedSearch || undefined,
      status: status === "all" ? undefined : status,
      priority: priority === "all" ? undefined : priority,
      category: category === "all" ? undefined : category,
      page,
      limit: 10
    }),
    [category, debouncedSearch, page, priority, status]
  );

  const { data, isLoading } = useTicketsQuery(filters);

  return (
    <PageContainer>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tickets</h1>
          <p className="text-sm text-muted-foreground">Search, filter, and manage all support requests.</p>
        </div>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="relative md:col-span-2 xl:col-span-1">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search tickets..." value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                {statusOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {enumLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priority</SelectItem>
                {priorityOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {enumLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All category</SelectItem>
                {categoryOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {enumLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl">
          <CardContent className="p-0">
            {!isLoading && data?.data.length === 0 ? <EmptyState /> : <TicketsTable tickets={data?.data ?? []} />}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Page {data?.meta.page ?? 1} of {data?.meta.totalPages ?? 1}</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1}>
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((current) => current + 1)}
              disabled={!data || page >= data.meta.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
