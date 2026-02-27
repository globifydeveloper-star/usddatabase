import { Metadata } from 'next'
import AllDragula from './components/AllDragula'

export const metadata: Metadata = { title: 'Dragula' , other: { subTitle: 'Extended UI' }}

const Dragula = () => {
  return (
    <>
      <AllDragula />
    </>
  )
}

export default Dragula
