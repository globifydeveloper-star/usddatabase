import AllTabs from './components/AllTabs'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tabs' }

const Tabs = () => {
  return (
    <>
      <AllTabs />
    </>
  )
}

export default Tabs
