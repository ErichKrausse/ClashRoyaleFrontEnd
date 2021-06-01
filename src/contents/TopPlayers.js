 
import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import {withRouter} from "react-router-dom";
import axios from 'axios';


class TopPlayers extends Component {
    state = {
        PlayerList: [
            
        ]
    }
    componentDidMount(){
      axios.get("http://localhost:6600/api/jugador")
      .then(response=>{
        this.setState({
        PlayerList:response.data});
      }).catch(err=>{
        console.log(err);
      });
    }
    onClickHanddler = (state) =>{      
        this.props.history.push('/player/'+state.nombre)
    }
    
    render(){
        const pjlist = [...this.state.PlayerList];
        const columns = [
            {
              name: "NickName",
              selector: "nombre",
            },
            {
              name: "Level",
              selector: "nivel",
              sortable:true
            },
            {
              name: "Trophys",
              selector: "cantidadTrofeos",
              sortable:true
            }
          ];
        return (
          <div className='table'>
                <DataTable 
                overflowY
                defaultSortField="cantidadTrofeos"
                defaultSortAsc={false}
                noHeader
                theme="dark" 
                data={pjlist} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />       
          </div>        
        )
    }
}

export default withRouter(TopPlayers);
