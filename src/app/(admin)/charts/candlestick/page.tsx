import React from 'react'
import AllCandlestick from './components/AllCandlestick'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Candlestick Charts', other: { subTitle: 'Apex' } }

const Candlestick = () => {
  return (
    <>
      <AllCandlestick />
    </>
  )
}

export default Candlestick
