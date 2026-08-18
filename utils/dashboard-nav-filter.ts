import { NavItem } from "./data";

export const ROLE_NAV_ACCESS: Record<string, string[]> = {
  super_admin: [
    'dashboard',
    'visits',
    'patients',
    'schedule',
    // 'staff',
    // 'finance',
    // 'reports',
    // 'settings',
    // 'permissions',
    'users',
    'agencies',
  ],
  agency_admin: [
    'dashboard',
    'visits',
    'patients',
    'schedule',
    'staff',
    'finance',
    'reports',
    'settings',
    'permissions',
    'users',
  ],
  manager: [
    'dashboard',
    'visits',
    'patients',
    'schedule',
    'staff',
    'finance',
    'reports',
  ],
  coordinator: [
    'dashboard',
    'visits',
    'patients',
    'schedule',
    'staff',
  ],
  carer: [
    'dashboard',
    'visits',
    'patients',
    'schedule',
  ],
  patient: [
    'dashboard',
    'schedule',
    'visits',
  ],
};

export function canAccessModule(role: string, moduleId: string): boolean {
  const accessibleModules = ROLE_NAV_ACCESS[role] || [];
  return accessibleModules.includes(moduleId);
}

export function filterNavItemsByRole(items: NavItem[], role: string): NavItem[] {
  if (!role) return [];

  const accessibleModules = ROLE_NAV_ACCESS[role] || [];

  return items.filter((item) => {
    if (!accessibleModules.includes(item.requiredModule)) {
      return false;
    }
    return true;
  });
}