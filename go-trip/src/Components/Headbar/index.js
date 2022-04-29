import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'

class Headbar extends React.Component {
    render() {
        const {currentUser}=this.props
        if(currentUser){
            if(currentUser.isAdmin===false){
                
            }
            return (
                <div>
                <Link to={'allposts'}>
                <div id="header">
                    <span id='headerTitle'>
                        <span id='rocket'>🚀</span>GoTr<span id='redSign'>📍</span>p 
                    </span>
                </div>
                </Link>
                {currentUser.isAdmin===false ? 
                <Link to={'personalpage'}>
                    <img src={currentUser.image.image_url} className="headbar_image" alt="profile"/>
                </Link>
                :
                <span className='headbar_admin'> {currentUser.username} </span>
                }
                </div>
            )
        }
        else{
            return (
                <div id="header">
                    <span id='headerTitle'>
                        <span id='rocket'>🚀</span>GoTr<span id='redSign'>📍</span>p 
                    </span>
                </div>
                )
        }
    }
}

export default Headbar;