import React, { Component } from 'react'
import logo from './logo.png'
import styles from './styles.css'

class App extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h2>Welcome!</h2>
        </div>
      </div>
    )
  }
}

export default App
