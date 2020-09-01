import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUser } from '../utils/api'

import Loading from './Loading'
import {
  Card,
  CardContent,
  Grid,
  Chip,
  Typography,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import {
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  PostAdd as PostAddIcon,
} from '@material-ui/icons'
import TimeAgo from 'timeago-react'
import Post from './Post'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  content: {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}))

const userReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        loading: false,
        error: null,
        user: action.user,
      }

    case 'failure':
      return {
        ...state,
        loading: false,
        error: action.error.message,
        user: null,
      }

    default:
      throw new Error(`Don't know how to handle ${action.type}`)
  }
}

const initialState = {
  loading: true,
  error: null,
  user: null,
}

const User = () => {
  const { id } = useParams()
  const classes = useStyles()
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    fetchUser(id)
      .then((user) => dispatch({ type: 'success', user }))
      .catch((error) => dispatch({ type: 'failure', error }))
  }, [id])

  const { user, loading, error } = state

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Alert severity="error" variant="filled">
        {error}
      </Alert>
    )
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography component="h1" variant="h4">
                {user.id}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                color="default"
                label={`${user.karma} karma`}
                icon={<TrendingUpIcon />}
              />
            </Grid>

            <Grid item>
              <Chip
                variant="outlined"
                color="default"
                label={`${user.submitted.length} posts`}
                icon={<PostAddIcon />}
              />
            </Grid>

            <Grid item>
              <Chip
                variant="outlined"
                color="default"
                label={<TimeAgo datetime={user.created * 1000} />}
                icon={<ScheduleIcon />}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mb={2}>
        <Typography component="h2" variant="h5">
          Last 30 Posts
        </Typography>
      </Box>
      {user.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default React.memo(User)
