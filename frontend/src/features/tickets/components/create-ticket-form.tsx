import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryBadge, PriorityBadge } from "@/features/tickets/components/badges";
import { useClassifyTicketMutation, useCreateTicketMutation } from "@/features/tickets/hooks/use-tickets";
import type { ClassificationResult } from "@/types/ticket";

const schema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  description: z.string().min(8, "Description should be at least 8 characters")
});

type FormValues = z.infer<typeof schema>;

export function CreateTicketForm() {
  const [preview, setPreview] = useState<ClassificationResult | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const classifyMutation = useClassifyTicketMutation();
  const createMutation = useCreateTicketMutation();

  const onAnalyze = async () => {
    const values = getValues();
    const validation = schema.safeParse(values);
    if (!validation.success) return;

    const result = await classifyMutation.mutateAsync(values);
    setPreview(result);
  };

  const onSubmit = async (values: FormValues) => {
    await createMutation.mutateAsync(values);
    setPreview(null);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="glass-card rounded-2xl">
        <CardHeader>
          <CardTitle>Create a new support ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Unable to access billing portal" {...register("title")} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea rows={6} placeholder="Add details so your team can quickly resolve it" {...register("description")} />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={onAnalyze} disabled={classifyMutation.isPending}>
                <Sparkles className="h-4 w-4" />
                {classifyMutation.isPending ? "Analyzing with AI..." : "Analyze with AI"}
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Saving..." : "Create Ticket"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="glass-card rounded-2xl">
        <CardHeader>
          <CardTitle>AI Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!preview ? (
            <p className="text-sm text-muted-foreground">Run AI analysis to preview category and priority before submission.</p>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Category</p>
                <CategoryBadge category={preview.category} />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Priority</p>
                <PriorityBadge priority={preview.priority} />
              </div>
              <p className="text-xs text-muted-foreground">Source: {preview.source === "gemini" ? "Gemini AI" : "Fallback"}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
