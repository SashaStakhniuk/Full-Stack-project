import React from 'react'
import Loader from 'react-loader-spinner'
import {connect} from "react-redux"
import "./AboutUser.css"
class AboutUser extends React.Component{
    constructor(props){
        super(props)
        this.getPosts=this.getPosts.bind(this)
        this.getProfile=this.getProfile.bind(this)
        this.subscribe=this.subscribe.bind(this)
        this.checkSubscription=this.checkSubscription.bind(this)
        this.getProfileUrl="https://localhost:44361/api/user/"
        this.getPostsUrl="https://localhost:44361/api/useractions/GetAllPosts"
        this.subscribeUrl="https://localhost:44361/api/useractions/Subscribe"
        this.unsubscribeUrl="https://localhost:44361/api/useractions/UnSubscribe"
        this.checkSubscriptionUrl="https://localhost:44361/api/useractions/CheckUserSubscriptions"


        this.state={
            profile:[],
            posts:[],
            isSubscribedNow:false,
            loaded:false
        }
    }

    componentDidMount(){
        //this.getProfile()
        //  console.log(this.props.location.aboutProps===undefined)
         try{
            //  console.log(this.props.match.params.id)
            this.checkSubscription(this.props.match.params.id);
            if(this.props.location.aboutProps!==undefined){
                console.log(this.props.location.aboutProps)
                 this.setState({
                     profile:this.props.location.aboutProps.profile,
                     posts:this.props.location.aboutProps.posts,
                     loaded:true
                 })
             }else{
                 this.setState({
                     loaded:false
                 })
                this.getProfile(this.props.match.params.id);
                this.getPosts(this.props.match.params.id);
             }
         }
         catch{

         }
        
    }

    componentDidUpdate(prevProps) {
         console.log(prevProps)
         if(this.state.profile.userId!==this.props.match.params.id){
            this.checkSubscription(this.props.match.params.id);
            this.getProfile(this.props.match.params.id);
            this.getPosts(this.props.match.params.id);
         }
        
    }
    
        getProfile = async function(id){
            const response=await fetch(this.getProfileUrl+id)
            // console.log(response)
            const result = await response.json()
            if (response.ok === true) {
                this.setState({
                    profile:result
                })
                console.log(result)
            }
            else{
                console.log(result)
            }
        }

 getPosts = async function(){

                const response=await fetch(this.getPostsUrl)
                if (response.ok === true) {
                    const result = await response.json()
                    this.setState({
                        posts:result,
                        loaded:true
                    })
                    console.log(result)
                }
                else{
                    const errorData = await response.json()
                    console.log(errorData)
                }
            }
            
subscribe=async (subscribeOnId)=>{
    console.log(subscribeOnId);
    const datas={
        subscriberId:this.props.credentials.userId,
        subscribeOnId
    }
    console.log(datas);
    console.log(this.props.credentials.tokenKey)
    const response=await fetch(this.subscribeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + this.props.credentials.tokenKey
        },
        body:JSON.stringify(datas)
    })
    //console.log(JSON.stringify(this.state))
    if(response.ok===true){
        this.setState({
            isSubscribedNow:true,
            profile:this.state.profile.myFollowers+1
        })
    }
    // console.log(await response.json())
}
unsubscribe=async (subscribeOnId)=>{
    console.log(subscribeOnId);
    const datas={
        subscriberId:this.props.credentials.userId,
        subscribeOnId
    }
    console.log(datas);
    console.log(this.props.credentials.tokenKey)
    const response=await fetch(this.unsubscribeUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + this.props.credentials.tokenKey
        },
        body:JSON.stringify(datas)
    })
    //console.log(JSON.stringify(this.state))
    if(response.ok===true){
        this.setState({
            isSubscribedNow:false,
            profile:this.state.profile.myFollowers-1
        })
    }
    // console.log(await response.json())
}


checkSubscription=async (subscribeOnId)=>{
    console.log(subscribeOnId);
    const datas={
        subscriberId:this.props.credentials.userId,
        subscribeOnId
    }
    console.log(datas);
    console.log(this.props.credentials.tokenKey)
    const response=await fetch(this.checkSubscriptionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + this.props.credentials.tokenKey
        },
        body:JSON.stringify(datas)
    })
    //console.log(JSON.stringify(this.state))
    this.setState({
        isSubscribedNow:await response.json()
    },()=>console.log(this.state.isSubscribedNow))
    // console.log(await response.json())
}

        render(){
            let followButton=""
            // console.log(this.props.credentials.userId)
             console.log(this.state.isSubscribedNow)
            if(!this.state.isSubscribedNow){
                if(this.props.credentials.userId!==null){
                    followButton=
                   this.state.profile.userId!==this.props.credentials.userId?
                   <button className="btn btn-success" onClick={()=>this.subscribe(this.state.profile.userId)} style={{borderRadius:"20px"}}>Follow</button>
                   :"";
               }
            }else{
                if(this.props.credentials.userId!==null){
                    followButton=
                   this.state.profile.userId!==this.props.credentials.userId?
                   <button className="btn btn-warning" onClick={()=>this.unsubscribe(this.state.profile.userId)} style={{borderRadius:"20px"}}>Unsubscribe</button>
                   :"";
               }
            }
            
          
            return(

                <div>
                    {this.state.profile?
                    <div className="text">
                        <div className="text-center">
                            <h1 className="m-5">{this.state.profile.name}</h1>
                            <div className="m-1">{this.state.profile.aboutProfile}</div>
                            <div className="d-flex justify-content-around" style={{paddingLeft:"10%",paddingRight:"10%"}}>
                                {/* <button className="btn btn-success" style={{borderRadius:"20px"}}>Follow</button> */}
                                {followButton}
                                <div>{this.state.profile.myFollowers} Followers</div>
                                <div>about</div>
                            </div>
                            <hr/>
                        </div>
                        <div className="d-flex w-100 justify-content-start p-1">
                            <div className="hidden">
                                <div style={{minWidth:"20%"}}>
                                    <div className="m-1 p-2">
                                        <img style={{width:"100%"}} className="rounded" src={this.state.profile.profilePhoto} alt="..."></img>
                                    </div>
                                    <div className="m-1 p-2">
                                        {followButton}
                                    </div>
                                </div>
                            </div>
                            <div className="userPostsView" >
                                {this.state.loaded?this.state.posts.map((post)=>
                                    this.state.profile.userId===post.id?
                                    <div style={{marginBottom:"20px"}}>
                                        <div className="postsWidth">
                                            <h2>{post.header}</h2>
                                        </div>
                                        <div className="postsWidth">
                                            <h4 style={{color:"gray"}}>{post.description}</h4>
                                        </div>
                                        <div className="w-100">
                                            <img className="rounded mb-2 postsWidth" src={post.postPhoto} alt="..."></img>
                                            <div className="postsWidth" style={{textAlign:'justify'}}>
                                                {post.article}
                                            </div>
                                        </div>
                                    </div>
                                    :""
                                ):<div className="centeredLoader">
                                    <Loader  type="Puff" color="#434141" height={150} width={150}/>
                                  </div>}
                                {/* {this.state.posts.map((post)=>
                                    this.state.profile.userId===post.id?
                                    <div style={{marginBottom:"20px"}}>
                                        <div style={{width:"70%"}}>
                                            <h2>{post.header}</h2>
                                        </div>
                                        <div style={{width:"70%"}}>
                                            <h4 style={{color:"gray"}}>{post.description}</h4>
                                        </div>
                                        <div className="w-100">
                                            <img className="rounded mb-2" style={{width:"70%"}} src={post.postPhoto} alt="..."></img>
                                            <div style={{textAlign:'justify',width:"70%"}}>
                                                {post.article}
                                            </div>
                                        </div>
                                    </div>
                                    :""
                                )} */}
                            </div>
                        </div>
                    </div>
                    :""}
                </div>
            )
        }
    }
    function mapStateToProps(state){
        return{
            credentials:state.credentials
        }
    }

 export default connect(mapStateToProps)(AboutUser)
            
