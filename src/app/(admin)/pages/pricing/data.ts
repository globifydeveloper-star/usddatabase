export type PricingType = {
  type: string
  description: string
  price: number
  features: string[]
  isPopular?: boolean
}

export const pricingData: PricingType[] = [
  {
    type: 'Solo Plan',
    description: 'Tailored for individual professionals and hobbyists.',
    price: 229,
    features: ['Single user license', 'Access to all components', 'Lifetime access', 'Unlimited projects', 'Customer support', 'Free updates'],
  },
  {
    type: 'Startup Plan',
    description: 'Best suited for experienced developers and small teams.',
    price: 399,
    isPopular: true,
    features: [
      '5 user license',
      'Access to all components',
      'Lifetime access',
      'Unlimited projects',
      'Priority tech support',
      'Customer support',
      'Free updates',
    ],
  },
  {
    type: 'Organization Plan',
    description: 'Ideal for large teams and organizations.',
    price: 799,
    features: ['25 user license', 'Access to all components', 'Lifetime access', 'Unlimited projects', 'Customer support', 'Free updates'],
  },
]
