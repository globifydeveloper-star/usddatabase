import React from 'react'
import File from './components/File'
import FIleManager from './components/FIleManager'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'File Manager', other: { subTitle: 'Apps' } }

const FileManagerPage = () => {
  return (
    <>
      <FIleManager />
    </>
  )
}

export default FileManagerPage
