import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
  

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button:{
        margin:theme.spacing.unit
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
  });

class PlayerForm extends React.Component {
  state = {
    open: false,
    name:'',
    lvl:'0',
    wins:'0',
    trophys:'0',
    mxtrophys:'0',
    cards:'0',
    favcard: '',
    clan: ''
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
    const player = {
      nombre:this.state.name,
      nivel: this.state.lvl,
      cantidadVictorias:this.state.wins,
      cantidadTrofeos:this.state.trophys,
      maximoTrofeos:this.state.mxtrophys,
      cantidadCartasEncontradas:this.state.cards,
      cartaPreferidaActual:null,
    };
    axios.post("http://localhost:6600/api/jugador",player)
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
          Create Player
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
              label="Player name"
              type="text"
              className={classes.textField}
              fullWidth
              required
            />
            <TextField
                id="standard-number"
                label="Level"
                value={this.state.lvl}
                onChange={this.handleChange('lvl')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="standard-number"
                label="Wins"
                value={this.state.wins}
                onChange={this.handleChange('wins')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="standard-number"
                label="Max Trophys"
                value={this.state.mxtrophys}
                onChange={this.handleChange('mxtrophys')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="standard-number"
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
            <TextField
                id="standard-number"
                label="Cards Founded"
                value={this.state.cards}
                onChange={this.handleChange('cards')}
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
            <Button disabled = {!this.state.name.length>0}onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
PlayerForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PlayerForm)