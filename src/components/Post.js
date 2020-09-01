import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  CardActionArea,
  Link,
  Box,
  CardActions,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import PostActions from './PostActions'

const useStyles = makeStyles((_theme) => ({
  content: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  actions: {
    paddingTop: 0,
  },
}))

const Post = ({ rank, post }) => {
  const classes = useStyles()

  // Don't attempt to render non stories they need different UI
  if (post && post.type && post.type !== 'story') {
    return null
  }

  return (
    <Box mb={1}>
      <Card>
        <CardActionArea>
          <Link
            href={post?.url}
            color="inherit"
            rel="noopener noreferrer"
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <CardHeader
              avatar={rank && <Avatar>{rank}</Avatar>}
              disableTypography
              title={
                <Typography variant="h6" component="h2">
                  {post ? post.title : <Skeleton />}
                </Typography>
              }
            />
          </Link>
        </CardActionArea>

        <CardContent className={classes.content}>
          <CardActions disableSpacing className={classes.actions}>
            {post ? (
              <PostActions {...post} />
            ) : (
              <Skeleton animation="wave" height="40px" width="100%" />
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  )
}

export default React.memo(Post)
