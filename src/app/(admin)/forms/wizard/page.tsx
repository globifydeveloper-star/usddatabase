import React from 'react'
import AllWizard from './components/AllWizard'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Form Wizard' }

const WizardPage = () => {
  return (
    <>
      <AllWizard />
    </>
  )
}

export default WizardPage
