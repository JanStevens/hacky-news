import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/database'

import { User, Item, UserAndPosts } from '../types/api'

const client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 2000,
})

interface ServerResponse<T> {
  data: T
}

const filterDead = (posts: Array<Item>): Array<Item> =>
  posts.filter(Boolean).filter(({ dead }) => dead !== true)

const filterDeleted = (posts: Array<Item>): Array<Item> =>
  posts.filter(Boolean).filter(({ deleted }) => deleted !== true)

const onlyPosts = (posts: Array<Item>): Array<Item> =>
  posts.filter(Boolean).filter(({ type }) => type === 'story')

export const fetchItem = async (id: number): Promise<Item> => {
  const { data } = await client.get<string, ServerResponse<Item>>(
    `/item/${id}.json`
  )
  return data
}

export const fetchUser = async (userName: string): Promise<UserAndPosts> => {
  try {
    const { data } = await client.get<string, ServerResponse<User>>(
      `/user/${userName}.json`
    )
    const postIds = data.submitted.slice(0, 30)
    const posts = await Promise.all<Item>(postIds.map(fetchItem))
    const filteredPosts = filterDeleted(filterDead(onlyPosts(posts)))
    return { ...data, posts: filteredPosts }
  } catch (error) {
    console.warn(error)
    throw new Error(`There was an error fetching the user ${userName}`)
  }
}

// Firebase API
var config = {
  authDomain: 'hacker-news.firebaseio.com',
  databaseURL: ' https://hacker-news.firebaseio.com',
}

firebase.initializeApp(config)

export const database = firebase.database()
