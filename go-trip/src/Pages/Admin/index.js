import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'
import { uid } from 'react-uid';
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import AdminImageButton from '../../Components/AdminImageButton';
import Grid from "@mui/material/Grid"
import { changeStatus } from '../../actions/user';
import { logout } from '../../actions/user';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.props.history.push("/admin");
      }

    showText = (status)=>{
        if (status === 'frozen') {
            return 'Click to unfreeze'
        } else {
            return 'Click to freeze'
        }
    }

    freeze_or_unfreeze = (userId, user) => {
        // console.log(userId)
        if (user.status === 'frozen') {
            const newStatus = "unfrozen"
            user.status = newStatus
            changeStatus(userId, newStatus)
        } else {
            const newStatus = "frozen"
            user.status = newStatus
            changeStatus(userId, newStatus)
        }
    }
 
  render() {
    const app=this.props.app
    const currentUser=app.state.currentUser
    const users=app.state.allUsers
    console.log(users)
    return (
        <div>
            <Headbar currentUser={currentUser}/>
            <Navbar currentUser={currentUser} selectedButton = {'adminButton'}/>
            <div className="personal_page_container">
            <div className='personalPageComponent'>
                <span className='personalPageSubtitle'>Freeze or Unfreeze Accounts     </span>
            </div>
            <Grid container>
                {Object.keys(users).filter(key=>users[key].isAdmin===false).map((key)=>{ // key is user._id
                    const user=users[key]
                    return(
                        <Grid item xs={12} key={uid(user)}>
                        
                        <AdminImageButton link_to={"admin"} src={user.image.image_url} text={this.showText(user.status)} onClick={()=>this.freeze_or_unfreeze(key, user)}/>
                        <div className="userInformation">
                        <span> username:  {user.username} </span>
                        <br/>
                        <span> email:  {user.email} </span>
                        <br/>
                        <span> location:  {user.location} </span>
                        <br/>
                        <span> status:  {user.status} </span>
                        </div>
                        </Grid>
                    )
                    })}
            </Grid>
        
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
export default Admin;