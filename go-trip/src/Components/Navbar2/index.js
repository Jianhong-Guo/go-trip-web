import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    render() {
        const {currentUser, selectedButton} = this.props
        let postButton = 'button'
        let proposalButton = 'button'
        let personalButton = 'button'
        let adminButton='button'
        if (selectedButton === 'postButton') {
            postButton = 'button buttonSelected'
        }
        if (selectedButton === 'proposalButton') {
            proposalButton = 'button buttonSelected'
        }
        if (selectedButton === 'personalButton') {
            personalButton = 'button buttonSelected'
        }
        if(selectedButton==="adminButton"){
            adminButton='button buttonSelected'
        }
        if(currentUser && currentUser.username==="admin"){
            return (
                <div className='sidebar'>
                <ul>
                    <li>
                        <Link to={'/allposts'}>
                            <button className={postButton}> 
                                📸 Posts Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/allproposals'}>
                            <button className={proposalButton}>
                                👭 Proposals Management
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin'}>
                            <button className={adminButton}>
                                💁‍♀️ Accounts Management
                            </button>
                        </Link> 
                    </li>
                </ul>
                </div>
            )
        }
        else{
            return (
                <div className='sidebar'>
                    <ul>
                        <li>
                            <Link to={'/allposts'}>
                                <button className={postButton}> 
                                    📸 All Posts
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/allproposals'}>
                                <button className={proposalButton}>
                                    👭 All Proposals
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/personalpage'}>
                                <button className={personalButton}>
                                    💁‍♀️ Personal Page
                                </button>
                            </Link> 
                        </li>
                    </ul>
                </div>
            )
        }
    }
}

export default Navbar;
  