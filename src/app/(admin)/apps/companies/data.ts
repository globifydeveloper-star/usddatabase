import { StaticImageData } from 'next/image'
import amazonImg from '@/assets/images/companies/amazon.png'
import appleImg from '@/assets/images/companies/apple.png'
import googleImg from '@/assets/images/companies/google.png'
import airbnbImg from '@/assets/images/companies/airbnb.png'
import facebookImg from '@/assets/images/companies/facebook.png'
import ciscoImg from '@/assets/images/companies/cisco.png'
import microsoftImg from '@/assets/images/companies/microsoft.png'
import teslaImg from '@/assets/images/companies/tesla.png'

export type CompaniesType = {
  name: string
  logo: StaticImageData
  location: string
  revenue: string
  employees: string
}

export const companiesData: CompaniesType[] = [
  {
    name: 'Amazon Inc.',
    logo: amazonImg,
    location: 'Seattle, Washington',
    revenue: '17,786 Cr',
    employees: '566K',
  },
  {
    name: 'Apple Inc.',
    logo: appleImg,
    location: 'Cupertino, California',
    revenue: '22,923.4 Cr',
    employees: '47K',
  },
  {
    name: 'Google LLC',
    logo: googleImg,
    location: 'Menlo Park, California',
    revenue: '110 BN',
    employees: '72K',
  },
  {
    name: 'Airbnb Inc.',
    logo: airbnbImg,
    location: 'San Francisco, California',
    revenue: '260 Cr',
    employees: '3.1K',
  },
  {
    name: 'Facebook Inc.',
    logo: facebookImg,
    location: 'Menlo Park, California',
    revenue: '9.16 BN',
    employees: '25.1K',
  },
  {
    name: 'Cisco Systems',
    logo: ciscoImg,
    location: 'San Jose, California',
    revenue: '4,800.5 Cr',
    employees: '73.4K',
  },
  {
    name: 'Microsoft',
    logo: microsoftImg,
    location: 'Redmond, Washington',
    revenue: '168 BN',
    employees: '221K',
  },
  {
    name: 'Tesla Inc.',
    logo: teslaImg,
    location: 'Palo Alto, California',
    revenue: '53.9 BN',
    employees: '127K',
  },
]
