import React from "react";
import TextField from "@mui/material/TextField"
import { styled } from '@mui/material/styles';
// import "./styles.css";



// customization followed from 
// https://mui.com/components/text-fields/#main-content
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

/* Component for the Input field, a wrapper around MUI TextField */
class Input2 extends React.Component {
  render() {
    const { label, value, onChange, name, errorMessage,onKeyDown } = this.props;
    const extra=this.props.extra;
    if(extra==="multiline"){
      if(errorMessage && errorMessage!==""){
        return (
          <CssTextField
            name={name}
            label={label}
            defaultValue={value || ""}
            className="input2"
            margin="normal"
            onChange={onChange}
            fullWidth
            multiline
            error
            helperText={errorMessage}
            onKeyDown={onKeyDown}
          />
        );
      }
      else{
        return (
          <CssTextField
            name={name}
            label={label}
            defaultValue={value || ""}
            className="input2"
            margin="normal"
            onChange={onChange}
            fullWidth
            multiline
            onKeyDown={onKeyDown}
          />
        );
      }
    }
    if(extra==="password"){
      if(errorMessage && errorMessage!==""){
        return (
          <CssTextField
            name={name}
            label={label}
            defaultValue={value || ""}
            className="input2"
            margin="normal"
            onChange={onChange}
            fullWidth
            type="password"
            error
            helperText={errorMessage}
            onKeyDown={onKeyDown}
          />
        );
      }
      else{
        return (
          <CssTextField
            name={name}
            label={label}
            defaultValue={value || ""}
            className="input2"
            margin="normal"
            onChange={onChange}
            fullWidth
            type="password"
            onKeyDown={onKeyDown}
          />
        );
      }
    }
    if(errorMessage && errorMessage!==""){
      return (
        <CssTextField
          name={name}
          label={label}
          defaultValue={value || ""}
          className="input2"
          margin="normal"
          onChange={onChange}
          fullWidth
          error
          helperText={errorMessage}
          onKeyDown={onKeyDown}
        />
    );
    }
    else{
      return (
          <CssTextField
            name={name}
            label={label}
            defaultValue={value || ""}
            className="input2"
            margin="normal"
            onChange={onChange}
            fullWidth
            onKeyDown={onKeyDown}
          />
      );
    }
  }
}

export default Input2;
