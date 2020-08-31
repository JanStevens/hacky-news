import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import {
  Whatshot as WhatshotIcon,
  CloudOff as CloudOffIcon,
  FiberNew as FiberNewIcon,
  Brightness3,
  Brightness7,
} from '@material-ui/icons'
import { ThemeContext } from './ThemeProvider'
import useOnlineIndicator from '../hooks/useOnlineIndicator'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const online = useOnlineIndicator()
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hacky News
        </Typography>
        {!online && (
          <Tooltip title="Offline">
            <CloudOffIcon color="error" />
          </Tooltip>
        )}
        <Box ml={2}>
          <IconButton color="inherit">
            <Tooltip title="Top Stories">
              <WhatshotIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="inherit">
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

export default NavBar
