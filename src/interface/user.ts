export interface IDataListUser {
  meta: IMeta;
  result: IUserInfo[];
}

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  gender: string;
  address: string;
  company: Company;
  role: { _id: string; name: string };
  isDeleted: boolean;
  deletedBy: ActionBy;
  deletedAt: any;

  createdBy: ActionBy;
  createdAt: string;

  updatedBy: ActionBy;
  updatedAt: string;

  __v: number;
  refreshToken: string;
}

export interface Company {
  _id: string;
  name: string;
}

export interface ActionBy {
  _id: string;
  email: string;
}

export interface IDeleteUser {}
