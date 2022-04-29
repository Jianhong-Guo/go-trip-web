import React from 'react';
import "./style.css"

class Commenter extends React.Component{
    render(){
        const {profilePic,name,comments} = this.props
        return(
            <div className='allComment'>
                <div>
                    <img src={profilePic} className="profilePic2" alt="profile"/>
                </div>
                <div className="commentBlock">
                    <span className='username'> {name} </span>
                    {comments.map((comment,i) =>(
                        <span key={i}> <br/>{comment}</span>
                    ))}
                </div>
            </div>
        )
    }
}

export default Commenter