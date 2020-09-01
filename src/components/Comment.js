import React from 'react'
import useFireItem from '../hooks/useFireItem'
import {
  Card,
  Box,
  CardContent,
  Typography,
  Grid,
  Link,
  Chip,
} from '@material-ui/core'
import TimeAgo from 'timeago-react'
import { Skeleton } from '@material-ui/lab'
import { Schedule as ScheduleIcon } from '@material-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

const Comment = ({ id }) => {
  const comment = useFireItem(id)

  // Don't render deleted comments
  if (comment && comment.deleted) {
    return null
  }

  return (
    <Box mb={2}>
      <Card>
        {comment ? (
          <>
            <CardContent>
              <Box mb={3}>
                <Grid
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  container
                >
                  <Grid item>
                    <Link
                      component={RouterLink}
                      to={`/users/${comment.by}`}
                      variant="h5"
                      color="inherit"
                    >
                      {comment.by}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Chip
                      variant="outlined"
                      color="default"
                      label={<TimeAgo datetime={comment.time * 1000} />}
                      icon={<ScheduleIcon />}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                dangerouslySetInnerHTML={{ __html: comment.text }}
              ></Typography>
            </CardContent>
          </>
        ) : (
          <Skeleton />
        )}
      </Card>
    </Box>
  )
}

export default React.memo(Comment)
