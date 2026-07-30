'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HoverMenu = () => {
  const router = useRouter()
  const { changeMenu } = useLayoutContext()
  useEffect(() => {
    changeMenu.size('sm-hover')
    router.push('/dashboard')
  }, [])
  return <></>
}

export default HoverMenu
