import React from 'react'
import AllRadarChart from './components/AllRadarChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Radar Charts' , other: { subTitle: 'Apex' }}

const RadarChart = () => {
  return (
    <>
      <AllRadarChart />
    </>
  )
}

export default RadarChart
