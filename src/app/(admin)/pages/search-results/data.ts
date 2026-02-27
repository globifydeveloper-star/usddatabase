import { StaticImageData } from 'next/image'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'

export type SearchType = {
  name: string
  email: string
  avatar: StaticImageData
  bio: string
}

export const searchUserData: SearchType[] = [
  {
    name: 'Halette Boivin',
    email: 'mediaheader@mail.com',
    avatar: avatar1,
    bio: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
  },
  {
    name: 'Durandana Jolicoeur',
    email: 'mediaheader@mail.com',
    avatar: avatar2,
    bio: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
  },
  {
    name: 'Lucas Sabourin',
    email: 'mediaheader@mail.com',
    avatar: avatar3,
    bio: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
  },
  {
    name: 'Donatien Brunelle',
    email: 'mediaheader@mail.com',
    avatar: avatar4,
    bio: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
  },
  {
    name: 'Karel Auberjo',
    email: 'mediaheader@mail.com',
    avatar: avatar5,
    bio: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
  },
]
