import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  
  Avatar,
  CardHeader,
  CardActionArea,

  Link,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import useFireItem from '../hooks/useFireItem'
import PostActions from './PostActions'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      paddingBottom: 0,
      marginBottom: theme.spacing(1),
    },
    header: {},
    content: {
      paddingTop: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    actions: {
      paddingTop: 0,
    },
  }),
  { index: 1 }
)

const Post = ({ id, rank }) => {
  const classes = useStyles()
  const post = useFireItem(id)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          href={post?.url}
          color="inherit"
          rel="noopener noreferrer"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <CardHeader
            className={classes.header}
            avatar={<Avatar>{rank}</Avatar>}
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
        {post ? (
          <PostActions {...post} />
        ) : (
          <Skeleton animation="wave" height="40px" />
        )}
      </CardContent>
    </Card>
  )
}

export default Post
