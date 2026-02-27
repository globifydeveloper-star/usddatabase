import AllSelect from './components/AllSelect'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Form Select' }

import 'choices.js/src/styles/choices'

const SelectForm = () => {
  return (
    <>
      <AllSelect />
    </>
  )
}

export default SelectForm
