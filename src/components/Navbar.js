import React, { Component } from 'react';
import Navitem from './Navitem';
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth';
class Navbar extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            'NavItemActive':''
        }
    }
    
    activeitem=(x)=>
    {
        if(this.state.NavItemActive.length>0){
            document.getElementById(this.state.NavItemActive).classList.remove('active');
        }
        this.setState({'NavItemActive':x},()=>{
            document.getElementById(this.state.NavItemActive).classList.add('active');
        });
    };
    render() {
        return (
            
                
            <nav>
            <ul>
            <Navitem item="Home" tolink="/"  authenticated={this.props.isAuthenticated} activec={this.activeitem}></Navitem>
            <Navitem item="Top Players" tolink="/topplayers" authenticated={this.props.isAuthenticated} activec={this.activeitem}></Navitem>
            <Navitem item="Top Clans" tolink="/topclans" authenticated={this.props.isAuthenticated} activec={this.activeitem}></Navitem>
            <Navitem item="Cards" tolink="/cards" authenticated={this.props.isAuthenticated} activec={this.activeitem}></Navitem>
            <Navitem item="Clan Wars" tolink="/clanwars" authenticated={this.props.isAuthenticated} activec={this.activeitem}></Navitem>
            <Navitem item="Challenges" tolink="/challenges"authenticated={this.props.isAuthenticated}  activec={this.activeitem}></Navitem>
            {
               
                this.props.isAuthenticated ? 
                
                <Navitem item="Logout" authenticated={this.props.isAuthenticated} logaut = {true} onClick={this.props.logout} tolink="/"  activec={this.activeitem}></Navitem>
                //<button onClick={this.props.logout}>Logout</button>
                :
                <Navitem item="Login" authenticated={this.props.isAuthenticated} tolink="/login"  activec={this.activeitem}></Navitem>
                
                
            }

            </ul>
            </nav>
        
            )
        }
    }
    
    const mapStateToProps = state =>{
        return{
          isAuthenticated:state.token !== null
        }
      }
      
const mapDispatchToProps = dispatch =>{
    return {
        logout:()=>dispatch(actions.logout())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
    