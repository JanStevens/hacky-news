import React from 'react'
import {
  Badge,
  Tooltip,
  IconButton,
  Chip,
  Grid,
  Hidden,
} from '@material-ui/core'
import TimeAgo from 'timeago-react'
import { Link as RouterLink } from 'react-router-dom'
import {
  TrendingUp as TrendingUpIcon,
  Message as MessageIcon,
  AccountCircle as AccountIcon,
  Schedule as ScheduleIcon,
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const PostActions = ({ id, score, descendants, by, time }) => {
  const history = useHistory()

  const handleClick = () => history.push(`/users/${by}`)

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
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
      <Grid item>
        <Tooltip title="Comments">
          <IconButton component={RouterLink} to={`/items/${id}`}>
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
      <Grid item>
        <Hidden smUp>
          <Tooltip title={by}>
            <IconButton component={RouterLink} to={`/users/${by}`}>
              <AccountIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden xsDown>
          <Chip
            variant="outlined"
            color="default"
            label={by}
            onClick={handleClick}
            icon={<AccountIcon />}
          />
        </Hidden>
      </Grid>
      <Grid item>
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
  )
}

export default React.memo(PostActions)
