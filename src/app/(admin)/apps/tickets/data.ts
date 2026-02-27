import { StaticImageData } from 'next/image'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import avatar8 from '@/assets/images/users/avatar-8.jpg'
import avatar9 from '@/assets/images/users/avatar-9.jpg'
import avatar10 from '@/assets/images/users/avatar-10.jpg'

type StateType = {
  label: string
  count: number
  color: string
}

export const stateData: StateType[] = [
  {
    label: 'Total tickets',
    count: 25563,
    color: 'secondary',
  },
  {
    label: 'Pending tickets',
    count: 6952,
    color: 'success',
  },
  {
    label: 'Closed tickets',
    count: 18361,
    color: 'primary',
  },
  {
    label: 'Deleted tickets',
    count: 250,
    color: 'danger',
  },
]

export type TicketType = {
  id: string
  name: string
  avatar: StaticImageData
  Subject: string
  Assignee: {
    name: string
    avatar: StaticImageData
  }
  priority: 'Medium' | 'Low' | 'High'
  status: 'Pending' | 'Open' | 'In Progress' | 'Resolved'
  createdDate: string
  dueDate: string
}

export const ticketData: TicketType[] = [
  {
    id: '1',
    name: 'George Llanes',
    avatar: avatar2,
    Subject: 'Support for theme',
    Assignee: {
      name: 'Lauren Deo',
      avatar: avatar10,
    },
    priority: 'Low',
    status: 'Open',
    createdDate: '23 Dec, 2024',
    dueDate: '25 Dec, 2024',
  },
  {
    id: '2',
    name: 'Alex Morgan',
    avatar: avatar3,
    Subject: 'Bug in checkout',
    Assignee: {
      name: 'Maria Garcia',
      avatar: avatar9,
    },
    priority: 'Medium',
    status: 'Pending',
    createdDate: '23 Dec, 2024',
    dueDate: '26 Dec, 2024',
  },
  {
    id: '3',
    name: 'Chris Evans',
    avatar: avatar4,
    Subject: 'Feature request',
    Assignee: {
      name: 'Emily Stone',
      avatar: avatar8,
    },
    priority: 'High',
    status: 'Open',
    createdDate: '22 Dec, 2024',
    dueDate: '27 Dec, 2024',
  },
  {
    id: '4',
    name: 'Emma Watson',
    avatar: avatar5,
    Subject: 'Login issue',
    Assignee: {
      name: 'Oliver Twist',
      avatar: avatar7,
    },
    priority: 'Low',
    status: 'Pending',
    createdDate: '21 Dec, 2024',
    dueDate: '25 Dec, 2024',
  },
  {
    id: '5',
    name: 'Sophia Lee',
    avatar: avatar6,
    Subject: 'Payment gateway error',
    Assignee: {
      name: 'William Brown',
      avatar: avatar1,
    },
    priority: 'High',
    status: 'Resolved',
    createdDate: '20 Dec, 2024',
    dueDate: '23 Dec, 2024',
  },
  {
    id: '6',
    name: 'Isabella Taylor',
    avatar: avatar7,
    Subject: 'UI enhancement request',
    Assignee: {
      name: 'Liam Davis',
      avatar: avatar2,
    },
    priority: 'Medium',
    status: 'In Progress',
    createdDate: '19 Dec, 2024',
    dueDate: '24 Dec, 2024',
  },
  {
    id: '7',
    name: 'James Wilson',
    avatar: avatar8,
    Subject: 'Data sync failure',
    Assignee: {
      name: 'Ava Johnson',
      avatar: avatar3,
    },
    priority: 'High',
    status: 'Pending',
    createdDate: '18 Dec, 2024',
    dueDate: '23 Dec, 2024',
  },
  {
    id: '8',
    name: 'Mia Moore',
    avatar: avatar9,
    Subject: 'Account suspension inquiry',
    Assignee: {
      name: 'Noah White',
      avatar: avatar4,
    },
    priority: 'Low',
    status: 'Resolved',
    createdDate: '17 Dec, 2024',
    dueDate: '22 Dec, 2024',
  },
  {
    id: '9',
    name: 'Liam Smith',
    avatar: avatar10,
    Subject: 'Password reset issue',
    Assignee: {
      name: 'Emma Brown',
      avatar: avatar5,
    },
    priority: 'High',
    status: 'In Progress',
    createdDate: '20 Dec, 2024',
    dueDate: '25 Dec, 2024',
  },
  {
    id: '10',
    name: 'Sophia Clark',
    avatar: avatar9,
    Subject: 'Subscription plan query',
    Assignee: {
      name: 'Noah Wilson',
      avatar: avatar6,
    },
    priority: 'Low',
    status: 'Resolved',
    createdDate: '21 Dec, 2024',
    dueDate: '23 Dec, 2024',
  },
  {
    id: '11',
    name: 'Oliver Hall',
    avatar: avatar10,
    Subject: 'Performance optimization',
    Assignee: {
      name: 'Isabella Martinez',
      avatar: avatar7,
    },
    priority: 'Medium',
    status: 'Pending',
    createdDate: '19 Dec, 2024',
    dueDate: '24 Dec, 2024',
  },
  {
    id: '12',
    name: 'Ava Robinson',
    avatar: avatar5,
    Subject: 'UI feedback',
    Assignee: {
      name: 'James Rodriguez',
      avatar: avatar8,
    },
    priority: 'High',
    status: 'In Progress',
    createdDate: '18 Dec, 2024',
    dueDate: '22 Dec, 2024',
  },
]
