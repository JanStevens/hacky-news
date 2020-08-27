import axios from 'axios'

const client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
  timeout: 2000,
})

const filterDead = (posts) =>
  posts.filter(Boolean).filter(({ dead }) => dead !== true)

const filterDeleted = (posts) =>
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

    const posts = await Promise.all(postIds.map(fetchItem))
    return posts |> filterDead |> filterDeleted
  } catch (error) {
    console.warn(error)
    throw new Error(`There was an error fetching the ${type} posts.`)
  }
}
