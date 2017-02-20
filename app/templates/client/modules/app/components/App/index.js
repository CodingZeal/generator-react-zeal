import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { themr } from 'react-css-themr'

import appTheme from './theme.scss'
import logo from './logo.png'

export function App({ theme }) {
  return (
    <div className={theme.app}>
      <div className={theme.header}>
        <img src={logo} className={theme.logo} alt='logo' />
        <h4>Welcome!</h4>
      </div>

      <Switch>
        <Route exact pattern='/' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

function Home() {
  return (
    <h5 style={{ margin: 40 }}>
      Home
    </h5>
  )
}

function NotFound() {
  return (
    <h5 style={{ margin: 40 }}>
      Route not found
    </h5>
  )
}

export default themr('', appTheme)(App)
