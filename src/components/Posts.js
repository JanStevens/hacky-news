import React, { useEffect, useReducer } from 'react'
import { fetchMainPosts } from '../utils/api'
import {
  LinearProgress,
  Card,
  CardContent,
  Typography,
  CardActions,
  Badge,
  Tooltip,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { ScoreOutlined as ScoreIcon } from '@material-ui/icons'

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        loading: false,
        posts: action.posts,
      }
    case 'error':
      console.log(state, action)
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.error.message,
      }
    default:
      throw new Error(`Don't know how to handle this action ${action.type}`)
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),

    Card: {
      marginBottom: theme.spacing(1),
    },

    Alert: {
      marginTop: theme.spacing(3),
    },
  },
}))

const Posts = ({ postType = 'top' }) => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(postsReducer, {
    loading: true,
    posts: [],
    error: null,
  })

  useEffect(() => {
    fetchMainPosts(postType)
      .then((posts) => dispatch({ type: 'success', posts }))
      .catch((error) => dispatch({ type: 'error', error }))
  }, [postType])

  if (state.loading) {
    return <LinearProgress />
  }

  if (state.error) {
    return (
      <Alert severity="error" variant="filled" classes={classes}>
        {state.error}
      </Alert>
    )
  }

  return state.posts.map((post) => {
    return (
      <Card key={post.id} variant="outlined" classes={classes}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {post.title}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {post.score} points by {post.by}{' '}
            {new Date(post.time * 1000).toLocaleString()} |{' '}
            {post.kids?.length || 0} comments
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Score">
            <Badge badgeContent={post.score} max={9999} color="primary">
              <ScoreIcon />
            </Badge>
          </Tooltip>
        </CardActions>
      </Card>
    )
  })
}

export default Posts
