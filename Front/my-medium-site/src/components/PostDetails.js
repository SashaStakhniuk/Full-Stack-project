import React, { Component } from "react";
import {connect} from "react-redux"

class PostDetails extends Component
{
    constructor(props){
        super(props)
        this.getPost=this.getPost.bind(this)
        this.getRelatedPosts=this.getRelatedPosts.bind(this)
        this.likePost=this.likePost.bind(this)
        this.dislikePost=this.dislikePost.bind(this)
        this.getLikes=this.getLikes.bind(this)
        this.checkingUserPostLiked=this.checkingUserPostLiked.bind(this)

        this.getPostById="https://localhost:44361/api/useractions/GetPostById/"
        this.getRelatedPostsByTheme="https://localhost:44361/api/useractions/GetPostsByTheme/"

        this.state={
            mainArticle:[],
            relatedPosts:[],
            liked:false,
            disliked:false,
            postLikesCount:0,
            postDislikesCount:0
        }
    }
    async componentDidMount(){
        await this.getPost(this.props.match.params.id);
        this.getRelatedPosts(this.state.mainArticle.theme)
        // this.getLikes();
    }
    componentDidUpdate()
    {
        // this.getLikes();
    }
    async checkingUserPostLiked(){
        const model={
            postId:this.state.mainArticle.postsId,
            userId: this.props.credentials.userId
        }
      const response =  await fetch("https://localhost:44361/api/useractions/CheckingUserPostLiked",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.credentials.tokenKey
            },
            body:JSON.stringify(model)

        });

        const data = await response.json();
        // console.log(data.message)
        if(response.ok===true)
        {
            if(data.message==="liked")
            {
                this.setState({
                    liked:true,
                    disliked:false
                })
            }
            else{
                this.setState({
                    liked:false,
                    disliked:true
                })
            }
        }
    }
    getLikes= async function(){
        const model={
            PostId:this.state.mainArticle.postsId
        }
        const response = await fetch("https://localhost:44361/api/useractions/GetPostLikesAndDislikesCount",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.credentials.tokenKey
            },
            body:JSON.stringify(model)
        })
        const data = await response.json()
         console.log(data)
        if(response.ok===true){
            this.setState({              
                postLikesCount:data.likesCount,
                postDislikesCount:data.dislikesCount
            });
        }
        else
        {
            this.setState({              
                postLikesCount:data.likesCount,
                postDislikesCount:data.dislikesCount
            }) 
        }
        this.checkingUserPostLiked();
    }
    getPost = async function(id){
        const response=await fetch(this.getPostById+id)
        // console.log(response)
        const result = await response.json()
        if (response.ok === true) {
            this.setState({
                mainArticle:result
            },()=>this.getLikes())
            // console.log(result)
        }
        else{
            console.log("error"+result)
        }
    }
    getRelatedPosts = async function(theme){
        const response=await fetch(this.getRelatedPostsByTheme+theme)
        // console.log(response)
        const result = await response.json()
        if (response.ok === true) {
            this.setState({
                relatedPosts:result
            })
            console.log(result)
        }
        else{
            console.log("error"+result)
        }
    }
    likePost=async function(postId)
    {
        const datas={
            userId:this.props.credentials.userId,
            postId
        }
    //    console.log(this.props.credentials)
        const response = await fetch("https://localhost:44361/api/useractions/LikePost",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.credentials.tokenKey
            },
            body:JSON.stringify(datas)
        })
        const data = await response.json()
        // console.log(response)
        console.log(data);

        if(response.ok===true){
            this.setState({
                liked: true,
                disliked:false,
                postLikesCount:data.likesCount,
                postDislikesCount:data.dislikesCount
            });//,()=>console.log(this.state.postLikesCount))
            // console.log(data)
        }
        else
        {
            this.setState({
                liked: false,
                disliked:false,
                postLikesCount:data.likesCount,
                postDislikesCount:data.dislikesCount
            }) 
        }
    }
    dislikePost=async function(postId)
    {
        const datas={
            userId:this.props.credentials.userId,
            postId
        }
       console.log(this.state.postLikesCount)
        const response = await fetch("https://localhost:44361/api/useractions/DislikePost",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.credentials.tokenKey
            },
            body:JSON.stringify(datas)
        })
        const data = await response.json()
            console.log(data);
        if(response.ok===true){
            this.setState({
                liked: false,
                disliked:true,
                postDislikesCount:data.dislikesCount,
                postLikesCount:data.likesCount
            })
            // console.log(data)
        }
        else{
            this.setState({
                liked: false,
                disliked:false,
                postDislikesCount:data.dislikesCount,
                postLikesCount:data.likesCount
            }) 
        }
    }
    render(){
        var likeColor=this.state.liked? "red" : "currentColor";
        var dislikeColor=this.state.disliked? "red" : "currentColor";
        return(

            <div>
                {/* {this.state.posts.map(post=> */}
                <div className="container text-center" style={{marginTop:"10px"}}>
                    <div style={{marginBottom:"20px"}}>
                        <div className="text-center">
                            <h2>{this.state.mainArticle.header}</h2>
                        </div>
                        <div className="text-center">
                            <h4 style={{color:"gray"}}>{this.state.mainArticle.description}</h4>
                        </div>
                        <div className="w-100">
                            <img className="rounded mb-2 w-50 text-center" src={this.state.mainArticle.postPhoto} alt="..."></img>
                            <div className="text-center" style={{textAlign:'justify',maxWidth:"100vw",overflowX:"hidden"}}>
                                {this.state.mainArticle.article}
                            </div>
                        </div>
                        <div className="card-footer" >
                            <div style={{display:"flex",alignItems:"center"}}>
                                <button className="btn"  onClick={()=> this.likePost(this.state.mainArticle.postsId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={likeColor} class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z"/>
                                    </svg>
                                </button>
                               
                                <h5>{this.state.postLikesCount}</h5>

                                <button className="btn" onClick={()=>this.dislikePost(this.state.mainArticle.postsId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={dislikeColor} class="bi bi-emoji-expressionless" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </button>
                                
                                <h5>{this.state.postDislikesCount}</h5>
                            </div>


                        </div>
                    </div>
                </div>
                {/* )} */}
                <hr/>
                <div className="text-center">
                    <h4>Related articles</h4>
                </div>
                <hr/>

                <div id="carouselExampleControlsNoTouching" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">

                        {this.state.relatedPosts.map((relatedPost,index)=>
                            index===1?
                            <div class="carousel-item active" data-bs-interval="2000">
                                <div class="w-100 text-center">
                                    <h5>{relatedPost.header}</h5>
                                    <p>{relatedPost.description}</p>
                                </div>
                                <div className="text-center" style={{width:"100%"}}>
                                    <a href={"/posts/"+relatedPost.postsId} style={{textDecoration:"none",color:"black",cursor:"unset"}}>
                                        <img src={relatedPost.postPhoto} class="rounded" style={{width:"80%"}} alt="..."/>
                                    </a>
                                </div>
                               
                            </div>
                            :
                            <div className="carousel-item" data-bs-interval="2000">
                                <div className="w-100 text-center">
                                    <h5>{relatedPost.header}</h5>
                                    <p>{relatedPost.description}</p>
                                </div>
                                <div className="text-center" style={{width:"100%"}}>
                                    <a href={"/posts/"+relatedPost.postsId} style={{textDecoration:"none",color:"black",cursor:"unset"}}>
                                        <img src={relatedPost.postPhoto} className="rounded" style={{width:"80%"}} alt="..."/>
                                    </a>
                                </div>                                
                            </div>
                        )}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
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
export default connect(mapStateToProps)(PostDetails)

// export default PostDetails;