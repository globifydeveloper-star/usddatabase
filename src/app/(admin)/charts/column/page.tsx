import AllColumnChart from './Components/AllColumnChart'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Apex Column Charts' , other: { subTitle: 'Apex' }}

const ColumnChart = () => {
  return (
    <>
      <AllColumnChart />
    </>
  )
}

export default ColumnChart
