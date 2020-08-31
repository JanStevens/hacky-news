import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import Post from './Post'
import useFireStories from '../hooks/useFireStories'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}))

const Posts = ({ postType = 'top' }) => {
  const classes = useStyles()
  const itemIds = useFireStories({ type: postType })

  if (itemIds.length === 0) {
    return <LinearProgress />
  }

  if (false) {
    return (
      <Alert severity="error" variant="filled" classes={classes}>
        ''
      </Alert>
    )
  }
  return itemIds.map((id, index) => <Post key={id} id={id} rank={index + 1} />)
}

export default Posts
