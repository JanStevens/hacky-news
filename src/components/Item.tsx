import React from 'react'
import { useParams } from 'react-router-dom'
import useFireItem from '../hooks/useFireItem'
import Post from './Post'
import Comment from './Comment'
import { Box, Typography } from '@material-ui/core'

interface RouterParams {
  id?: string
}

// An item could be anything but we assume its a Post
const Item = () => {
  const { id } = useParams<RouterParams>()
  const post = useFireItem(Number(id))

  return (
    <>
      <Post post={post} expanded />

      <Box my={2}>
        <Typography component="h2" variant="h5">
          Comments
        </Typography>
      </Box>
      {post?.kids.map((id) => (
        <Comment key={id} id={id} />
      ))}
    </>
  )
}

export default React.memo(Item)
