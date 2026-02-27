import React from 'react'
import AllMixedChart from './components/AllMixedChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Mixed Charts' , other: { subTitle: 'Apex' }}

const MixedChart = () => {
  return (
    <>
      <AllMixedChart />
    </>
  )
}

export default MixedChart
