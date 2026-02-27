import React from 'react'
import AllModal from './components/AllModal'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Modals', other: { subTitle: 'Base UI' } }

const Modals = () => {
  return (
    <>
      <AllModal />
    </>
  )
}

export default Modals
