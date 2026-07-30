'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Detached = () => {
  const router = useRouter()
  const { changeLayoutMode } = useLayoutContext()
  useEffect(() => {
    changeLayoutMode('detached')
    router.push('/dashboard')
  }, [])
  return <></>
}

export default Detached
