import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Search from '../components/Search';
import {connect} from 'react-redux'
import PlayerForm from '../components/PlayerForm';
import ClanForm from '../components/ClanForm';
import WarForm from '../components/WarForm';
import CardForm from '../components/CardForm';
import ChallengeForm from '../components/ChallengeForm';


class Home extends Component {    
    state = {
        crPlayer : [],
        crClan: [],
        crChallenge:[],
        crCard: [],
        crClanWar:[]

    }
    render() {
        const { classes } = this.props;
        let userDetails = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="inputbase"> 
            <h1>
                    <Search type='player'></Search>
                    <Search type='clan'></Search>
                    <Search type='challenge'></Search>
                    <Search type='war'></Search>
                    <Search type='card'></Search>
                    </h1>
                   
                   
                    {
                        userDetails ?
                        userDetails.username==='clashadmin' ?
                        <div className = 'forms'>
                        <PlayerForm  />
                        <ClanForm/>
                        <CardForm />
                        <ChallengeForm />
                        <WarForm />
                        </div>
                        :
                        <p></p>
                        :<p></p>
                        }
                    
                    
            </div>
            )
        }
    }
 
    const mapStateToProps = state =>{
        return{
          isAuthenticated:state.token !== null
        }
      }    
    export default withRouter(connect(mapStateToProps)(Home));
    
