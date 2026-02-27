import AllAreaChart from './components/AllAreaChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Area Chart', other: { subTitle: 'Apex' } }

const Area = () => {
  return (
    <>
      <AllAreaChart />
    </>
  )
}

export default Area
