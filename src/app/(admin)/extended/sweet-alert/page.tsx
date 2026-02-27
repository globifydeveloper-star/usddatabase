import AllAlert from './components/AllAlert'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sweet Alert 2', other: { subTitle: 'Extended UI' } }

const SweetAlert = () => {
  return (
    <>
      <AllAlert />
    </>
  )
}

export default SweetAlert
