
import React from 'react';
import { Provider } from 'react-redux'
import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import App from './App';
// import './index.css';
// import profilePhoto from'../images/unnamed.png';
import Users from './Users';
import AuthenticationRegistration from './AuthenticationRegistration';

import NotFound from './NotFound';
import Registration from './Registration';
import Login from './Login';
// import logo from './MediumLogo2.png'
import logo from '../images/mediumLogoWhite.webp'

import WriteAStory from './WriteAStory';
import UserPage from './UserPage';
import AboutUser from './AboutUser';
import Tag from './Tag';
import Subscriptions from './Subscriptions';


const Root = ({ store }) => (
  <Provider store={store}>
<Router>
<nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
   
  <div style={{maxWidth:"30%"}} >
    <NavLink to="/"><img src={logo} alt="logo" className="rounded-end" style={{width:"35%",minWidth:'120px',padding:'0'}}></img></NavLink>
  </div>
    <div className="d-flex justify-content-around">

    <AuthenticationRegistration/>

      {/* <AuthenticationRegistration authorized={registered()}/> */}

      <div>
        <button style={{marginTop:'25%'}} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
    
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
                <div className="d-flex justify-content-around">
                  <div>
                    <NavLink exact activeClassName="activeLink" className="btn btn-primary" to="/authorization">Registration</NavLink>
                  </div>
                  <div>
                    <NavLink exact activeClassName="activeLink" className="btn btn-primary" to="/authentication">Login</NavLink>
                  </div>
                </div>
            </li>
          <li className="nav-item">
            <NavLink exact activeClassName="activeLink" className="textDecoration" to="/">MainPage</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="activeLink" className="textDecoration" to="/users">Users</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/userdatassettings">Settings</NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  </div>
</nav>

<Switch>
  <Route exact path="/" component={App}></Route>
  <Route path="/users" component={Users}></Route>
  <Route path="/authorization" component={Registration}></Route>
  <Route path="/authentication" component={Login}></Route>
  <Route path="/writingstory" component={WriteAStory}></Route>
  <Route path="/userdatassettings" component={UserPage}></Route>
  <Route path="/aboutUser/:id" component={AboutUser}></Route>
  <Route path="/tag/:title" component={Tag}></Route>
  <Route path="/subscriptions" component={Subscriptions}></Route>


  <Route component={NotFound}></Route>

</Switch>
</Router>
</Provider>
)
export default Root