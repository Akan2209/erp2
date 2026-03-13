"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api-client";

interface ApprovalButtonsProps {
  id: string;
  approveEndpoint: string;
  rejectEndpoint: string;
  onSuccess?: () => void;
}

export function ApprovalButtons({
  id,
  approveEndpoint,
  rejectEndpoint,
  onSuccess,
}: ApprovalButtonsProps) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  const handle = async (action: "approve" | "reject") => {
    try {
      setLoading(action);
      const endpoint =
        action === "approve" ? approveEndpoint : rejectEndpoint;
      await api.post(endpoint, { id });
      toast.success(
        action === "approve" ? "Request approved" : "Request rejected",
      );
      onSuccess?.();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Action failed", {
        description: "Please try again or contact admin.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <Button
        size="icon"
        variant="secondary"
        className="h-7 w-7"
        disabled={loading === "approve"}
        onClick={() => handle("approve")}
        aria-label="Approve"
      >
        <Check className="h-3.5 w-3.5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 text-red-500 hover:text-red-600"
        disabled={loading === "reject"}
        onClick={() => handle("reject")}
        aria-label="Reject"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

