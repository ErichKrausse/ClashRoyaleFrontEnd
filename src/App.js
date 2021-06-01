import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './contents/Home';
import TopPlayers from './contents/TopPlayers';
import TopClans from './contents/TopClans';
import Cards from './contents/Cards';
import ClanWars from './contents/ClanWars';
import Challenges from './contents/Challenges';
import Login from './contents/Login';
import Signup from './contents/Signup';
import Player from './contents/Player';
import Clan from './contents/Clan';
import ClanWar from './contents/ClanWar';
import Challenge from './contents/Challenge';
import Card from './contents/Card';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from './store/actions/auth';


class App extends Component {

componentDidMount(){
  this.props.onTryAutoSignup();
}

render(){
  return (
    <Router>
    <div className="App" >
    <Navbar {...this.props}/>
    <Route exact path="/">
    <Home />
    </Route>
    <Route path="/topplayers/">
    <TopPlayers />
    </Route>
    <Route path="/topclans/">
    <TopClans />
    </Route>
    <Route path="/cards/">
    <Cards />
    </Route>
    <Route path="/challenges/">
    <Challenges />
    </Route>
    <Route path="/clanwars/">
    <ClanWars />
    </Route>
    <Route path="/login">
    <Login  />
    </Route>
    <Route path="/signup">
    <Signup />
    </Route>
    <Route exact path="/player/:id" render={({match})=> <Player match={match}/>}/>
    <Route exact path="/clan/:id" render={({match})=> <Clan match={match}/>}/>
    <Route exact path="/clanwar/:id" render={({match})=> <ClanWar match={match}/>}/>
    <Route exact path="/challenge/:id" render={({match})=> <Challenge match={match}/>}/>
    <Route exact path="/card/:id" render={({match})=> <Card match={match}/>}/>
    </div>
    </Router>
    );
  }
}
  const mapStateToProps = state =>{
    return{
      isAuthenticated:state.token !== null
    }
  }

  const mapDispatchToProps = dispatch =>{
    return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(App);
  