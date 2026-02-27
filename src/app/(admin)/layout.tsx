'use client'
import HorizontalLayout from '@/components/layouts/HorizontalLayout'
import VerticalLayout from '@/components/layouts/VerticalLayout'
import { useLayoutContext } from '@/context/useLayoutContext'
import { ChildrenType } from '@/types/component-props'

const AdminLayout = ({ children }: ChildrenType) => {
  const { layoutOrientation } = useLayoutContext()

  return <>{layoutOrientation === 'vertical' ? <VerticalLayout children={children} /> : <HorizontalLayout children={children} />}</>
}

export default AdminLayout
