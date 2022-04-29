import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Input2 from "../../Components/Input2"
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import Commenter from '../../Components/Commenter';
import { uid } from "react-uid";
// import { addComment } from '../../actions/helper_functions';
import { findById, handleInputChange } from '../../actions/helper_functions';
import { editPost,deletePost } from '../../actions/post';

class Post extends React.Component {

    constructor(props){
        super(props)
        this.state={
            current_comment: '',
        }
        this.handleInputChange=(e)=>{handleInputChange(this,e)};
    }
    addComment = (app,post,current_comment)=>{
        if(current_comment===""){
            return
        }
        const currentUser=app.state.currentUser
        const all_comments=post.all_comments
        if(all_comments.length===0 || all_comments[all_comments.length-1].userId !== currentUser._id){
            all_comments.push({userId: currentUser._id,comments: [current_comment],});
        }
        else{
            all_comments[all_comments.length-1].comments.push(current_comment)
        }
        editPost(app,post)
    }
    render() {
        const app=this.props.app
        console.log("proposal page logging")
        console.log(app)
        const posts=app.state.posts
        const postId=app.state.currentPostId
        const post=findById(posts,postId)
        if(!post){
            return (
                "404 Not Found"
            )
        }
        const title=post.title
        const content=post.content
        const location=post.location
        const image_url=post.image.image_url
        const user=app.state.allUsers[post.userId]
        const currentUser=app.state.currentUser
        let edit_post_button=null
        let delete_post_button=null
        if(currentUser._id===post.userId){
            edit_post_button=
            (<Link to={'/editpost'}>
                <button className='edit_delete'>
                    Edit post
                </button>
            </Link>)
            delete_post_button=
            (<Link to={'/personalpage'}>
                <button className='edit_delete' onClick={()=>{deletePost(app,post)}}>
                    Delete post
                </button>
            </Link>)
        }
        else if(currentUser.isAdmin){
            delete_post_button=
            (<Link to={'/allposts'}>
                <button className='edit_delete' onClick={()=>{deletePost(app,post)}}>
                    Delete post
                </button>
            </Link>)
        }
        return (
            <div>
                <Headbar currentUser={currentUser}/>
                <Navbar currentUser={currentUser}/>
                
                <div className="allContent">
                    <div>
                        <img src={user.image.image_url} className="profilePic1" alt="profile"/>
                    </div>

                    <div className='postContent'>
                        <span className='username'>{user.username}</span>
                        <br></br>
                        <div className='postTitleContainer'>
                            <span className='postTitle'> 
                                {title}
                            </span> <br></br>
                            {edit_post_button}
                            {delete_post_button}
                        </div>
                        <div>
                            <img src={image_url} className="postPic" alt="post"/>
                        </div>
                        <p className='content'>
                            Location: {location}<br/>
                            { content }
                        </p>
                        <div className="commentContainer">
                            <span> Comments: </span>
                            {post.all_comments.map(x =>(
                                <Commenter 
                                key={uid(x)} 
                                profilePic={app.state.allUsers[x.userId].image.image_url} 
                                name={app.state.allUsers[x.userId].username} 
                                comments={x.comments}/>
                            ))}
                            {currentUser.isAdmin===false ? 
                                <div className='inputSubmit'>
                                    <Input2
                                        name="current_comment"
                                        value={this.state.current_comment}
                                        onChange={this.handleInputChange}
                                        label="comment"
                                    />
                                    <Button onClick={()=>{this.addComment(app,post,this.state.current_comment)}}>
                                        Submit
                                    </Button>
                                </div>
                                :
                                <span> </span>
                            }
                        </div>
                    </div>
                </div>
                <Footbar/>
            </div>
        )
    }
}

export default Post;