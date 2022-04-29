import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import './style.css';
import ImageButton from '../../Components/ImageButton';
import Grid from "@mui/material/Grid"
import { uid } from 'react-uid';
import { logout } from '../../actions/user';
// import { getAllProposals } from '../actions/proposal';
// import { getAllPosts } from '../actions/post';
import { getAllProposals,setCurrentProposal } from '../../actions/proposal';
import { getAllPosts } from '../../actions/post';
import { setCurrentPost } from '../../actions/post';
class PersonalPage extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push("/personalpage");
  }
  // componentDidMount(){
  //   getAllProposals(this.props.app)
  //   getAllPosts(this.props.app)
  // }
  

  render() {
    console.log("PersonalPage render")
    console.log(this.props.app.state)
    const app=this.props.app
    const currentUser=app.state.currentUser
    const myProposals=app.state.proposals.filter((proposal)=>{return proposal.userId===currentUser._id})
    const myPosts=app.state.posts.filter((post)=>{return post.userId===currentUser._id})
    const joinedProposals=app.state.proposals.filter((proposal)=>{return proposal.joinedPeople.includes(currentUser._id) && proposal.userId !== currentUser._id})
    const users =Object.values(app.state.allUsers)

    const  printProposals= (myProposals)=>{
      if (myProposals.length===0){
        return(
        <div className='recommendNames'>No proposals, please add one.</div>)
      }
    }
    const  printPosts= (myPosts)=>{
      if (myPosts.length===0){
        return(
        <div className='recommendNames'>No posts, please add one.</div>)
      }
    }
    const printJoinedProposals= (joinedPeople)=>{
      if (joinedPeople.length===0){
        return(
        <div className='recommendNames'>You haven't joined a proposal. Please go to all proposals to join one.</div>)
      }
    }
    const numEqual=(user1,user2)=>{
      let sum=0
      const questions=["gender","age","attraction","distance","money","spend", "duration",
      "time","preferedGender", "preferedAge", "city"]
      const isAnswerEqual=(answer1,answer2)=>{
        return answer1 ===answer2 && answer1!=='' && answer1!=='Prefer no answer'
      }
      const questionMap=(question)=>{
        if(question!=='age' && question!=='gender'){
          if(isAnswerEqual(user1.survey[question],user2.survey[question])){
            sum +=1
          }
        }
        else if(question==='age'){
          if(isAnswerEqual(user1.survey['age'],user2.survey['preferedAge'])){
            sum+=1
          }
        }
        else{
          if(isAnswerEqual(user1.survey['gender'],user2.survey['preferedGender'])){
            sum+=1
          }
        }
      }
      questions.map(questionMap)
      return sum
    }

    const recommend=(users, currentUser)=>{
      console.log("recommend")
      console.log("allUsers values")
      console.log(users)
      console.log("currentUser")
      console.log(currentUser)
      const filteredUsers = users.filter((user)=>{
        return user.email!== currentUser.email;     
      })
      const userInfos=[]
      for(let i=0;i<filteredUsers.length;i++){
        const user2=filteredUsers[i]
        const num=numEqual(currentUser,user2)
        if(num>3){
          const name_email = user2.username+": "+user2.email
          userInfos.push(name_email)
        }
      }

      if(userInfos.length===0){
        return(
        <div className='recommendNames'>No matching, please fill/change the matching survey in order to get matching partners.</div>
        )
      }
      else{
        return(
          <div className='recommendUserNames'>{userInfos.join(", ")}</div>
        )
      }
    }
     

    return (
    <div>
      <Headbar currentUser={currentUser}/>
      <Navbar selectedButton = {'personalButton'}/>
      <div className="personal_page_container">
        <div className='personalPageComponent'>
          <span className='personalPageSubtitle'>Proposals     </span>
          <Link to={'/UploadProposal'}>
              <button className='personalPageAdd'>
                  Add proposal
              </button>
          </Link>
        </div>
        {printProposals(myProposals)}
        <Grid container spacing={1}>
          {myProposals.map((proposal)=>{
            return(
              <Grid item xs={4}>
                <ImageButton
                src={proposal.image.image_url}
                text={proposal.title}
                link_to={"/proposal"}
                onClick={()=>{setCurrentProposal(app,proposal)}}
                />
              </Grid>
            )
          })}
        </Grid>
        <div className='personalPageComponent'>
          <span className='personalPageSubtitle'>Posts    </span>
          <Link to={'/UploadPost'}>
              <button className='personalPageAdd'>
                  Add post
              </button>
          </Link>
        </div>
        {printPosts(myPosts)}
        <Grid container>     
          {myPosts.map((post)=>{
            return(
              <Grid item xs={4}>
                <ImageButton
                src={post.image.image_url} 
                text={post.title} 
                link_to={"/post"} 
                onClick={()=>{setCurrentPost(app,post)}}
                />
              </Grid>
            )
          })}
        </Grid>
        <div className='personalPageComponent'>
          <span className='personalPageSubtitle'>Joined Proposals</span>
        </div>
        {printJoinedProposals(joinedProposals)}
        <Grid container>
          {joinedProposals.map((proposal)=>{
            return(
              <Grid item xs={4} key={uid(proposal)}>
                <ImageButton
                src={proposal.image.image_url}
                text={proposal.title}
                link_to={"/proposal"}
                onClick={()=>{setCurrentProposal(app,proposal)}}
                />
              </Grid>
            )
          })}
        </Grid>
        <div className='personalPageComponent'>
          <span className='personalPageSubtitle'>Partner Recommendation: </span>
        </div>
                  {/* {UserAccounts} */}
        {recommend(users, currentUser)}


        <Link to={'/survey'}>
          <button className='fillSurvey'>
              Fill the travelling matching survey
          </button>
        </Link> 
        <Link to={'/'}>
            <button className='logOutButton' onClick={()=>{logout(app)}}>
                Log out
            </button>
        </Link>
      </div>
      <Footbar/>
    </div>

    )

  }
}
 
export default PersonalPage;