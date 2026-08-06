import { EmployeeStatus } from "@/types/components";

 export const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-cf-error-muted text-cf-error";
      case "manager":
        return "bg-cf-info-muted text-cf-info";
      case "carer":
        return "bg-cf-success-muted text-cf-success";
      default:
        return "bg-cf-surface-muted text-cf-ink-60";
    }
  };

  export const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-cf-success-muted text-cf-success"
      : "bg-cf-surface-muted text-cf-ink-60";
  };

  
  export const formatUKPhone = (phone: string) => {
  
    const cleaned = phone.replace(/\D/g, "");
  
    if (cleaned.startsWith("07") && cleaned.length === 11) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    
  
    if (cleaned.startsWith("0") && cleaned.length === 11) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
    }
    if (cleaned.length > 6) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
  
    return phone;
  };

  export const employeeStatusConfig: Record<EmployeeStatus, {
  variant: "pastel-success" | "pastel-danger" | "pastel-warning" | "pastel-info";
  label: string;
}> = {
  ACTIVE: {
    variant: "pastel-success",
    label: "Active",
  },
  SUSPENDED: {
    variant: "pastel-danger",
    label: "Suspended",
  },
  ON_LEAVE: {
    variant: "pastel-warning",
    label: "On Leave",
  },
  TERMINATED: {
    variant: "pastel-info",
    label: "Terminated",
  },
};

export function getEmployeeStatusConfig(status: EmployeeStatus) {
  return employeeStatusConfig[status] || {
    variant: "pastel-info",
    label: status || "Unknown",
  };
}

export function getEmployeeStatusVariant(status: EmployeeStatus) {
  return getEmployeeStatusConfig(status).variant;
}

export function getEmployeeStatusLabel(status: EmployeeStatus) {
  return getEmployeeStatusConfig(status).label;
}