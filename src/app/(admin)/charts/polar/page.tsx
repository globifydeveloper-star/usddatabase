import React from 'react'
import AllPolarChart from './components/AllPolarChart'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Polar Area Charts' , other: { subTitle: 'Apex' }}

const PolarChart = () => {
  return (
    <>
      <AllPolarChart />
    </>
  )
}

export default PolarChart
