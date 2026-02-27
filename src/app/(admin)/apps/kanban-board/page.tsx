import { KanbanProvider } from '@/context/useKanbanContext'
import Board from './components/Board'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kanban Board', other: { subTitle: 'Apps' } }

const KanbanPage = () => {
  return (
    <>
      <KanbanProvider>
        <Board />
      </KanbanProvider>
    </>
  )
}

export default KanbanPage
