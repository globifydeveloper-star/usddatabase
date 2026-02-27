import AllGoogleMap from './components/AllGoogleMap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Google Maps' , other: { subTitle: 'Maps' }}

const GoogleMaps = () => {
  return (
    <>
      <AllGoogleMap />
    </>
  )
}

export default GoogleMaps
