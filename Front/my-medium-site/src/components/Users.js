import React from 'react'
import {connect} from "react-redux"

class User extends React.Component{
    constructor(props){
        super(props)
        this.fetchUserApi=this.fetchUserApi.bind(this)
        this.url="https://localhost:44361/api/user"
        this.state={
            users:[]
        }
    }

    componentDidMount(){
        this.fetchUserApi(this.url)
        console.log(this.props.credentials.tokenKey)
    }
    // componentDidUpdate(){
    //     this.fetchUserApi(this.url)
    // }

 fetchUserApi = async function(url){

                const response=await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'bearer ' + this.props.credentials.tokenKey
                    }
                })
                if (response.ok === true) {
                    const result = await response.json()
                    this.setState({
                        users:result
                    })
                    console.log(result)
                }
                else{
                    const errorData = await response.json()
                    console.log(errorData)
                }
            }
            
            
        render(){
            return(

                <div>
                        <div style={{textAlign:"center"}}>
                        <h2>List of registered users </h2>
                        </div>
                        <div style={{padding:"1%"}}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name:</th>
                                        <th>LastName:</th>
                                        <th>Email:</th>
                                        {/* <th>Followers:</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map(p=>(
                                        <tr>
                                            <td >{p.userName}</td>
                                            <td >{p.lastName}</td>
                                            <td >{p.email}</td>
                                            {/* <td >{p.myFollowers}</td> */}
                                        </tr>
    
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            )
        }
    }
    function mapStateToProps(state){
        return{
            credentials:state.credentials
        }
    }

 export default connect(mapStateToProps)(User)
            
