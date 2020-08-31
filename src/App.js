import React from 'react'
import { Container } from '@material-ui/core'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import Item from './components/Item'

import { Alert } from '@material-ui/lab'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'

import { ThemeProvider } from './components/ThemeProvider'

const generateClassName = createGenerateClassName({
  seed: 'hn',
})

const App = () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Container maxWidth="md">
            <NavBar />
            <Switch>
              <Route exact path={['/', '/news']}>
                <Posts postType={'top'} />
              </Route>
              <Route exact path={'/newest'}>
                <Posts postType={'new'} />
              </Route>
              <Route path={'/item/:id'} component={Item} />
              <Route
                render={() => (
                  <Alert severity="error" variant="filled">
                    404 Not Found
                  </Alert>
                )}
              />
            </Switch>
          </Container>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
