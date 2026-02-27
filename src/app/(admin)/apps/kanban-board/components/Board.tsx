'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { useKanbanContext } from '@/context/useKanbanContext'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import TaskItem from './TaskItem'

const Board = () => {
  const { onDragEnd, sections, getAllTasksPerSection } = useKanbanContext()

  return (
    <Row className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="kanban-board-item col-lg-4"
                data-plugin="dragula"
                data-containers='["upcoming", "in-progress", "in-review", "completed"]'>
                <Card>
                  <CardBody>
                    <Dropdown align={'end'} className="float-end">
                      <DropdownToggle as={'a'} className="drop-arrow-none" data-bs-toggle="dropdown" aria-expanded="false">
                        <IconifyIcon width={16} height={16} icon="ri:more-2-fill" className="m-0 text-muted h3" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                        <DropdownItem>Add Members</DropdownItem>
                        <DropdownItem>Add Due Date</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <h4 className="header-title mb-0">{section.title}</h4>
                    <p className="sub-header m-0">{section.description}</p>
                  </CardBody>
                  <SimplebarReactClient data-simplebar style={{ maxHeight: 670 }}>
                    <div className="tasklist px-3" id={section.id}>
                      {getAllTasksPerSection(section.id).map((task, idx) => (
                        <Draggable key={task.id} draggableId={task.id} index={idx}>
                          {(provided) => (
                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <TaskItem task={task} />
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </SimplebarReactClient>
                  <CardBody>
                    <button className="btn btn-primary w-100">
                      <IconifyIcon icon="ri:add-line" /> Add New
                    </button>
                  </CardBody>
                </Card>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Row>
  )
}

export default Board
