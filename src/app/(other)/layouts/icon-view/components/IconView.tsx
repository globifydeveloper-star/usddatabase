'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const IconView = () => {
  const router = useRouter()
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('condensed')
    router.push('/dashboard')
  }, [])
  return <></>
}

export default IconView
