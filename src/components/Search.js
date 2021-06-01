import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const styles = {
  root: {
    position:'relative',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 0,
    marginBottom: '10%',
    width: 'auto',
    maxWidth:400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function CustomizedInputBase(props) {
  const { classes } = props;
  const [value,setValue]=useState('');
  const changePathHandler =()=>{
    window.location=('/'+props.type+'/'+value);
    }
  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase value ={value} onChange={(e)=>{setValue(e.target.value)}}className={classes.input} placeholder={"Search "+props.type} />
      <IconButton onClick={()=>changePathHandler()}className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
    </Paper>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);
