import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from './containers/Home'
import About from './containers/About'
import { NavBar, ClickCanvas } from './components'
import styles from './App.css'

class Routes extends Component{ 

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(){
    for (var i = 0; i < this.props.scrollCheck.length; i++){
      if (this.isScrolledIntoView(this.props.scrollCheck[i])){
        this.props.scrollCheck[i].func()
      }
    }
  }

  isScrolledIntoView(el) {
    el = el.ref
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
  }

  render(){
    return(
      <div>
        <header style={{zIndex:1000000000000}}>
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
  }
}

const mapStateToProps = state => ({
  scrollCheck: state.ui.scrollCheck
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // addElemToScrollCheck
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)