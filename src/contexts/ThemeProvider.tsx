import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from 'react'
import { lightBlue, blueGrey, red } from '@material-ui/core/colors'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from '@material-ui/core/styles'

// A custom theme for this app
const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#ef6c00',
    },
    secondary: {
      main: lightBlue[500],
    },
    error: {
      main: red[900],
    },
    type: 'light',
  },
}

const darkTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#ef6c00',
    },
    secondary: {
      main: blueGrey[600],
    },
    error: {
      main: red[900],
    },
    type: 'dark',
  },
}

const browserIsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

interface IThemeProvider {
  children: React.ReactNode
}

// Responsible for watching the dark mode toggle of the browser / os
// and setting up the corresponding theme
export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [dark, setDark] = useState<boolean>(browserIsDarkMode)

  const toggleTheme = useCallback(() => {
    setDark((prevDark) => !prevDark)
  }, [])

  useLayoutEffect(() => {
    const handleEvent = (e: MediaQueryListEvent) => setDark(e.matches)
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', handleEvent)

    return () => mql.removeListener(handleEvent)
  }, [])

  // We only want to create the theme as little as possible so memoize the result of createMuiTheme
  const theme = useMemo(() => createMuiTheme(dark ? darkTheme : lightTheme), [
    dark,
  ])

  // Not sure about this memo but we don't want to force rendering
  const providerValue = useMemo<ThemeContextType>(
    () => ({
      isDarkMode: dark,
      toggleTheme: toggleTheme,
    }),
    [dark, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
