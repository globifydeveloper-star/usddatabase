import { Control } from 'react-hook-form'
import { KanbanSectionType, KanbanTaskType } from './data'
import { BaseSyntheticEvent } from 'react'
import { DropResult } from '@hello-pangea/dnd'

export type ThemeType = 'light' | 'dark'
export type TopBarThemeType = 'light' | 'dark' | 'brand'
export type MenuThemeType = 'light' | 'dark' | 'brand'
export type LayoutModeType = 'fluid' | 'detached'
export type LayoutOrientationType = 'vertical' | 'horizontal'

export type OffcanvasControlType = {
  open: boolean
  toggle: () => void
}

export type MenuType = {
  theme: MenuThemeType
  size: 'default' | 'compact' | 'condensed' | 'sm-hover' | 'sm-hover-active' | 'full' | 'fullscreen'
}

export type LayoutState = {
  theme: ThemeType
  topbarTheme: TopBarThemeType
  menu: MenuType
  layoutMode: LayoutModeType
  layoutOrientation: LayoutOrientationType
}

export type LayoutOffcanvasStatesType = {
  showThemeCustomizer: boolean
  showHorizontalMenu: boolean
  showBackdrop: boolean
}

export type LayoutType = LayoutState & {
  themeMode: ThemeType
  changeLayoutOrientation: (orientation: LayoutOrientationType) => void
  changeLayoutMode: (mode: LayoutModeType) => void
  changeTheme: (theme: ThemeType) => void
  changeTopbarTheme: (theme: TopBarThemeType) => void
  changeMenu: {
    theme: (theme: MenuType['theme']) => void
    size: (size: MenuType['size']) => void
  }
  themeCustomizer: OffcanvasControlType
  horizontalMenu: OffcanvasControlType
  toggleBackdrop: () => void
  resetSettings: () => void
}

export type ChatOffcanvasStatesType = {
  showChatList: boolean
  showUserSetting: boolean
  showUserProfile: boolean
}

export type EmailOffcanvasStatesType = {
  showNavigationMenu: boolean
  showEmailDetails: boolean
  showComposeEmail: boolean
}

// export type ChatContextType = {
//   activeChat?: UserType
//   changeActiveChat: (userId: UserType['id']) => Promise<void>
//   chatList: OffcanvasControlType
//   chatProfile: OffcanvasControlType
//   chatSetting: OffcanvasControlType
// }

// export type EmailContextType = {
//   activeLabel: EmailLabelType
//   changeActiveLabel: (label: EmailLabelType) => void
//   activeMail: EmailType['id']
//   changeActiveMail: (newMail: EmailType['id']) => void
//   navigationBar: OffcanvasControlType
//   emailDetails: OffcanvasControlType
//   composeEmail: OffcanvasControlType
// }

export type FormControlSubmitType = {
  control: Control<any>
  newRecord: (values: BaseSyntheticEvent) => void
  editRecord: (values: BaseSyntheticEvent) => void
  deleteRecord: (id: string) => void
}

export type KanbanType = {
  sections: KanbanSectionType[]
  activeSectionId: KanbanSectionType['id'] | undefined
  newTaskModal: {
    open: boolean
    toggle: (sectionId?: KanbanSectionType['id'], taskId?: KanbanTaskType['id']) => void
  }
  sectionModal: {
    open: boolean
    toggle: () => void
  }
  taskFormData: KanbanTaskType | undefined
  sectionFormData: KanbanSectionType | undefined
  taskForm: FormControlSubmitType
  sectionForm: FormControlSubmitType
  getAllTasksPerSection: (sectionId: KanbanSectionType['id']) => KanbanTaskType[]
  onDragEnd: (result: DropResult) => void
}
