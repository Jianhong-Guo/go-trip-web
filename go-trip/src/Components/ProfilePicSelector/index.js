import React from 'react';
import './style.css';

class ProfilePicSelector extends React.Component{
    // help from the following link
    // https://stackoverflow.com/questions/54673206/how-to-read-and-upload-a-file-in-reactjs-using-custom-button
    constructor(props) {
        super(props);
        this.onChange=this.props.on_change;
        this.inputReference = React.createRef();
    }
    fileUploadAction = () =>this.inputReference.current.click();
    render(){
        const {wanted_shape} = this.props
        let shape = 'square'
        let image_shape="square_image"
        if (wanted_shape === 'round') {
            shape = 'round'
            image_shape="round_image"
        }
        if(this.props.image){
            return(
                <div>
                    <input name="image" type="file" hidden ref={this.inputReference} onChange={this.onChange} />
                    <img className={image_shape} src={this.props.image} onClick={this.fileUploadAction} alt=""/>
                    <button className={shape} onClick={this.fileUploadAction}>
                        Upload Picture
                    </button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <input name="image" type="file" hidden ref={this.inputReference} onChange={this.onChange} />
                    <button className={shape} onClick={this.fileUploadAction}>
                        Upload Picture
                    </button>
                </div>
            )
        }
    }
}

export default ProfilePicSelector;
