import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/database'

const client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 2000,
})

const filterDead = (posts) =>
  posts.filter(Boolean).filter(({ dead }) => dead !== true)

const filterDeleted = (posts) =>
  posts.filter(Boolean).filter(({ deleted }) => deleted !== true)

const onlyPosts = (posts) =>
  posts.filter(Boolean).filter(({ type }) => type === 'story')

export const fetchItem = async (id) => {
  const { data } = await client.get(`/item/${id}.json`)
  return data
}

export const fetchUser = async (userName) => {
  try {
    const { data } = await client.get(`/user/${userName}.json`)
    const postIds = data.submitted.slice(0, 30)
    const posts = await Promise.all(postIds.map(fetchItem))
    const fitleredPosts = filterDeleted(filterDead(onlyPosts(posts)))
    return { ...data, posts: fitleredPosts }
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
