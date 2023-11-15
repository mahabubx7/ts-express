export enum Role {
  User = 'user', // normal or customers
  Vendor = 'vendor', // sellers or agent

  // Editor
  // Operator
  // Moderator

  // SuperVisor // works under managers

  Manager = 'manager', // works under admins

  // Auditor // works under admins & power > manager

  Admin = 'admin', // works under super-admins

  SuperAdmin = 'super_admin', // highest power holders

}

export const typeCheckForRole = (r: unknown) => {
  return Object.values(Role).map(_r => _r.toString()).includes(String(r));
};
