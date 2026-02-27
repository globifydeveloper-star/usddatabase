import React from 'react'
import AllSlider from './components/AllSlider'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Range Slider' }

const RangeSlider = () => {
  return (
    <>
      <AllSlider />
    </>
  )
}

export default RangeSlider
