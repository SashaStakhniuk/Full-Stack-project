import React from 'react'
import './backgroundLogin.css';
import './buttonStyle.css';
class EmailConfirmation extends React.Component{
    constructor(props){
        super(props)
        this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)

        this.state={
            twoFactorCode:"",
            returnUrl:"http://localhost:3000/"
        }
    }
async makeRequest(){
    try{
        console.log(this.state);
        const response = await fetch('https://localhost:44361/api/accountjwt/LoginTwoStep', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                     body: JSON.stringify(this.state)
                })
            
                // const data = await response.json()
                if (response.ok === true) {
                    // console.log(data)
                    //  sessionStorage.setItem('access_token', data.access_token);
                    //  sessionStorage.setItem('userId', data.userId);
                    // //  sessionStorage.setItem('userEmail', data.userEmail);
                    // //this.props.setCredentials(data.access_token,data.userId);
                    // this.setState({error:""})
                    window.location = '/authentication'
                    // <AuthenticationRegistration authorized={true}></AuthenticationRegistration>
                } else {
                    // window.location = '/authorization'
                    // this.setState({error:"Invalid code"})
                    console.log(response.status, response.errorText)
                }
    
        //const data = await response.json()
    }
    catch{

    }
   
}
handleForm(e) {
    e.preventDefault()
    //console.log(e.target)
    const {code} = e.target
    this.setState({
        twoFactorCode:code.value
    },()=>this.makeRequest())
}

render(){
    return(
        <div className='container'>
                <form onSubmit={this.handleForm} className='text-center' style={{width:'40%'}}>
                            <div className="form__group field">
                                    <input type="text" className="form__field" name="code"/>
                                    <label htmlFor="code" className="form__label">Code:</label>
                            </div>
                            <button className="btn btn-primary m-2" style={{minWidth:'100%'}}>Send</button>
                </form>
        </div>
    )
}
}
export default EmailConfirmation;