//import AuthenticationRegistration from './AuthenticationRegistration';
// import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
import {NavLink} from "react-router-dom"
import './backgroundLogin.css';
import './buttonStyle.css';
// import fb from '../fb.png'
// import google from '../google.png'

import React from 'react'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)

        this.state={
            email:"",
            password:"",
        }
    }
    async makeRequest(){
        try{

            const response = await fetch('https://localhost:44361/api/accountjwt/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                         body: JSON.stringify(this.state)
                    })
                
                    const data = await response.json()
                    if (response.ok === true) {
                        sessionStorage.setItem('access_token', data.access_token)
                        sessionStorage.setItem('userEmail', data.userEmail)
                        
                    } else {
                        console.log(response.status, response.errorText)
                    }
        
            //const data = await response.json()
        }
        catch{

        }
       
    }
    async handleForm(e) {
        e.preventDefault()
        //console.log(e.target)
        const {email, password} = e.target
        this.setState({
            email:email.value,
            password:password.value,
        },()=>this.makeRequest())
    }

    render(){
        return(
            <div>
                <div className="centerDiv">
                    <div className="border">
                    <div className="text-center" style={{fontWeight:'bolder'}}>Sign-In</div>
                        <form onSubmit={this.handleForm}>
                                    <div className="row m-1">
                                    <div className="form__group field">
                                            <input type="email" className="form__field" placeholder="Email" name="email" defaultValue="MainAdmin@gmail.com"/>
                                            <label htmlFor="email" className="form__label">Email</label>
                                        </div>
                                    </div>

                                    <div className="row m-1">
                                    <div className="form__group field">
                                            <input type="password" className="form__field" placeholder="Password" name="password" defaultValue="Qwerty1!" required/>
                                            <label htmlFor="password" className="form__label">Password</label>
                                        </div>
                                    </div>
                                <div className="text-center">
                                    <button className="btn btn-success m-2" style={{minWidth:'60%'}} data-bs-dismiss="modal">Sign-In</button>
                                    {/* <a className="btn btn-success m-2" style={{minWidth:'60%'}} style={{textDecoration: 'none', color:'white'}} href="/">Sign-In</a> */}

                                </div>                
                            </form>
                           
                            <div className="d-flex flex-column m-1">
                                <button type="button" className="login-with-google-btn m-1" >
                                    Sign in with Google
                                </button>
                                    {/* <div class="effect aeneas">
                                        <div className="buttons">
                                        <a href={"s"}  className="fb" title="Log-In with Facebook"><i><img style={{width:"100%"}} src={fb} alt="fb"></img></i></a>
                                        <a href={"s"}  className="g-plus" title="Log-In with Google"><i><img style={{width:"100%"}} src={google} alt="google"></img></i></a>
                                        </div>
                                    </div> */}
                            </div>
                            <hr/>
                            {/* <div data-bs-dismiss="modal"> */}
                            <div className="text-center">
                                    <NavLink className="btn btn-secondary" to="/authorization">I don't have an account</NavLink>
                            </div>
                            {/* <div>
                                    <a href="/authorization">I don't have an account</a>
                            </div> */}
                        </div>

                    </div>
            </div>
        );
    }
}

export default Login;

// const response = await fetch('/api/accountjwt/token', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
// })

// const data = await response.json()
// if (response.ok === true) {
//     sessionStorage.setItem(tokenKey, data.access_token)
//     getBikes()
// } else {
//     console.log(response.status, response.errorText)
// }










// //import AuthenticationRegistration from './AuthenticationRegistration';
// // import {Switch,NavLink,Route, BrowserRouter as Router} from "react-router-dom"
// import {NavLink} from "react-router-dom"
// import './backgroundLogin.css';
// import './buttonStyle.css';

// import React from 'react'
// class Login extends React.Component{
//     constructor(props){
//         super(props)
//         this.handleForm=this.handleForm.bind(this)
//         this.makeRequest=this.makeRequest.bind(this)
//         this.submitButton=this.submitButton.bind(this)

//         this.state={
//             email:"",
//             password:"",
//             btnClassName:"nonActive"
//         }
//     }
//     async makeRequest(){
//         try{

//             const response = await fetch('https://localhost:44361/api/accountjwt/token', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                          body: JSON.stringify(this.state)
//                     })
                
//                     const data = await response.json()
//                     if (response.ok === true) {
//                         sessionStorage.setItem('access_token', data.access_token)
//                     } else {
//                         console.log(response.status, response.errorText)
//                     }
        
//             //const data = await response.json()
//         }
//         catch{

//         }
       
//     }
//     submitButton(){
//         console.log("click")
//         //const btn = document.getElementById("btn");
//         const btnText = document.getElementById("btnText");
//         //console.log(btnText.innerHTML)
//         if(btnText){
//             if(this.state.btnClassName==="nonActive"){
//                 this.setState({
//                     btnClassName:"active"
//                 })
//             }else{
//                 this.setState({
//                     btnClassName:"nonActive"
//                 })
//             }
                
//         }
//         //"nonActive"
//             //btn.classList.add("active");
//     }
//     async handleForm(e) {
//         e.preventDefault()
//         //console.log(e.target)
//         const {email, password} = e.target
//         this.setState({
//             email:email.value,
//             password:password.value,
//         },()=>this.makeRequest())
//     }

//     render(){
//         return(
//             <div>
//                 <div className="centerDiv">
//                     <div className="border">
//                     <div className="text-center" style={{fontWeight:'bolder'}}>Sign-In</div>
//                         <form onSubmit={this.handleForm}>
//                                     <div className="row m-1">
//                                     <div class="form__group field">
//                                             <input type="email" className="form__field" placeholder="Email" name="email" defaultValue="MainAdmin@gmail.com"/>
//                                             <label for="email" class="form__label">Email</label>
//                                         </div>
//                                     </div>

//                                     <div className="row m-1">
//                                     <div class="form__group field">
//                                             <input type="password" className="form__field" placeholder="Password" name="password" defaultValue="Qwerty1!" required/>
//                                             <label for="password" class="form__label">Password</label>
//                                         </div>
//                                     </div>
//                                 <div className="text-center">
//                                 <button data-bs-dismiss="modal" id="btn" className={"buttonBtn " +this.state.btnClassName} onClick={()=>this.submitButton()}>
//                                     <p id="btnText">Sign-In</p>
//                                     <div class="check-box">
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
//                                             <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
//                                         </svg>
//                                     </div>
//                                 </button>
//                                     {/* <button className="btn btn-success m-2" style={{minWidth:'40%'}} data-bs-dismiss="modal">Sign-In</button> */}
//                                 </div>                
//                             </form>
//                             <hr/>
//                             <div>
//                                     <NavLink activeClassName="btn btn-secondary stretched-link" className="textDecoration" to="/authorization">I don't have an account</NavLink>
//                             </div>
//                         </div>

//                     </div>
//             </div>
//         );
//     }
// }

// export default Login;
