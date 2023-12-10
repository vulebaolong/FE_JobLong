export interface IRole {
    _id: string
    name: string
    description: string
    isActive: boolean
    permissions: string[]
    isDeleted: boolean
    deletedAt: any
    __v: number
    createdAt: string
    updatedAt: string
    updatedBy: {
        _id: string
        email: string
      }
  }
  
  