import React from 'react'
import SparkChart from './components/SparkChart'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Sparklines Charts' , other: { subTitle: 'Apex' }}

const SparkLinesChart = () => {
  return (
    <>
      <SparkChart />
    </>
  )
}

export default SparkLinesChart
