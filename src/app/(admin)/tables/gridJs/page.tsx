import { getAllDataTableRecords } from '@/helpers/data'
import { Metadata } from 'next'
import AllDataTable from './components/AllDataTable'

export const metadata: Metadata = { title: 'Grid Js Tables' , other: { subTitle: 'Tables' }}

const GridJs = async () => {
  const dataTableRecords = await getAllDataTableRecords()
  return (
    <>
      <AllDataTable dataTableRecords={dataTableRecords} />
    </>
  )
}

export default GridJs
