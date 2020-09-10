import React, { useMemo } from 'react'
import {
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
  Dns as DnsIcon,
} from '@material-ui/icons'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import extractDomain from '../utils/extractDomain'

import { Item } from '../types/api'

const useStyles = makeStyles(() => ({
  right: {
    textAlign: 'right',
  },
}))

const PostActions = ({ id, url, score, descendants, by, time }: Item) => {
  const history = useHistory()
  const classes = useStyles()
  const handleClick = () => history.push(`/users/${by}`)

  const domain = useMemo(() => extractDomain(url), [url])

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      wrap="nowrap"
      spacing={0}
    >
      <Grid item xs>
        <Tooltip title="Score" placement="top">
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
        <Tooltip title="Comments" placement="top">
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
      <Grid item xs>
        <Hidden smUp>
          <Tooltip title={by} placement="top">
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
      {domain && (
        <Grid item xs>
          <Hidden smUp>
            <Tooltip title={domain} placement="top">
              <IconButton>
                <DnsIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden xsDown>
            <Chip
              variant="outlined"
              color="default"
              label={domain}
              icon={<DnsIcon />}
            />
          </Hidden>
        </Grid>
      )}
      <Grid item xs className={classes.right}>
        <Hidden smUp>
          <Tooltip title={<TimeAgo datetime={time * 1000} />} placement="top">
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
