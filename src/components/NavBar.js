import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Typography, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hacky News
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
