import AllEditors from './components/AllEditors'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Editors' }

const EditorsPage = () => {
  return (
    <>
      <AllEditors />
    </>
  )
}

export default EditorsPage
