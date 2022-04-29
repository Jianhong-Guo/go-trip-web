import React from 'react';
import './survey.css';
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
class SurveyResult extends React.Component {
    
    render(){
      const app = this.props.app
      const currentUser=app.state.currentUser
      return(
        <div>
         <Headbar currentUser={currentUser}/>
          <Navbar currentUser={currentUser} selectedButton = {'personalButton'}/>
          <span className='feedback'>Thank you for filling the survey, and you can check if you get a recommended partner on personal page.</span>
          <Link to={'/personalpage'} className='cancel3'>
            <button className='submit'>
             <span className='submitText'>Back to personal page</span>
            </button>
          </Link>

          <Link to={'/survey'} className='submit2'>
            <button className='submit'>
             <span className='submitText'>View and change survey</span>
            </button>
            </Link>
        </div>

      )
    }
  }

  export default SurveyResult;