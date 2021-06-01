import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth';

class Navitem extends Component {
    state={tolink:""}
    handleCLick=()=>{
        //this.props.activec.bind(this,this.props.item) 
        this.setState({tolink:'/login'});
    }
    render() {
            
                return (
                    <div>
                       {this.props.authenticated ? 
                        <li id={this.props.item}>
                            <Link to={this.props.tolink} onClick={ this.props.logaut ? this.props.logout :this.handleCLick}>{this.props.item}</Link>
                        </li> 
                        :
                        
                        <li id={this.props.item}>
                            <Link to={this.state.tolink} onClick={this.handleCLick}>{this.props.item}</Link>
                        </li> 
                        }
                    </div>                        
                    )
                
            }
        }
        
        const mapDispatchToProps = dispatch =>{
            return {
                logout:()=>dispatch(actions.logout())
            }
        }
        export default connect(null,mapDispatchToProps)(Navitem)
        