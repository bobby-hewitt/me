import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './containers/Home'
import About from './containers/About'
import { NavBar, ClickCanvas } from './components'
import styles from './App.css'

const Routes = () => (
  <div>
    <header>
      <NavBar />
    </header>

    <main>
      <div className="container">
      <ClickCanvas />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      </div>
    </main>
  </div>
)

export default Routes;
