import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/database'

const client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 2000,
})

const _filterDead = (posts) =>
  posts.filter(Boolean).filter(({ dead }) => dead !== true)

const _filterDeleted = (posts) =>
  posts.filter(Boolean).filter(({ deleted }) => deleted !== true)

const _onlyPosts = (posts) =>
  posts.filter(Boolean).filter(({ type }) => type === 'story')

const _onlyComments = (posts) =>
  posts.filter(Boolean).filter(({ type }) => type === 'comment')

export const fetchItem = async (id) => {
  const { data } = await client.get(`/item/${id}.json`)
  return data
}

export const fetchMainPosts = async (type = 'top') => {
  try {
    const { data } = await client.get(`/${type}stories.json`)
    // TODO this calls for some interesting pagination possibilities
    const postIds = data.slice(0, 25)
    return postIds

    // const posts = await Promise.all(postIds.map(fetchItem))
    // return posts |> filterDead |> filterDeleted
  } catch (error) {
    console.warn(error)
    throw new Error(`There was an error fetching the ${type} posts.`)
  }
}

// Firebase API
var config = {
  authDomain: 'hacker-news.firebaseio.com',
  databaseURL: ' https://hacker-news.firebaseio.com',
}

firebase.initializeApp(config)
export const database = firebase.database()
