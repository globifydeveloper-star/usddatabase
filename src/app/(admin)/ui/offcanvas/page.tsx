import { Metadata } from 'next'
import AllOffcanvas from './components/AllOffcanvas'

export const metadata: Metadata = { title: 'OffCanvas', other: { subTitle: 'Base UI' } }

const Offcanvas = () => {
  return (
    <>
      <AllOffcanvas />
    </>
  )
}

export default Offcanvas
