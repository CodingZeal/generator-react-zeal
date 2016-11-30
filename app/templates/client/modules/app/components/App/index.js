import React from 'react'
import { BrowserRouter, Match, Miss } from 'react-router'

import styles from './styles.scss'
import logo from './logo.png'

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.root}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt='logo' />
          <h2>Welcome!</h2>
        </div>

        <Match exactly pattern='/' component={Home} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <h3>Home</h3>
  )
}

function NotFound() {
  return (
    <h3>Route not found</h3>
  )
}
