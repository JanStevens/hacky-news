import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Post from './Post'
import useFireStories from '../hooks/useFireStories'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(-2),
  },
}))

const Posts = ({ postType = 'top' }) => {
  const itemIds = useFireStories({ type: postType })
  const classes = useStyles()

  if (itemIds.length === 0) {
    return <LinearProgress classes={classes} />
  }

  if (false) {
    return (
      <Alert severity="error" variant="filled">
        ''
      </Alert>
    )
  }
  return itemIds.map((id, index) => <Post key={id} id={id} rank={index + 1} />)
}

export default React.memo(Posts)
