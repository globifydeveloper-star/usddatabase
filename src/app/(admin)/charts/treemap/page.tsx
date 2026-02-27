import React from 'react'
import AllTreemap from './components/AllTreemap'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Treemap Charts' , other: { subTitle: 'Apex' }}

const page = () => {
  return (
    <>
      <AllTreemap />
    </>
  )
}

export default page
