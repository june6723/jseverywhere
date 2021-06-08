// import React and our routing dependencies
import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Layout from '../components/Layout';

// import our routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new'
import EditNote from './edit';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  if(loading) return <p>Loading...</p> 
  if(error) return <p>Error!</p>
  return (
    <Route 
      {...rest}
      render = {props => 
        data.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
// define our routes
const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/new" component={NewNote} />
        <PrivateRoute path="/edit/:id" component={EditNote} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  );
};

export default Pages;
