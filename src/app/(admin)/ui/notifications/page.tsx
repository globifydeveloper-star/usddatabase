import React from 'react'
import AllNotifications from './components/AllNotifications'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Notifications', other: { subTitle: 'Base UI' } }

const Notifications = () => {
  return (
    <>
      <AllNotifications />
    </>
  )
}

export default Notifications
