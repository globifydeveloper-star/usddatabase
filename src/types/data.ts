import { StaticImageData } from 'next/image'

export type IdType = string

export type EmailLabelType = 'Primary' | 'Social' | 'Promotions' | 'Updates' | 'Forums'

export type EmailType = {
  id: IdType
  isStar?: boolean
  image: StaticImageData
  name: string
  subTitle: string
  description: string
  IsAttachment?: number
  date: Date
  variant?: string
}

export type SocialUserType = {
  id: IdType
  name: string
  email: string
  image: StaticImageData
  phone: string
  role?: string
  BirthDate: string
}

export type FilesType = {
  id: IdType
  icon: string
  title: string
  fileVariant: string
  file: string
  date: Date
  userId: SocialUserType['id']
  user?: SocialUserType
  size: number
  members: {
    text: string
    variant: string
  }[]
}

export type InvoicesType = {
  id: IdType
  userId: SocialUserType['id']
  users?: SocialUserType
  productId: ProductType['id']
  products?: ProductType
  amount: string
  date: Date
  invoicesStatus: 'Paid' | 'Cancelled' | 'Pending'
}

export type ProductType = {
  id: IdType
  name: string
  description: string
  date: Date
  price: number
  quantity: number
  brand: string[]
  averagePriceMin: number
  averagePriceMax: number
  sellingItems: string[]
  discountsAvailable: string
  category: string
  status: 'Active' | 'Inactive'
  productName: string
  discountPrice: number
  size: string
  rating: {
    star: number
    review: number
  }
  isDeal?: boolean
  isSeal?: boolean
}

export type Employee = {
  id: IdType
  name: string
  email: string
  position: string
  company: string
  country: string
  office: string
  age: number
  startDate: string
  salary: string
}

export type KanbanSectionType = {
  id: IdType
  title: string
  description?: string
}

export type KanbanTaskType = {
  id: IdType
  sectionId: KanbanSectionType['id']
  section?: KanbanSectionType
  title: string
  description?: string
  image?: StaticImageData
  variant: string
  priority: 'High' | 'Medium' | 'Low'
  views: number
  share: number
  commentsCount: number
  progress?: number
  members: StaticImageData[]
}

export type KanbanDialogType = {
  showNewTaskModal: boolean
  showSectionModal: boolean
}
