export type WindowId = 'welcome' | 'about' | 'projects' | 'skills' | 'resume' | 'contact' | 'recycle'

export type WindowState = {
  id: WindowId
  title: string
  icon: string
  open: boolean
  minimized: boolean
  maximized: boolean
  z: number
  x: number
  y: number
  width: number
  height: number
}
