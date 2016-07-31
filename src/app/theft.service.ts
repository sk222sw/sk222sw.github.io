import { Injectable } from '@angular/core'
import { Theft, Position, Tag } from './interfaces'

@Injectable()
export class TheftService {

  constructor() { }

  getAll(limit = 10, offset = 0) {}
  getById(id: number) {}
  getByDescription(description: string) {}
  getNear(position: Position) {}
  create(theft: Theft) {}
  deleteById(id: number) {}
  updateById(id: number) {}
  getTagsByTheftId(id: number) {}
  getAllTags() {}
  getTagById(id: number) {}
  getTheftsByTag(tag: Tag) {}
  getCreators() {}
  getCreatorById(id: number) {}
  getAllPositions() {}
  getPositionById(id: number) {}
  getTheftPosition(theftId: number) {}

}
