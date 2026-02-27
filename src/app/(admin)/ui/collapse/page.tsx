import React from 'react'
import AllCollapse from './components/AllCollapse'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Collapse', other: { subTitle: 'Base UI' } }

const CollapsePage = () => {
  return (
    <>
      <AllCollapse />
    </>
  )
}

export default CollapsePage
