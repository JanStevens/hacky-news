import React from 'react'
import PostContainer from './PostContainer'
import useFireStories from '../hooks/useFireStories'
import Loading from './Loading'
import { StoryType } from '../types/api'

interface IPosts {
  postType: StoryType
}

const Posts = ({ postType = 'top' }: IPosts) => {
  const postIds = useFireStories({ type: postType })

  if (postIds.length === 0) {
    return <Loading />
  }

  return (
    <>
      {postIds.map((id, index) => (
        <PostContainer key={id} id={id} rank={index + 1} />
      ))}
    </>
  )
}

export default React.memo(Posts)
