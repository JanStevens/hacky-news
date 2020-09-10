import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  CardActionArea,
  Link,
  LinkProps,
  Box,
  CardActions,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { Link as RouterLink } from 'react-router-dom'
import PostActions from './PostActions'
import { ItemType, ItemTypeEnum } from '../types/api'

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

interface IPostLink {
  id?: number
  url?: string
  children: React.ReactChild
}

const PostLink = ({ id, url, children }: IPostLink) => {
  const defaultProps = { style: { textDecoration: 'none' } }
  const props = url
    ? {
        ...defaultProps,
        color: 'inherit',
        href: url,
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {
        ...defaultProps,
        color: 'inherit',
        component: RouterLink,
        to: `/items/${id}`,
      }

  return <Link {...(props as LinkProps)}>{children}</Link>
}

interface IPost {
  post: ItemType | null
  rank?: number
  expanded?: boolean
}

const Post = ({ rank, post, expanded = false }: IPost) => {
  const classes = useStyles()

  // Don't attempt to render non stories they need different UI
  if (post && post.type && post.type !== ItemTypeEnum.Story) {
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
          {post && expanded && (
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              dangerouslySetInnerHTML={{ __html: post.text }}
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
