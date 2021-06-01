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
import CircularProgress from '@material-ui/core/CircularProgress';


 class FormDialog extends React.Component {
  state = {
    open: true,
    user:'',
    password:'',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.props.history.push('/');
  };

  handleClose = () => {
    this.setState({ open: false});
    this.props.history.push('/');
  }
  handleLogin=()=>{
    const auth = {
      ...this.state
    }
    this.props.onAuth(auth.user,auth.password);
    this.setState({ open: false});
    this.props.history.push('/');
  }
  handleSignup=()=>{
    this.props.history.push('/signup');
  }
  handleuserChange=(event)=>{
    this.setState({user:event.target.value});
  }
  handlepassChange=(event)=>{
    this.setState({password:event.target.value});
  }
  render() {
    let errorMessage = null;
    if( this.props.error){
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }
    return (
      <div>
        {errorMessage}
        {
          this.props.loading ?

          <CircularProgress></CircularProgress>

          :

          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To access to this website, please signup or login if you already have an account
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              required={true}
              onChange={this.handleuserChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              onChange={this.handlepassChange}
              required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={!this.state.user.length>0 || !this.state.password.length>0 } onClick={this.handleLogin} color="primary">
              Login
            </Button>
            <Button onClick={this.handleSignup} color="primary">
              SignUp
            </Button>
          </DialogActions>
        </Dialog>
        }
        
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
    onAuth:(email,password)=>dispatch(actions.authLogin(email,password))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FormDialog));