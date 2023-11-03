export enum Role {
  User = 0, // normal or customers
  Vendor = 1, // sellers or agent

  // Editor = 1.3,
  // Operator = 1.3,
  // Moderator = 1.5,

  // SuperVisor = 2, // works under managers

  Manager = 3, // works under admins

  // Auditor = 3.5 // works under admins & power > manager

  Admin = 5, // works under super-admins

  SuperAdmin = 10, // highest power holders

}

export const typeCheckForRole = (r: unknown) => {
  return Object.keys(Role).includes(String(r));
};
