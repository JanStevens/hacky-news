import React from 'react'
import {
  CardActions,
  Badge,
  Tooltip,
  IconButton,
  Chip,
  Grid,
  Hidden,
} from '@material-ui/core'
import TimeAgo from 'timeago-react'

import {
  TrendingUp as TrendingUpIcon,
  Message as MessageIcon,
  AccountCircle as AccountIcon,
  Schedule as ScheduleIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((_theme) => ({
  root: {
    paddingTop: 0,
  },
}))

const PostActions = ({ score, descendants, by, time }) => {
  const classes = useStyles()

  return (
    <CardActions disableSpacing className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs>
          <Tooltip title="Score">
            <Badge
              badgeContent={score}
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
                badgeContent={descendants}
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
          <Hidden smUp>
            <Tooltip title={by}>
              <IconButton>
                <AccountIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden xsDown>
            <Chip
              variant="outlined"
              color="default"
              label={by}
              icon={<AccountIcon />}
            />
          </Hidden>
        </Grid>
        <Grid item xs>
          <Hidden smUp>
            <Tooltip title={<TimeAgo datetime={time * 1000} />}>
              <IconButton>
                <ScheduleIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden xsDown>
            <Chip
              variant="outlined"
              color="default"
              label={<TimeAgo datetime={time * 1000} />}
              icon={<ScheduleIcon />}
            />
          </Hidden>
        </Grid>
      </Grid>
    </CardActions>
  )
}

export default PostActions
