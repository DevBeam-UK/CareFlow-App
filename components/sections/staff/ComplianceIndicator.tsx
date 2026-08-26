import type { ComplianceStatus } from "lib";
import { Badge, type BadgeProps } from "ui-components";

const STATUS_CONFIG: Record<ComplianceStatus, { label: string; variant: string; dot: string }> = {
  clear: { 
    label: "All clear", 
    variant: "pastel-success",
    dot: "bg-green-500" 
  },
  expiring: { 
    label: "Expiring soon", 
    variant: "pastel-warning",
    dot: "bg-amber-500" 
  },
  expired: { 
    label: "Expired", 
    variant: "pastel-danger",
    dot: "bg-red-500" 
  },
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
    <Badge 
      variant={cfg.variant as BadgeProps['variant']}
      shape={'pill'}
      badgeSize={'md'}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {showLabel ? cfg.label : null}
    </Badge>
  );
}