export class PermissionPolicy {
  private permissions: { [key: string]: string[] };
  private readonly resource: string;
  private _currentGrant: string;

  constructor(resource: string) {
    this.permissions = {};
    this.resource = resource ?? "";
    this._currentGrant = "";
  }

  grant(this: PermissionPolicy, role: string) {
    const ob: { [key: string]: string[] } = {};
    ob[role] = [];
    if (!Object.keys(this.permissions).includes(role)) {
      this.permissions = {
        ...this.permissions,
        ...ob,
      };
    }

    this._currentGrant = role;
    return this;
  }

  extend(this: PermissionPolicy, role: string) {
    const permissions = this.permissions[role];
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...permissions,
        ...currentPermissions,
      ]
    };
    return this;
  }

  static checkOwner<T = string>(x: T, y: T) {
    return x === y;
  }

  static checkPermission(role: string,  action: string, permissions: { [key: string]: string[] }) {
    if (permissions[role] && permissions[role].includes(action)) {
      return true;
    }

    return false;
  }


  create(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'create'
      ]
    };
    return this;
  }

  createOwn(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'create:own'
      ]
    };
    return this;
  }

  createAny(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'create:any'
      ]
    };
    return this;
  }

  read(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'read'
      ]
    };
    return this;
  }

  readOwn(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'read:own'
      ]
    };
    return this;
  }

  readAny(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'read:any'
      ]
    };
    return this;
  }

  update(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'update'
      ]
    };
    return this;
  }

  updateOwn(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'update:own'
      ]
    };
    return this;
  }

  updateAny(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'update:any'
      ]
    };
    return this;
  }

  delete(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'delete'
      ]
    };
    return this;
  }

  deleteOwn(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'delete:own'
      ]
    };
    return this;
  }

  deleteAny(this: PermissionPolicy) {
    const currentPermissions = this.permissions[this._currentGrant];
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions,
        'delete:any'
      ]
    };
    return this;
  }

  custom(this: PermissionPolicy, action: string) {
    const currentPermissions = this.permissions[this._currentGrant];
    currentPermissions.push(action)
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [...currentPermissions]
    };
    return this;
  }

  deny(this: PermissionPolicy, action: string) {
    let currentPermissions = this.permissions[this._currentGrant];
    currentPermissions = currentPermissions.filter((p) => p !== action);
    this.permissions = {
      ...this.permissions,
      [this._currentGrant]: [
        ...currentPermissions
      ]
    };
    return this;
  }

  getPolicy() {
    const ob = {
      resource: this.resource,
      permissions: this.permissions,
      checkPermission: PermissionPolicy.checkPermission,
      checkOwner: PermissionPolicy.checkOwner,
    };
    return Object.freeze(ob);
  }
}

export type AuthPolicy = ReturnType<PermissionPolicy['getPolicy']>;
