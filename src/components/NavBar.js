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
  Star as StarIcon,
  FiberNew as FiberNewIcon,
  Brightness3,
  Brightness7,
} from '@material-ui/icons'
import { ThemeContext } from './ThemeProvider'

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
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hacky News
        </Typography>
        <Box ml={2}>
          <IconButton color="inherit">
            <Tooltip title="Top Stories">
              <StarIcon />
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
