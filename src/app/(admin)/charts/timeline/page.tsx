import React from 'react'
import AllTimeLineChart from './components/AllTimeLineChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Timeline Chart' , other: { subTitle: 'Apex' }}

const TimelineChart = () => {
  return (
    <>
      <AllTimeLineChart />
    </>
  )
}

export default TimelineChart
