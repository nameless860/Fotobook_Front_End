import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './components/Login/Login'
import Photos from './components/Photos/Photos'
import Layout from './components/Layout/Layout'

const requireSignIn = ({redirectPath=''}) => {
  return (WrappedComponent) => {
    class CRequireSignedIn extends Component {
      render() {
        const isSignedIn = this.props.isSignedIn || false;
        if(isSignedIn) {
          return <WrappedComponent {...this.props}/>
        } else {
          return <Redirect to={redirectPath}/>
        }
      }
    }

    const mapStateToProps = state => ({
      isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn,
    })

    const RequireSignedIn = connect(
      mapStateToProps,
    )(CRequireSignedIn)

    return RequireSignedIn;
  }
}

const withPrivateRouter = requireSignIn({
  redirectPath: 'login'
})

const LoginRouter = Login
const PhotosRouter = withPrivateRouter(Photos)

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route exact path="" render={() => (<Redirect to="/photos" />)}/>
            <Route exact path="/" render={() => (<Redirect to="/photos"/>)}/>
            <Route exact path="/login"  component ={LoginRouter} />
            <Route exact path="/photos" component={PhotosRouter} />
          </Layout>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes