import React from 'react'
import AllValidation from './components/AllValidation'

import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Form Validation' }

const ValidationPage = () => {
  return (
    <>
      <AllValidation />
    </>
  )
}

export default ValidationPage
