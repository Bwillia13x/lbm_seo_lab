import { supabaseAdmin } from './db';

// Role definitions
export type UserRole = 'owner' | 'staff' | 'customer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  active: boolean;
  created_at: string;
}

// Permission definitions
export const PERMISSIONS = {
  // Owner-only permissions
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_USERS: 'manage_users',
  VIEW_FINANCIALS: 'view_financials',
  MANAGE_BLACKOUT_DAYS: 'manage_blackout_days',

  // Staff permissions
  MANAGE_ORDERS: 'manage_orders',
  VIEW_ORDERS: 'view_orders',
  MANAGE_INVENTORY: 'manage_inventory',
  VIEW_ANALYTICS: 'view_analytics',

  // Customer permissions
  PLACE_ORDERS: 'place_orders',
  VIEW_OWN_ORDERS: 'view_own_orders',
  JOIN_WAITLIST: 'join_waitlist'
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  owner: [
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_FINANCIALS,
    PERMISSIONS.MANAGE_BLACKOUT_DAYS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.JOIN_WAITLIST
  ],
  staff: [
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.JOIN_WAITLIST
  ],
  customer: [
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.JOIN_WAITLIST
  ]
};

// Permission checking functions
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
}

export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

// User management functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('email', email)
      .eq('active', true)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      active: data.active,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function createUser(email: string, role: UserRole = 'customer'): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_roles')
      .insert({
        email,
        role,
        active: true
      })
      .select()
      .single();

    if (error) return null;

    // Log audit event
    await supabaseAdmin.from('audit_log').insert({
      actor: 'system',
      action: 'create_user',
      entity: 'user_roles',
      entity_id: data.id,
      meta: { email, role }
    });

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      active: data.active,
      created_at: data.created_at
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

export async function updateUserRole(userId: string, newRole: UserRole, updatedBy: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('user_roles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) return false;

    // Log audit event
    await supabaseAdmin.from('audit_log').insert({
      actor: updatedBy,
      action: 'update_user_role',
      entity: 'user_roles',
      entity_id: userId,
      meta: { new_role: newRole }
    });

    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    return false;
  }
}

// Session management (simplified for now - in production, use proper JWT)
export async function getCurrentUserRole(email?: string): Promise<UserRole> {
  if (!email) return 'customer';

  const user = await getUserByEmail(email);
  return user?.role || 'customer';
}

// Middleware helper for API routes
export async function requirePermission(
  userRole: UserRole,
  requiredPermission: Permission,
  errorMessage: string = 'Insufficient permissions'
): Promise<void> {
  if (!hasPermission(userRole, requiredPermission)) {
    throw new Error(errorMessage);
  }
}

export async function requireAnyPermission(
  userRole: UserRole,
  permissions: Permission[],
  errorMessage: string = 'Insufficient permissions'
): Promise<void> {
  if (!hasAnyPermission(userRole, permissions)) {
    throw new Error(errorMessage);
  }
}
