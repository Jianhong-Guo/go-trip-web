import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'

class AdminImageButton extends React.Component {
    render() {
        const src=this.props.src
        const text=this.props.text
        const link_to=this.props.link_to
        const onClick=this.props.onClick
        return(
            <div className="admin_image_button_div">
            <img src={src} className="admin_image_button_img" alt="button"/>
            <div className="admin_image_button_text">
                {text}
            </div>
            <Link to={link_to}>
            <div className="admin_image_button_text_container" onClick={()=>{onClick()}}>
                <div className="admin_image_button_text">{text}</div>
            </div>
            </Link>
            </div>
        )
    }
}

export default AdminImageButton;