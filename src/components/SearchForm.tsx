import React, { FormEvent } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Search as SearchIcon } from '@material-ui/icons'
import { InputBase } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      display: 'block',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const SearchForm = () => {
  const [search, setSearch] = React.useState<string>('')
  const classes = useStyles()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.location.href = `https://hn.algolia.com/?q=${search}`
  }

  return (
    <form
      className={classes.search}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </form>
  )
}

export default React.memo(SearchForm)
