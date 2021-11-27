import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store/store'
import Root from './components/Root';

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
// import App from './App';
// import './index.css';
// // import profilePhoto from'../images/unnamed.png';
// import Users from './components/Users';
// import AuthenticationRegistration from './components/AuthenticationRegistration';

// import NotFound from './components/NotFound';
// import Registration from './components/Registration';
// import Login from './components/Login';
// import logo from './MediumLogo2.png'
// import WriteAStory from './components/WriteAStory';
// import UserPage from './components/UserPage';

// const registered=()=>{
//   const token=sessionStorage.getItem("access_token")
//   if(token){
//     return true
//   }else{
//     return false
//   }
// }

// const routing=(
// <Router>
// <nav className="navbar navbar-dark bg-dark">
//   <div className="container-fluid">
   
//   <div style={{maxWidth:"30%"}} >
//     <NavLink to="/"><img src={logo} alt="logo" className="rounded-end" style={{width:"35%",minWidth:'120px',padding:'0'}}></img></NavLink>
//   </div>
//     <div className="d-flex justify-content-around">

//     {/* <AuthenticationRegistration/> */}

//       <AuthenticationRegistration authorized={registered()}/>

//       <div>
//         <button style={{marginTop:'25%'}} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//       </div>
//     </div>
    
//     <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
//       <div className="offcanvas-header">
//         <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
//         <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//       </div>
//       <div className="offcanvas-body">
//         {/* <div className="d-flex justify-content-around">
//           <div>
//             <NavLink exact activeClassName="activeLink" className="btn btn-primary stretched-link" to="/authorization">Registration</NavLink>
//           </div>
//           <div>
//             <NavLink exact activeClassName="activeLink" className="btn btn-primary stretched-link" to="/authentication">Login</NavLink>
//           </div>
//         </div> */}
//         <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//             <li className="nav-item">
//                 <div className="d-flex justify-content-around">
//                   <div>
//                     <NavLink exact activeClassName="activeLink" className="btn btn-primary" to="/authorization">Registration</NavLink>
//                   </div>
//                   <div>
//                     <NavLink exact activeClassName="activeLink" className="btn btn-primary" to="/authentication">Login</NavLink>
//                   </div>
//                 </div>
//             </li>
//           <li className="nav-item">
//             <NavLink exact activeClassName="activeLink" className="textDecoration" to="/">MainPage</NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink activeClassName="activeLink" className="textDecoration" to="/users">Users</NavLink>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </nav>
// {/* 
// <button className="btn" style={{maxWidth:"30%"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
//           <img className="rounded-circle" style={{maxWidth:"100%"}}  src="data:image/png;base64,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" alt="..."/>
// </button>
// <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//   <div className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="staticBackdropLabel">Registration</h5>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body">
//         <AuthenticationRegistration></AuthenticationRegistration>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
//       </div>
//     </div>
//   </div>
// </div> */}


// <Switch>
//   <Route exact path="/" component={App}></Route>
//   <Route path="/users" component={Users}></Route>
//   <Route path="/authorization" component={Registration}></Route>
//   <Route path="/authentication" component={Login}></Route>
//   <Route path="/writingstory" component={WriteAStory}></Route>
//   <Route path="/aboutuser" component={UserPage}></Route>


//   <Route component={NotFound}></Route>

// </Switch>
// </Router>
// )
// ReactDOM.render(
//   routing,
//   document.getElementById('root')
// );
