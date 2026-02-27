import React from 'react'
import AllHeatmapChart from './components/AllHeatmapChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Heatmap Charts' , other: { subTitle: 'Apex' }}

const HeatmapChart = () => {
  return (
    <>
      <AllHeatmapChart />
    </>
  )
}

export default HeatmapChart
