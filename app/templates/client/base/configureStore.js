import { createStore } from 'redux'

import reducer from './reducer'

export default function configureStore() {
  const store = createStore(reducer)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('./reducer').default

      store.replaceReducer(nextReducer)
    })
  }

  return store
}
