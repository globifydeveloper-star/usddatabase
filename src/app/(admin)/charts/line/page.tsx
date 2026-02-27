import React from 'react'
import AllLineChart from './components/AllLineChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Line Charts' , other: { subTitle: 'Apex' }}

const LineChart = () => {
  return (
    <>
      <AllLineChart />
    </>
  )
}

export default LineChart
