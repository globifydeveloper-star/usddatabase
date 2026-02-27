import React from 'react'
import AllBubbleChart from './components/AllBubbleChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Bubble Charts' , other: { subTitle: 'Apex' }}

const BubbleChart = () => {
  return (
    <>
      <AllBubbleChart />
    </>
  )
}

export default BubbleChart
