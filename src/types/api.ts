export enum StoryEnum {
  New = 'new',
  Top = 'top',
}

export enum ItemTypeEnum {
  Job = 'job',
  Story = 'story',
  Comment = 'comment',
  Poll = 'poll',
  Pollopt = 'pollopt',
}

export type ItemType = {
  id: number
  deleted: boolean
  type: ItemTypeEnum
  by: string
  time: number
  text: string
  dead: boolean
  parent: number
  poll?: number
  kids: Array<number>
  url: string
  score: number
  title: string
  descendants: number
}

export type UserType = {
  id: string
  delay: number
  created: number
  karma: number
  about: string
  submitted: Array<number>
}

export interface PostsType {
  posts: Array<ItemType>
}

export type UserAndPosts = UserType & PostsType
