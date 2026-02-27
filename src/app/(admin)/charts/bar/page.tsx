import AllBarChart from './components/AllBarChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Bar Charts' , other: { subTitle: 'Apex' }}

const BarChart = () => {
  return (
    <>
      <AllBarChart />
    </>
  )
}

export default BarChart
