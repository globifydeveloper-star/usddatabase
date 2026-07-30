'use client'
import { useLayoutContext } from '@/context/useLayoutContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const DarkMode = () => {
  const router = useRouter()
  const { changeTheme } = useLayoutContext()
  useEffect(() => {
    changeTheme('dark')
    router.push('/dashboard')
  }, [])
  return <></>
}

export default DarkMode
