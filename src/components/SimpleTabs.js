import React from 'react';
import PropTypes from 'prop-types';
import { hexToRgb,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: hexToRgb('#444444'),
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log(this.props)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="All" />
            <Tab label="Africa" />
            <Tab label="Europe"/>
            <Tab label="Asia"/>
            <Tab label="America"/>
            <Tab label="Australia"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{this.props.tables[value]}</TabContainer>}
        {value === 1 && <TabContainer>{this.props.tables[value]}</TabContainer>}
        {value === 2 && <TabContainer>{this.props.tables[value]}</TabContainer>}
        {value === 3 && <TabContainer>{this.props.tables[value]}</TabContainer>}
        {value === 4 && <TabContainer>{this.props.tables[value]}</TabContainer>}
        {value === 5 && <TabContainer>{this.props.tables[value]}</TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);