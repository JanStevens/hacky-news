import React from 'react'
import { Container } from '@material-ui/core'
import NavBar from './components/NavBar'
import Posts from './components/Posts'

import { CssBaseline } from '@material-ui/core'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import { ThemeProvider } from './components/ThemeProvider'

const generateClassName = createGenerateClassName({
  productionPrefix: 'hn',
})

const App = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider>
        <CssBaseline />
        <Container maxWidth="md">
          <NavBar />
          <Posts />
        </Container>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
