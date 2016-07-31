import { Tag, Position } from './'

export interface Theft {
  id: number
  description: string
  time: Date
  tags: Tag[]
  position: Position
}
