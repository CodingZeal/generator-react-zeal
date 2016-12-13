import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router'
import 'normalize.css'

import App from './modules/app/components/App'
import { apolloClient, configureStore } from './base'

const rootEl = document.getElementById('root')
const store = configureStore()

ReactDOM.render(<Root currentApp={App} />, rootEl)

function Root({ currentApp }) {
  return (
    <ApolloProvider store={store} client={apolloClient}>
      <BrowserRouter>
        {React.createElement(currentApp)}
      </BrowserRouter>
    </ApolloProvider>
  )
}

if (module.hot) {
  module.hot.accept('./modules/app/components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./modules/app/components/App').default

    ReactDOM.render(<Root currentApp={NextApp} />, rootEl)
  })
}
