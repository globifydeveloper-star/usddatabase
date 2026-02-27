import React from 'react'
import AllBoxplotChart from './components/AllBoxplotChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Boxplot Charts' , other: { subTitle: 'Apex' }}

const BoxplotChart = () => {
  return (
    <>
      <AllBoxplotChart />
    </>
  )
}

export default BoxplotChart
