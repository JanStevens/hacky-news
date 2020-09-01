import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Tooltip,
  IconButton,
  Link,
} from '@material-ui/core'
import {
  Whatshot as WhatshotIcon,
  CloudOff as CloudOffIcon,
  FiberNew as FiberNewIcon,
  Brightness3,
  Brightness7,
} from '@material-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { ThemeContext } from '../contexts/ThemeProvider'
import useOnlineIndicator from '../hooks/useOnlineIndicator'
import SearchForm from './SearchForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const online = useOnlineIndicator()
  const classes = useStyles()

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          <Link component={RouterLink} to="/" underline="none" color="inherit">
            Hacky News
          </Link>
        </Typography>
        <SearchForm />
        <div className={classes.grow} />

        {!online && (
          <Tooltip title="Offline">
            <CloudOffIcon color="error" />
          </Tooltip>
        )}
        <Box ml={2}>
          <IconButton color="inherit" component={RouterLink} to="/news">
            <Tooltip title="Top Stories" selected={true}>
              <WhatshotIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="inherit" component={RouterLink} to="/newest">
            <Tooltip title="New Stories">
              <FiberNewIcon />
            </Tooltip>
          </IconButton>

          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness3 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(NavBar)
