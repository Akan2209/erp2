"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import api from "@/lib/api-client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const baseRequestSchema = z.object({
  equipmentType: z.string().min(1),
  quantity: z.coerce.number().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  notes: z.string().optional(),
});

export type InventoryRequestValues = z.infer<typeof baseRequestSchema>;

interface InventoryRequestFormProps {
  submitEndpoint: string;
}

export function InventoryRequestForm({
  submitEndpoint,
}: InventoryRequestFormProps) {
  const form = useForm<InventoryRequestValues>({
    resolver: zodResolver(baseRequestSchema),
    defaultValues: {
      equipmentType: "",
      quantity: 1,
      startDate: "",
      endDate: "",
      notes: "",
    },
  });

  const onSubmit = async (values: InventoryRequestValues) => {
    try {
      await api.post(submitEndpoint, values);
      toast.success("Inventory request submitted");
      form.reset();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to submit request", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          Equipment type
        </label>
        <Select {...form.register("equipmentType")}>
          <option value="">Select...</option>
          <option value="LAPTOP">Laptop</option>
          <option value="DEVICE">Lab device</option>
          <option value="COMPONENT">Components</option>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          Quantity
        </label>
        <Input type="number" min={1} {...form.register("quantity")} />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          Start date
        </label>
        <Calendar {...form.register("startDate")} />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          End date
        </label>
        <Calendar {...form.register("endDate")} />
      </div>
      <div className="md:col-span-2 space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          Notes
        </label>
        <Textarea
          rows={4}
          placeholder="Any additional context or constraints…"
          {...form.register("notes")}
        />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit request"}
        </Button>
      </div>
    </form>
  );
}

