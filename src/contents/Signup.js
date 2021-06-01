import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth';

const validateEmail = (email) =>{
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const validateUser =(user)=>{
  const chars = /[^0-9a-zA-Z]/.test(user);
  const len = user.length>=6;
  const valid = !chars && len;
  return valid;
}
 class FormDialog extends React.Component {
  state = {
    open: true,
    username:'',
    email:'',
    password1:'',
    password2:'',
    erroremail:false,
    errorpass1:false,
    errorpass2:false,
    erroruser:false,
    notTouchedus:true,
    notTouchedem:true,
    notTouchedps1:true,
    notTouchedps2:true
  };

  handleClose = () => {
    this.setState({ open: false});
    this.props.history.push('/');
  };
  handleLogin = ()=>{
    this.props.history.push('/login');
  }
  handleSignup=()=>{
    const auth = {
      ...this.state
    }

      if(auth.password1!== auth.password2){
          alert("The passwords were not the same, please try again")
      }
      else{
        this.props.onAuth(auth.username,auth.email,auth.password1,auth.password2);
        this.setState({ open: false });
        this.props.history.push('/');
      }

  }
    
  handleuserChange=(event)=>{
    const error = !validateUser(event.target.value);
    this.setState({username:event.target.value,erroruser:error,notTouchedus:false});
  }
  handleemailChange=(event)=>{
    const error = !validateEmail(event.target.value);
    this.setState({email:event.target.value,erroremail:error,notTouchedem:false});
  }
  handlepass1Change=(event)=>{
    const error = event.target.value.length <=8;
    this.setState({password1:event.target.value,errorpass1:error,notTouchedps1:false});
  }
  handlepass2Change=(event)=>{
    const error = event.target.value.length <=8;
    this.setState({password2:event.target.value,errorpass2:error,notTouchedps2:false});
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Signup</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To access to this website, please signup or login if you already have an account
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              error = {this.state.erroruser}
              helperText="Only alphanumeric characters, at least 6"
              type="text"
              fullWidth
              required={true}
              onChange={this.handleuserChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
            error={this.state.erroremail}
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              required={true}
              onChange={this.handleemailChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              error = {this.state.errorpass1}
              helperText="At least 8 characters"
              fullWidth
              required={true}
              onChange={this.handlepass1Change}
            />
          </DialogContent>
           <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Confirm Password"
              type="password"
              error = {this.state.errorpass2}
              helperText="At least 8 characters"
              fullWidth
              required={true}
              onChange={this.handlepass2Change}
            />
          </DialogContent> 
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
            <Button disabled={this.state.erroruser || this.state.erroremail || this.state.errorpass1 || this.state.errorpass2 
            || this.state.notTouchedus || this.state.notTouchedem || this.state.notTouchedps1 || this.state.notTouchedps2} 
            onClick={this.handleSignup} color="primary">
              SignUp
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps =(state)=>{
  return {
    loading:state.loading,
    error:state.error
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onAuth:(username,email,password1,password2)=>dispatch(actions.authSignup(username,email,password1,password2))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FormDialog));