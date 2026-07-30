'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const FullScreenView = () => {
  const router = useRouter()
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('fullscreen')
    router.push('/dashboard')
  }, [])
  return <></>
}

export default FullScreenView
