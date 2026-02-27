import { Metadata } from 'next'
import React from 'react'
import Tickets from './component/Tickets'

export const metadata: Metadata = { title: 'Tickets', other: { subTitle: 'Apps' } }

const TicketsPage = () => {
  return <Tickets />
}

export default TicketsPage
