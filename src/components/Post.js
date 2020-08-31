import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Badge,
  Tooltip,
  IconButton,
  Chip,
  Grid,
  Avatar,
  CardHeader,
  CardActionArea,
  Link,
} from '@material-ui/core'
import {
  TrendingUp as TrendingUpIcon,
  Message as MessageIcon,
  AccountCircle as AccountIcon,
  Schedule as ScheduleIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import useFireItem from '../hooks/useFireItem'
import TimeAgo from 'timeago-react'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
  },
  header: {
    // paddingBottom: 0,
  },
  content: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}))

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
          <CardActions disableSpacing>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="baseline"
              spacing={2}
            >
              <Grid item xs>
                <Tooltip title="Score">
                  <Badge
                    badgeContent={post.score}
                    max={9999}
                    color="primary"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <TrendingUpIcon />
                  </Badge>
                </Tooltip>
              </Grid>
              <Grid item xs>
                <Tooltip title="Comments">
                  <IconButton>
                    <Badge
                      badgeContent={post.kids?.length}
                      max={9999}
                      color="primary"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                      <MessageIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={post.by}
                  icon={<AccountIcon />}
                />
              </Grid>
              <Grid item xs>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={<TimeAgo datetime={post.time * 1000} />}
                  icon={<ScheduleIcon />}
                />
              </Grid>
            </Grid>
          </CardActions>
        ) : (
          <Skeleton animation="wave" height="40px" />
        )}
      </CardContent>
    </Card>
  )
}

export default Post
