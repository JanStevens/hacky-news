export type StoryType = 'new' | 'top'

export type Item = {
  id: number
  deleted: boolean
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
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

export type User = {
  id: string
  delay: number
  created: number
  karma: number
  about: string
  submitted: Array<number>
}

export interface UserAndPosts extends User {
  posts: Array<Item>
}
