import { ComplianceStatus } from "@/lib/mock/staff-compliance-mock";

const STATUS_CONFIG: Record<ComplianceStatus, { label: string; dot: string; text: string; bg: string }> = {
  clear: { label: "All clear", dot: "bg-green-500", text: "text-green-700", bg: "bg-green-50 border-green-200" },
  expiring: { label: "Expiring soon", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  expired: { label: "Expired", dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50 border-red-200" },
};

export function ComplianceIndicator({
  status,
  showLabel = true,
}: {
  status: ComplianceStatus;
  showLabel?: boolean;
}) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {showLabel ? cfg.label : null}
    </span>
  );
}