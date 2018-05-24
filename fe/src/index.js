import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import { ParallaxProvider } from 'react-scroll-parallax';
import Routes from './Routes'

import './index.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <ParallaxProvider>
        <Routes />
        </ParallaxProvider>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)