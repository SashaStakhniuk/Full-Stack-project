// import React, { useEffect, useState } from 'react'


//  function Users() {

//     const [personView, setUserDatas] = useState({
//         people:[]
//     })
//     useEffect(()=>{
//         fetchUserApi("https://localhost:44361/api/user")
//     })
        
//         // const fetchUserApi=async function(url){
//         //    await fetch(url)
//         //     .then(response=> response.json())
//         //     //.then(result=>console.log(result))
//         //     .then(result=>setUserDatas({
//         //         people:result
//         //     }))
//         // }

//         const fetchUserApi = async function(url){
//             const response=await fetch(url)
//             if (response.ok === true) {
//                 const result = await response.json()
//                 setUserDatas({
//                     people:result
//                 })
//                 console.log(result)
//             }
//             else{
//                 const errorData = await response.json()
//                 console.log(errorData)
//             }
//         }
        
        
    
//         return(
//             <div>
//                     <div style={{textAlign:"center"}}>
//                     <h2>List of Users </h2>
//                     </div>
//                     <div style={{padding:"1%"}}>
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Name:</th>
//                                     <th>LastName:</th>
//                                     <th>Email:</th>
//                                     <th>Followers:</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {personView.people.map(p=>(
//                                     <tr>
//                                         <td >{p.userName}</td>
//                                         <td >{p.lastName}</td>
//                                         <td >{p.email}</td>
//                                         <td >{p.myFollowers}</td>
//                                     </tr>

//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//             </div>
//         )
//     }
// export default Users
import React from 'react'

class User extends React.Component{
    constructor(props){
        super(props)
        this.fetchUserApi=this.fetchUserApi.bind(this)
        this.tokenKey = "access_token"
        this.url="https://localhost:44361/api/user"
        this.state={
            users:[]
        }
    }

    componentDidMount(){
        this.fetchUserApi(this.url)
    }
    // componentDidUpdate(){
    //     this.fetchUserApi(this.url)
    // }

 fetchUserApi = async function(url){
    const token = sessionStorage.getItem(this.tokenKey)

                const response=await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'bearer ' + token
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
 export default User
            
