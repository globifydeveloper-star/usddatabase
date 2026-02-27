import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import { StaticImageData } from 'next/image'

export type StateType = {
  title: string
  value: string
  type: string
  change: number
  icon: string
  bgColor: string
  textColor: string
  description: string
  isTrue?: boolean
}

type TransactionType = {
  transactionId: string
  date: string
  amount: number
  status: string
  statusColor: string
}

type UserType = {
  name: string
  avatar: StaticImageData
  role: string
  status: string
  status_color: string
}

export const stateData: StateType[] = [
  {
    title: 'Total Orders',
    value: '687.3k',
    type: 'number',
    change: 9.19,
    icon: 'solar:bill-list-bold-duotone',
    bgColor: 'primary-subtle',
    textColor: 'primary',
    description: 'Since last month',
    isTrue: true,
  },
  {
    title: 'Total Revenue',
    value: '$5.42M',
    type: 'currency',
    change: 4.67,
    icon: 'solar:wad-of-money-bold-duotone',
    bgColor: 'success-subtle',
    textColor: 'success',
    description: 'Since last month',
  },
  {
    title: 'New Users',
    value: '45.3k',
    type: 'number',
    change: 2.85,
    icon: 'solar:user-plus-bold-duotone',
    bgColor: 'warning-subtle',
    textColor: 'warning',
    description: 'Since last month',
  },
  {
    title: 'Customer Satisfaction',
    value: '94.6%',
    type: 'percentage',
    change: 1.32,
    icon: 'solar:sticker-smile-circle-bold-duotone',
    bgColor: 'info-subtle',
    textColor: 'info',
    description: 'Since last month',
  },
]

export const transactionsData: TransactionType[] = [
  {
    transactionId: 'TXN001',
    date: '2024-12-18',
    amount: 500.0,
    status: 'Completed',
    statusColor: 'text-success',
  },
  {
    transactionId: 'TXN002',
    date: '2024-12-17',
    amount: 1200.0,
    status: 'Failed',
    statusColor: 'text-danger',
  },
  {
    transactionId: 'TXN003',
    date: '2024-12-16',
    amount: 300.0,
    status: 'Pending',
    statusColor: 'text-warning',
  },
  {
    transactionId: 'TXN004',
    date: '2024-12-15',
    amount: 2500.0,
    status: 'Completed',
    statusColor: 'text-success',
  },
  {
    transactionId: 'TXN005',
    date: '2024-12-14',
    amount: 750.0,
    status: 'Pending',
    statusColor: 'text-warning',
  },
]

export const userData: UserType[] = [
  {
    name: 'John Doe',
    avatar: avatar1,
    role: 'Administrator',
    status: 'Active',
    status_color: 'text-success',
  },
  {
    name: 'Jane Smith',
    avatar: avatar2,
    role: 'Editor',
    status: 'Pending',
    status_color: 'text-warning',
  },
  {
    name: 'Michael Brown',
    avatar: avatar3,
    role: 'Viewer',
    status: 'Inactive',
    status_color: 'text-danger',
  },
  {
    name: 'Emily Davis',
    avatar: avatar4,
    role: 'Manager',
    status: 'Active',
    status_color: 'text-success',
  },
  {
    name: 'Robert Taylor',
    avatar: avatar5,
    role: 'Support',
    status: 'Pending',
    status_color: 'text-warning',
  },
]
