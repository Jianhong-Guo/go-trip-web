import React from 'react';
import './survey.css';
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import Navbar from '../../Components/Navbar2';
import Headbar from '../../Components/Headbar';
import Footbar from '../../Components/Footbar';
import { editSurvey } from '../../actions/survey';
class Survey extends React.Component {
  constructor(props){
    super(props)
    const app = this.props.app
    const surveyState=app.state.currentUser.survey
    
    this.state={  
      gender:surveyState.gender,
      age: surveyState.age,
      attraction: surveyState.attraction,
      distance: surveyState.distance,
      money: surveyState.money,
      spend: surveyState.spend,
      duration: surveyState.duration,
      time: surveyState.time,
      preferedGender: surveyState.preferedGender,
      preferedAge: surveyState.preferedAge,
      city: surveyState.city
    }
    // this.state={  
    //   gender:"",
    //   age: "",
    //   attraction: "",
    //   distance: "",
    //   money: "",
    //   spend: "",
    //   duration: "",
    //   time: "",
    //   preferedGender: "",
    //   preferedAge: "",
    //   city: ""
    // }

    this.ChangeSurveyState = (event) => {
      const target = event.target;
      const value = target.id;
      const name = target.name;
      this.setState({
       [name]: value 
      });
    };
  
    this.ChangeCityState = (event) => {
      const target = event.target.value;
      this.setState({
        city: target
      });
    };
  }

//   static getDerivedStateFromProps(props, state) {
//     const currentUser=props.app.state.currentUser
//     if(!currentUser){
//       return null
//     }
//     console.log("state")
//     console.log(state)
//     console.log("currentUser")
//     console.log(currentUser)
//     if (currentUser.survey !== state) {
//       return currentUser.survey
//     }
//     return null;
// }
    render(){
      console.log("render")
      const app = this.props.app
      const currentUser = app.state.currentUser
      const surveyState = this.state
      const json = [
           {      name: "gender",
                  title: "1. What is your gender?",
                  choices: [
                      "Female", "Male", "Other", "Prefer no answer"
                    ]
                  },
                  
                  {
                    name: "age",
                    title: "2. How old are you?",
                    choices: [
                        "Less than 18", "18-35", "35-60", "More than 60","Prefer no answer"
                    ]
                },
                  {             
                    name: "attraction",
                    title: "3. What kind of attractions are you most interested in?",
                    choices: [
                        "Natural landscape", "Cultural/heritage attractions", "Recreational place", "Large city", "Small town", "Other", "Prefer no answer"
                    ]
                  },
                   {              
                    name: "distance",
                    title: "4. What distance do you prefer for a trip?",
                    choices: [
                      "International distance", "Domestic  distance", "Long distance", "Short distanc", "Prefer no answer"      
                    ]
                },
                {    
                  name: "money",
                  title: "5. How much money would you prefer to spend on a trip?",
                  choices: [
                    "Less than $500", "$500-$1000", "$1000-$2000", "$2000-$5000", "More than $5000", "Prefer no answer"   
                  ]
              },
                   {        
                    name: "spend",
                    title: "6. What do you think you should spend the most money on for a trip?",
                    choices: [
                      "Food", "Resident", "Tickets", "Shopping", "Transportation", "Other","Prefer no answer"   
                    ]
                },
                { 
                  name: "duration",
                  title: "7. How long do you prefer for a trip?",
                  choices: [  
                      "Less than a day", "2-3 days", "3-5 days", "A week", "Two weeks", "More than two weeks","Prefer no answer"   
                  ]
              },
              {   
                name: "time",
                title: "8. What time do you prefer for a trip?",
                choices: [
                    "Weekday", "Weekend", "Short holiday","Long holiday", "Other", "Prefer no answer"
                ]
            },       
              { 
                name: "preferedGender",
                title: "9. Do you have a preferred gender for your travel partner?",
                choices: [
                  "Female", "Male", "Other", "Prefer no answer"
                ]
            }, 
              {       
                name: "preferedAge",
                title: "10.Do you have a preferred age for your travel partner?",
                choices: [
                  "Less than 18", "18-35", "35-60", "More than 60","Prefer no answer"
                ]
              }
              
            ];

     const questions = json.map((question, key)=>{
       if(key%2!==0){
        return(
          <div className="backgroud">
            <label htmlFor=''>
              <b className="title">{question.title}</b>
              </label>
              <br/>
              {question.choices.map((choice)=>{
                if(surveyState[question.name]===choice){
                  return(
                    <div>
                    <input className="option" type="radio" id={choice} name={question.name} autoComplete='off'
                                      onChange={this.ChangeSurveyState} defaultChecked  />
                <label htmlFor={choice}><span className='space'>{choice}</span></label>
                    </div>        
                  )
                }else{                
                return(
                  <div>
                  <input className="option" type="radio" id={choice} name={question.name} autoComplete='off'
                                    onChange={this.ChangeSurveyState}  />
              <label htmlFor={choice}><span className='space'>{choice}</span></label>
                  </div>        
                )}
              })}
           
         </div>
        )}else{
          return(
            <div>
              <label htmlFor=''>
                <b className="title2">{json[key].title}</b>
                </label>
                <br/>
                {question.choices.map(choice=>{
                if(surveyState[question.name]===choice){
                  return(
                    <div>
                    <input className="option" type="radio" id={choice} name={question.name} autoComplete='off'
                                      onChange={this.ChangeSurveyState} defaultChecked  />
                <label htmlFor={choice}><span className='space'>{choice}</span></label>
                    </div>        
                  )
                }else{                
                return(
                  <div>
                  <input className="option" type="radio" id={choice} name={question.name} autoComplete='off'
                                    onChange={this.ChangeSurveyState}  />
              <label htmlFor={choice}><span className='space'>{choice}</span></label>
                  </div>        
                )}
              })}
           </div>
            )
        }}
      )
      return(
        <div>
         <Headbar currentUser={currentUser}/>
         <Navbar/>
         {/* <div className='sidebar'>
            </div> */}
         <Link to={'/personalpage'} className='cancel2'>
              <Button>
                  Cancel
              </Button>
          </Link>
          <h1 className='header'>Tourism Prefer Survey</h1>

          <div className='surveyQuestions'>
          {questions}
          </div>
      
          <label htmlFor=''>
           
              <b className="title3">11. What is the city that you are most interested in?</b>
              </label>
              <br/>
          <div className = 'left'>
          <select className= "selectType" value={this.state.city} id = "city" onChange={this.ChangeCityState}>
            <option value="Prefer no answe">Prefer no answe</option>
            <option value="Toronto">Toronto</option>
            <option value="Beijing">Beijing</option>
            <option value="Quebec">Quebec</option>
            <option value="Vancouver">Vancouver</option>
            <option value="Hongkong">Hongkong</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Paris">Paris</option>  
          </select>
          </div>
          <div>
          <Link to={'/surveyresult'}>
            <button className='submit' onClick={()=>{
                  editSurvey(app,this.state)

                                }}>
             <span className='submitText'>Submit</span>
            </button>
            </Link>
       
          </div>
          <Footbar/>
        </div>
      )
    }
  }

  export default Survey;