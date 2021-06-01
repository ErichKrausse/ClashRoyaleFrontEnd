import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, MenuItem, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

let clans =[]; 
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    selector: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
    formControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button:{
        margin:theme.spacing.unit
    },
  });

class WarForm extends React.Component {
  state = {
    open: false,
    name:'',
    clans:0,
    clan1:'',
    clan2:'',
    clan3:'',
    clan4:'',
    clan5:'',
    ClanList:[],
    newclanlist:[]
  };
  componentDidMount(){
    axios.get("http://localhost:6600/api/clan")
    .then(response=>{
      this.setState({
      ClanList:response.data});
    }).catch(err=>{
      console.log(err);
    });
  }
  handleChange = name => event => {
      let v = event.target.value;
      const n = parseInt(event.target.value);
     
      if (!isNaN(n))
      {
        v = n;
        if(v<0){
            v=0
        }
      }
    this.setState({ [name]: v });
  };
  handleClanSelect = name=>event=>{
    let newclans = [...this.state.newclanlist];
    for( var i = 0; i < clans.length; i++){        
        if ( clans[i].nombre === event.target.value) {     
            newclans.push(clans[i]); 
        }
    }   
    this.setState({[name]:event.target.value,newclanlist:newclans,clans:this.state.clans+1});
  };
  handleCreate = (event)=>{
    event.preventDefault();
    const clanes =[...this.state.newclanlist];
    const war = {
      nombre:this.state.name,
      clanes:clanes,
      //mejoresJugadores:null
    };
    axios.post("http://localhost:6600/api/guerraDeClanes",war)
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    });
    this.setState({ open: false});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    clans = [...this.state.ClanList];
    return (
      <div>
        <Button className={classes.button} variant="contained" color="secondary" onClick={this.handleClickOpen}>
          Create War
        </Button>
        <Dialog
        maxWidth='md'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <form className={classes.container}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.name}
              onChange={this.handleChange('name')}
              label="War name"
              type="text"
              className={classes.textField}
              fullWidth
              required
            />           
            <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="clan1-simple">Clan1</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.clan1}
            onChange={this.handleClanSelect('clan1')} >
            {clans.map((cl)=>{
                if (!this.state.newclanlist.includes(cl)){
                return  <MenuItem value={cl.nombre}>{cl.nombre}</MenuItem>}
            })}
          </Select>
          </FormControl>
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="clan1-simple">Clan2</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.clan2}
            onChange={this.handleClanSelect('clan2')} >
            {clans.map((cl)=>{
                if (!this.state.newclanlist.includes(cl)){
                    return  <MenuItem value={cl.nombre}>{cl.nombre}</MenuItem>}
            })}
          </Select>
          </FormControl>
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="clan3-simple">Clan3</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.clan3}
            onChange={this.handleClanSelect('clan3')} >
            {clans.map((cl)=>{
                if (!this.state.newclanlist.includes(cl)){
                    return  <MenuItem value={cl.nombre}>{cl.nombre}</MenuItem>}
            })}
          </Select>
          </FormControl>
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="clan4-simple">Clan4</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.clan4}
            onChange={this.handleClanSelect('clan4')} >
            {clans.map((cl)=>{
                if (!this.state.newclanlist.includes(cl)){
                    return  <MenuItem value={cl.nombre}>{cl.nombre}</MenuItem>}
            })}
          </Select>
          </FormControl>
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="clan5-simple">Clan5</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.clan5}
            onChange={this.handleClanSelect('clan5')} >
            {clans.map((cl)=>{
                if (!this.state.newclanlist.includes(cl)){
                    return  <MenuItem value={cl.nombre}>{cl.nombre}</MenuItem>}
            })}
          </Select>
          </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} disabled = {!this.state.name.length>0 || !this.state.clans>1} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
WarForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(WarForm)