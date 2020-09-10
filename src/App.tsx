import React from 'react'
import { Alert } from '@material-ui/lab'
import { CssBaseline, Container } from '@material-ui/core'
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import loadable from '@loadable/component'
import { StoryEnum } from './types'

import NavBar from './components/NavBar'
const Posts = loadable(() => import('./components/Posts'))
const Item = loadable(() => import('./components/Item'))
const User = loadable(() => import('./components/User'))

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
                <Posts postType={StoryEnum.Top} />
              </Route>
              <Route exact path={'/newest'}>
                <Posts postType={StoryEnum.New} />
              </Route>
              <Route path={'/items/:id'} component={Item} />
              <Route path={'/users/:id'} component={User} />
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
