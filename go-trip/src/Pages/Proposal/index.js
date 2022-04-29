import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import Commenter from '../../Components/Commenter';
import Input2 from '../../Components/Input2';
import { uid } from "react-uid";
import { editProposal,deleteProposal } from '../../actions/proposal';
import { findById } from '../../actions/helper_functions';
class Proposal extends React.Component {

    constructor(props){
        super(props)
        this.state={
            current_comment: '',
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value // [name] sets the object property name to the value of the `name` variable.
        });
      };
    addComment = (app,proposal,current_comment)=>{
        if(current_comment===""){
            return
        }
        const currentUser=app.state.currentUser
        const all_comments=proposal.all_comments
        if(all_comments.length===0 || all_comments[all_comments.length-1].userId !== currentUser._id){
            all_comments.push({userId: currentUser._id,comments: [current_comment],});
        }
        else{
            all_comments[all_comments.length-1].comments.push(current_comment)
        }
        editProposal(app,proposal)
    }
    leaveProposal = (app,proposal)=>{
        const joinedPeople=proposal.joinedPeople
        const newJoinedPeople=joinedPeople.filter((userId)=>{return userId!==app.state.currentUser._id})
        proposal.joinedPeople=newJoinedPeople
        editProposal(app,proposal)
    }
    joinProposal = (app,proposal)=>{
        proposal.joinedPeople.push(app.state.currentUser._id)
        editProposal(app,proposal)
    }

    render() {
        const app=this.props.app
        console.log("proposal page logging")
        console.log(app)
        const proposals=app.state.proposals
        const proposalId=app.state.currentProposalId
        const proposal=findById(proposals,proposalId)
        if(!proposal){
            return (
                "404 not found"
            )
        }
        const title = proposal.title
        const location = proposal.location
        const numPeople = proposal.numPeople
        const additionalInfo = proposal.additionalInfo
        const image_url=proposal.image.image_url
        const joinedPeople = proposal.joinedPeople
        const allUsers=app.state.allUsers
        const user=allUsers[proposal.userId]
        const currentUser=app.state.currentUser
        let edit_proposal_button=null
        let delete_proposal_button=null
        const inJoinedList = joinedPeople.includes(currentUser._id)
        let joinButton=null
        if(inJoinedList){
            joinButton=(
                <button className={'quitButton'} onClick={()=>{this.leaveProposal(app,proposal)}}>
                    'Remove me'
                </button>  
            );
        }
        else{
            joinButton=(
                <button className={'joinButton'} onClick={()=>{this.joinProposal(app,proposal)}}>
                    'I want to join!'
                </button>  
            )
        }
        if(currentUser._id===proposal.userId){
            edit_proposal_button=
            (<Link to={'/editproposal'}>
                <button className='edit_delete'>
                    Edit proposal
                </button>
            </Link>);
            delete_proposal_button=
            (<Link to={'/personalpage'}>
                <button className='edit_delete' onClick={()=>{deleteProposal(app,proposal)}}>
                    Delete proposal
                </button>
            </Link>)
            joinButton=null
        }
        else if(currentUser.isAdmin){
            delete_proposal_button=
            (<Link to={'/allproposals'}>
                <button className='edit_delete' onClick={()=>{deleteProposal(app,proposal)}}>
                    Delete proposal
                </button>
            </Link>)
            joinButton=null
        }
        
        return (
            <div>
                <Headbar currentUser={currentUser}/>
                <Navbar currentUser={currentUser}/>
                
                <div className="allContent">
                    <div>
                        <img src={user.image.image_url} className="profilePic1" alt="profile" />
                    </div>

                    <div className='proposalContent'>
                        <span className='username'>{user.username}</span>
                    
                        <div className='attractionContainer'>
                            <span className='attraction'>
                                {`Title: ${title}`} 
                            </span> <br></br>
                            {edit_proposal_button}
                            {delete_proposal_button}
                        </div>
                        <div className='proposalPicInfo'>
                            <div>
                                <img src={image_url} className="proposalPic" alt="proposal"/>
                            </div>
                            <div className='proposalInfo'> 
                                Location: {location} <br/>
                                Number of People: {numPeople} <br/>
                                Additional Information: {additionalInfo} <br/>
                                <br></br>
                                {joinButton}
                                <div className="joinedListContainer">
                                <ul className='joinedList'>
                                    People who wanna join:
                                    {joinedPeople.map((userId)=>{
                                        return(
                                            <li key={uid(userId)}>{allUsers[userId].username}{': '}{allUsers[userId].email}</li>
                                        )
                                    })}
                                </ul> 
                                </div>
                            </div>
                        </div>

                        <div className="commentContainer">
                            <span> Comments: </span>
                            {proposal.all_comments.map(x =>(
                                <Commenter 
                                key={uid(x)}
                                profilePic={app.state.allUsers[x.userId].image.image_url} 
                                name={app.state.allUsers[x.userId].username} 
                                comments={x.comments} 
                                />
                            ))}
                            
                            {currentUser.isAdmin===false ? 
                                <div className='inputSubmit'>
                                    <Input2
                                        name="current_comment"
                                        value={this.state.current_comment}
                                        onChange={this.handleInputChange}
                                        label="comment"
                                    />
                                    <Button onClick={()=>{this.addComment(app,proposal,this.state.current_comment)}}>
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

export default Proposal;