export interface ICompany {
  _id: string;
  name: string;
  address: string;
  description: string;
  logo: string;
  createdBy: CreatedBy;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreatedBy {
  _id: string;
  email: string;
}

export interface dataCreateCompany {
  name: string;
  address: string;
  description: string;
  logo: string;
}
