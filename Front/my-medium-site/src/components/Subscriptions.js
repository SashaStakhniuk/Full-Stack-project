
import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"
class Subscriptions extends React.Component{
    constructor(props){
        super(props)
        // this.handleForm=this.handleForm.bind(this)
        this.makeRequest=this.makeRequest.bind(this)

        this.state={
           subscribedOn:[]
        }
    }
    componentDidMount(){
        this.makeRequest();
    }
    async makeRequest(){
        try{

            const response = await fetch('https://localhost:44361/api/useractions/GetUserSubscriptions/'+this.props.credentials.userId,{
                method: 'GET',
                headers: {
                    'Authorization': 'bearer ' + this.props.credentials.tokenKey
                }
            })
                
                    const data = await response.json()
                    if (response.ok === true) {
                        console.log(data)
                        this.setState({
                            subscribedOn:data
                        })
                    } else {
                        // window.location = '/authorization'
                        console.log(response.status, response.errorText)
                    }
        
            //const data = await response.json()
        }
        catch{

        }
       
    }


    render(){

        return(
            <div>
                {this.state.subscribedOn.length>0?
                <div>
                    {this.state.subscribedOn.map(user=>
                        <div className="row row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1 m-5">
                             <NavLink
                                to={{
                                    pathname:"/aboutUser/"+user.userId,
                                    }}
                                >
                                     <div className="card" style={{width: '18rem'}}>
                                        <img src={user.profilePhoto} className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h4 className="card-title text-center">{user.name}</h4>
                                            <h5 className="card-title">{user.nickName}</h5>
                                            <p className="card-text">{user.aboutProfile}</p>
                                        </div>
                                    </div>
                            </NavLink>
                           
                        </div>
                    )}
                </div>
                :
                <div className="text-center">
                    You don't have subscriptions yet
                </div>}
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state.credentials)
        return {
            credentials: state.credentials
        }
    }
    // function mapDispatchToProps(dispatch){
    //     return{
    //         // setCredentials:(tokenKey,userId)=>dispatch(SetUserCredentials(tokenKey,userId))
    //         setCredentials:()=>dispatch({type:GetCredentialsFromSessionStorage})
    //     }
    //   };
        
export default connect(mapStateToProps)(Subscriptions)

//  export default Subscriptions;