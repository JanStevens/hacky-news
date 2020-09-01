import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(-2),
  },
}))

const Loading = () => {
  const classes = useStyles()
  return <LinearProgress classes={classes} />
}

export default React.memo(Loading)
