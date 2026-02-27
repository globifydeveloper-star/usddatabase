import React from 'react'
import AllScatterChart from './components/AllScatterChart'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Scatter Charts' , other: { subTitle: 'Apex' }}

const ScatterChart = () => {
  return (
    <>
      <AllScatterChart />
    </>
  )
}

export default ScatterChart
