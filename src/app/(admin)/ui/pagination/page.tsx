import { Metadata } from 'next'
import AllPagination from './components/AllPagination'

export const metadata: Metadata = { title: 'Pagination', other: { subTitle: 'Base UI' } }

const Pagination = () => {
  return (
    <>
      <AllPagination />
    </>
  )
}

export default Pagination
