import React from 'react'
import AllRadialBarChart from './components/AllRadialBarChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex RadialBar Charts' , other: { subTitle: 'Apex' }}

const RadialBar = () => {
  return (
    <>
      <AllRadialBarChart />
    </>
  )
}

export default RadialBar
