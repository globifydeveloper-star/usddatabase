import React from 'react'
import AllRating from './components/AllRating'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ratings' , other: { subTitle: 'Extended UI' }}

const Ratings = () => {
  return (
    <>
      <AllRating />
    </>
  )
}

export default Ratings
