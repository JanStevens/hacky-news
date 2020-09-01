import React from 'react'
import useFireItem from '../hooks/useFireItem'
import Post from './Post'

// Wrapper that will fetch the post using FireItem
// Decouples our rendering of a post from fetching it
const PostContainer = ({ id, rank }) => {
  const post = useFireItem(id)
  return <Post post={post} rank={rank} />
}

export default React.memo(PostContainer)
