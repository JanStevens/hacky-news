import React from 'react'
import { Alert } from '@material-ui/lab'
import PostContainer from './PostContainer'
import useFireStories from '../hooks/useFireStories'
import Loading from './Loading'

const Posts = ({ postType = 'top' }) => {
  const postIds = useFireStories({ type: postType })

  if (postIds.length === 0) {
    return <Loading />
  }

  if (false) {
    return (
      <Alert severity="error" variant="filled">
        ''
      </Alert>
    )
  }
  return postIds.map((id, index) => (
    <PostContainer key={id} id={id} rank={index + 1} />
  ))
}

export default React.memo(Posts)
