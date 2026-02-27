import React from 'react'
import AllPieChart from './components/AllPieChart'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Pie Charts' , other: { subTitle: 'Apex' }}

const PieChart = () => {
  return (
    <>
      <AllPieChart />
    </>
  )
}

export default PieChart
