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
import { Link as RouterLink } from 'react-router-dom'
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

const PostLink = ({ id, url, children }) => {
  const defaultProps = { color: 'inherit', style: { textDecoration: 'none' } }
  const props = url
    ? {
        ...defaultProps,
        href: url,
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {
        ...defaultProps,
        component: RouterLink,
        to: `/items/${id}`,
      }

  return <Link {...props}>{children}</Link>
}

const Post = ({ rank, post, expanded }) => {
  const classes = useStyles()

  // Don't attempt to render non stories they need different UI
  if (post && post.type && post.type !== 'story') {
    return null
  }

  return (
    <Box mb={1}>
      <Card>
        <CardActionArea>
          <PostLink id={post?.id} url={post?.url}>
            <CardHeader
              avatar={rank && <Avatar>{rank}</Avatar>}
              disableTypography
              title={
                <Typography variant="h6" component="h2">
                  {post?.title ? post.title : <Skeleton />}
                </Typography>
              }
            />
          </PostLink>
        </CardActionArea>

        <CardContent className={classes.content}>
          {expanded && (
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              dangerouslySetInnerHTML={{ __html: post?.text }}
            ></Typography>
          )}

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
