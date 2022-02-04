import React from 'react'
// import Loader from 'react-loader-spinner'
import {connect} from "react-redux"

class ChangeUserPassword extends React.Component{
    constructor(props){
        super(props)
        this.formHandle=this.formHandle.bind(this)
        this.makeRequest=this.makeRequest.bind(this)
        this.url="https://localhost:44361/api/accountactions/ChangeUserPassword";
        this.checkEmailUrl="https://localhost:44361/api/accountactions/CheckUserByEmail";
        this.resetPasswordUrl="https://localhost:44361/api/accountactions/ResetPassword";
        this.content="";
        this.state={
            Id:this.props.credentials.userId,
            newPassword:"",
            email:"",
            // oldPassword:"",
            message:"",//this.props.message
            checked:false,
            token:""
        }
    }
    componentDidMount(){
        //  console.log(this.props.location.search);
        // if(this.props.location.search)
        // {
            
        // }
        const search = this.props.location.search;
        const email = new URLSearchParams(search).get('email');
        var token = new URLSearchParams(search).get('token'); // doesn't work correctly
        //console.log(email,token)
        if(email!==null && token!==null)
        {
            var pos1 = this.props.location.search.indexOf("=");
            var pos2 = this.props.location.search.indexOf("=", pos1 + 1);
            token=this.props.location.search.substr(pos2+1);

            //console.log("token=" + token)

            this.setState({              
                checked:true,
                //  token:window.location.href.substr(55).replace('%', "+"), /// this works
                 token,
                 email
            },()=>console.log(this.state));
        }
        else{
           
            this.setState({
                message: <div className='text-center'>
                            <h4 style={{color:"blue"}}>{this.props.message}</h4>
                        </div>,
                checked:false
            },()=>console.log(this.state));
        }
       
        
    }
    formHandle(e){
        e.preventDefault()
        //console.log(e.target)
        
        if(this.state.checked)
        {
            const {newPassword} = e.target;
            this.setState({
                newPassword:newPassword.value
            },()=> this.makeRequest(this.resetPasswordUrl));
        }
        else
        {
            const {email} = e.target;
            this.setState({
                email:email.value,
            },()=> this.makeRequest(this.checkEmailUrl));
        }

        
    }
     async makeRequest(url){

        try{
          
            // const response = await fetch(this.url+this.state.userId+"/"+this.state.newPassword);
            const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            //'Authorization': 'bearer ' + sessionStorage.getItem("access_token")
                        },
                         body: JSON.stringify(this.state)
                    })
                
                    const data = await response.json()
                    if (response.ok === true) {
                        console.log(data)
                        this.setState({
                            message: <div className='text-center'>
                                        <h4 style={{color:"green"}}>{data.message}</h4>
                                    </div>
                        })
                        
                        // window.location = '/'
                    } else {
                        console.log(data);
                        this.setState({
                            message: <div className='text-center'>
                                        <h4 style={{color:"red"}}>{data.error}</h4>
                                        <h4 style={{color:"red"}}>{data.error[0].description}</h4>
                                    </div>
                        })
                    }        
        }
        catch{

        }
       
    }
            
        render(){
            this.content= this.state.checked?
             <div>
                <div>New Password:</div>
                <input type="text" minLength={8} className="form-control" name="newPassword"/>
            </div> 
            :
            <div>
                <div>Email:</div>
                <input type="email" className="form-control" name="email"/>
            </div>
           
            return(

                <div className="container">
                   <form onSubmit={this.formHandle}>
                       <div className='mb-3'>
                            {/* <div>Email:</div>
                           <input type="email" className="form-control" name="email"/> */}
                           {/* <div>Current Password:</div>
                           <input type="text" minLength={8} className="form-control" name="oldPassword"/> */}
                           {/* <div>New Password:</div>
                            <input type="text" minLength={8} className="form-control" name="newPassword"/> */}
                            {this.content}
                       </div>
                        {this.state.message}
                        <button type='submit' className='btn btn-primary'>Change Password</button>
                   </form>
                </div>
            )
        }
    }
    function mapStateToProps(state){
        return{
            credentials:state.credentials
        }
    }

 export default connect(mapStateToProps)(ChangeUserPassword)
            
