import { Badge } from "@/components/ui/badge";

export type RequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "allocated"
  | string;

export function StatusBadge({ status }: { status: RequestStatus }) {
  const normalized = status.toLowerCase();

  if (normalized === "pending") {
    return <Badge variant="pending">Pending</Badge>;
  }
  if (normalized === "approved") {
    return <Badge variant="approved">Approved</Badge>;
  }
  if (normalized === "rejected") {
    return <Badge variant="rejected">Rejected</Badge>;
  }
  if (normalized === "allocated") {
    return <Badge variant="allocated">Allocated</Badge>;
  }

  return <Badge className="capitalize">{status}</Badge>;
}

