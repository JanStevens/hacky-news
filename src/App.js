import React from 'react'
import { Container } from '@material-ui/core'
import NavBar from './components/NavBar'
import Posts from './components/Posts'

import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from './components/ThemeProvider'

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Container maxWidth="md">
        <NavBar />
        <Posts />
      </Container>
    </ThemeProvider>
  )
}

export default App
