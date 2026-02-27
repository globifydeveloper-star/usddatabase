import React from 'react'
import AllVectorMaps from './components/AllVectorMaps'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Vector Maps', other: { subTitle: 'Maps' } }

const VectorMaps = () => {
  return (
    <>
      <AllVectorMaps />
    </>
  )
}

export default VectorMaps
