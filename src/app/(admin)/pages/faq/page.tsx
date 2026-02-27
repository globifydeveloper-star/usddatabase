import { Metadata } from 'next'
import Faqs from './components/Faqs'

export const metadata: Metadata = { title: 'FAQ', other: { subTitle: 'Pages' } }

const FaqPage = () => {
  return (
    <>
      <Faqs />
    </>
  )
}

export default FaqPage
