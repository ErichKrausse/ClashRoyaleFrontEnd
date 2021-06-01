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

const regions = [
    { label: 'America' },
    { label: 'Australia' },
    { label: 'Europe' },
    { label: 'Africa' },
    { label: 'Asia' }
  ];
  const types = [
    { label: 'Invitation only' },
    { label: 'Open' },
  ];
  

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

class ClanForm extends React.Component {
  state = {
    open: false,
    name:'',
    type:'',
    members:'0',
    trophys:'0',
    region:'',
    descr:'',
    favcard: '',
    award: ''
  };

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
      console.log(this.state.trophys);
    this.setState({ [name]: v });
  };

  handleCreate = (event)=>{
    event.preventDefault();
    const clan = {
      nombre:this.state.name,
      tipo: this.state.type,
      region:this.state.region,
      cantidadDeTrofeos:this.state.trophys,
      trofeos:this.state.award,
      descripcion:this.state.descr,
      cantidadDeMiembros:0,
      cartaFavorita:null,
    };
    console.log(clan);
    axios.post("http://localhost:6600/api/clan",clan)
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
    return (
      <div>
        <Button className={classes.button} variant="contained" color="secondary" onClick={this.handleClickOpen}>
          Create Clan
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
              label="Clan name"
              type="text"
              className={classes.textField}
              fullWidth
              required
            />
            <TextField
                id="description"
                label="Description"
                value={this.state.descr}
                onChange={this.handleChange('descr')}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="award"
                label="Award"
                value={this.state.award}
                onChange={this.handleChange('award')}
                type="text"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />

            <TextField
                id="trophys"
                label="Trophys"
                value={this.state.trophys}
                onChange={this.handleChange('trophys')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="region-simple">Select Region</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.region}
            onChange={this.handleChange('region')} >
            {regions.map((reg)=>{
                return <MenuItem value={reg.label}>{reg.label}</MenuItem>
            })}
          </Select>
          </FormControl>
          <FormControl className={classes.FormControl}>
            <InputLabel htmlFor="type-simple">Type</InputLabel>
            <Select  
            className={classes.selector}    
            value={this.state.type}
            onChange={this.handleChange('type')} >
            {types.map((type)=>{
                return  <MenuItem value={type.label}>{type.label}</MenuItem>
            })}
          </Select>
          </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} disabled = {!this.state.name.length>0 || !this.state.region.length>0||!this.state.type.length>0} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
ClanForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClanForm)