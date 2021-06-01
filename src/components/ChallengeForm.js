import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';


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

class ChallengeForm extends React.Component {
  state = {
    open: false,
    name:'',
    lost:'3',
    cost:'0',
    award:'10',
    lvl:'1',
    descr:'',
    expirationDate:'1',
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
    this.setState({ [name]: v });
  };

  handleCreate = (event)=>{
    event.preventDefault();
    const t=new Date(new Date().getTime()+this.state.expirationDate*3600*1000);
    const challenge = {
      nombre:this.state.name,
      costo: this.state.cost,
      cantidadDePremios:this.state.award,
      nivevlMinimo:this.state.lvl,
      cantidaddeDerrotas:this.state.lost,
      descripcion:this.state.descr,
      tiempoDeDuracion:t
      //cartaFavorita:this.state.favcard,
    };
    console.log(challenge);
    axios.post("http://localhost:6600/api/desafio",challenge)
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
          Create Challenge
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
              label="Challenge name"
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
                id="expiration"
                label="Duration Time"
                value={this.state.expirationDate}
                onChange={this.handleChange('expirationDate')}
                type="number"
                className={classes.textField}
                helperText="In hours"
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="award"
                label="Gem Awards"
                value={this.state.award}
                onChange={this.handleChange('award')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
              <TextField
                id="lost"
                label="Max Losts"
                value={this.state.lost}
                onChange={this.handleChange('lost')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="cost"
                label="Gem Cost"
                value={this.state.cost}
                onChange={this.handleChange('cost')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="lvl"
                label="Min Level"
                value={this.state.lvl}
                onChange={this.handleChange('lvl')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} disabled = {!this.state.name.length>0 }color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
ChallengeForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ChallengeForm)