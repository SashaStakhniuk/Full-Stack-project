import './App.css';
import React from 'react'
import Loader from "react-loader-spinner";
import {SetOrUpdatePosts} from "../redux/actions/SetOrUpdatePosts";
import {connect} from "react-redux"
// import AboutUser from './AboutUser';
import { NavLink } from 'react-router-dom';
// import getPostsFromDB from '../redux/action_creators/GetPostsFromDB';

class App extends React.Component {
  constructor(props){
    super(props)
    this.getPosts=this.getPosts.bind(this)
    this.getProfiles=this.getProfiles.bind(this)
    this.url="https://localhost:44361/api/useractions/GetAllPosts"
    this.getUserURL="https://localhost:44361/api/useractions/GetProfiles"

    this.state={
      loaded:false,
      posts:[],
      profiles:[]
    }
  }
componentDidMount(){
  if(this.props.datas.length>0){
    this.getProfiles()
    console.log(this.props.datas)
    this.setState({
     posts:this.props.datas,
     loaded:true
    },()=>console.log(this.state.posts))
    
  }
  else{
    //this.props.getPostsFromStore();
    // this.props.getPosts();
    this.getProfiles()
    this.getPosts()
  }

}

  async getPosts() {
    try{
        const response= await fetch(this.url)
         const data = await response.json()

         if (response.ok === true) {
            //  console.log(data)
             this.setState({
               posts:data,
               loaded:true
              },()=>console.log(this.state.posts))
          
         } else {
             console.log(response.status, response.errorText)
         }
        }
        catch{

        }
}
getProfiles = async function(){
  const response=await fetch(this.getUserURL)

  // console.log(response)
  const result = await response.json()
  if (response.ok === true) {
      console.log(result)
      this.setState({
        profiles:result,
      },()=>console.log(this.state.profiles))
    }
  else{
      console.log(result)
      return []
  }
}
render(){
  let themes=this.state.posts.map(post=>{return post.theme})
   let checkedThemes = themes.filter((theme, index) => themes.indexOf(theme) === index )
  let posts=""
  if(this.state.profiles.length>0){
    posts=
<div id="left"  className="col-md-7">
        Posts Here:
        {this.state.posts.map((post)=>
        <div>
          <div>
            {this.state.profiles.map(profile=>
                profile.userId===post.id?
                 <div className="d-flex" style={{width:"50%",lineHeight:"50px"}}>
                    <img  className="rounded-circle m-1" style={{width:"40px"}} src={profile.profilePhoto} alt="..."></img>
                    <NavLink
                        to={{
                            pathname:"/aboutUser/"+profile.userId,
                            aboutProps:{
                                  profile:profile,
                                  posts:this.state.posts
                                }
                            }}
                            exact
                          >{profile.nickName}
                    </NavLink>            
                             {/* <AboutUser nickName={profile.nickName}>{profile.nickName}</AboutUser> */}
                     {/* <a href={"/users/"+profile.nickName}>{profile.nickName}</a> */}
                  </div>:""
            )}
          </div>
          <a href={"/posts/"+post.postsId} style={{textDecoration:"none",color:"black",cursor:"unset"}}>
          <div className="mb-3 w-100"  style={{backgroundColor:"inherit"}}>
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.header}</h5>
                  <p className="card-text">{post.description}</p>
                  {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                </div>
              </div>
              <div className="col-md-4">
                <img src={post.postPhoto} className="img-fluid rounded-end" alt="..."/>
              </div>
            </div>
          </div>
          </a>
          
        </div>
        )}
      </div>
  }

  const content= this.state.loaded? 
  // <div className="backimage">
  <div>
  <div className="d-flex">
      {posts}
      <div id="right"  className="col-md-5">
      Themes Here:

        <div style={{padding: "3%"}}>
          <h4>DISCOVER MORE OF WHAT MATTERS TO YOU</h4>

          <div className="row row-cols-3">
            {/* {this.state.posts.map((post)=>
              <div className="btn btn-outline-secondary col-sm m-1">{post.theme}</div>
            )} */}
            {checkedThemes.map((theme)=>
                <NavLink
                className="btn btn-outline-secondary col-sm m-1"
                style={{textDecoration:"none",color:"black"}}
                        to={{
                            pathname:"/tag/"+theme,
                            aboutProps:{
                                  posts:this.state.posts
                                }
                            }}
                            exact
                          >{theme}
                    </NavLink>
            )}
           
          </div>
        </div>
      </div>
    </div>
    </div>
  : 
      <div className="centered">
            {/* <Loader type="Puff" color="gray" height={150} width={150}  />  */}
            {/* <Loader type="MutatingDots" color="#000000" height={150} width={150}  />  */}
            <Loader type="Bars" color="#FFE4B5" height={150} width={150}  /> 
      </div>;
  return (
    <div>
          {content}
    </div>
  );
}
}
function mapStateToProps(state){
  console.log(state)
      return {
          datas: state.posts
      }
  }
  function mapDispatchToProps(dispatch){
      return{
          getPostsFromStore:()=>dispatch({type:SetOrUpdatePosts}),
          //getPosts:()=>dispatch(getPostsFromDB())
          // setCredentials:()=>dispatch({type:GetCredentialsFromSessionStorage})

      }
    };
      
export default connect(mapStateToProps,mapDispatchToProps)(App)
// export default App;
