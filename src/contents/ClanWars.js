 
import axios from 'axios';
import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import {withRouter} from "react-router-dom";

class ClanWars extends Component {
    state = {
        ClanWarList: [
        ]
    }
    componentDidMount(){
      axios.get("http://localhost:6600/api/guerraDeClanes")
      .then((res)=>{
        console.log(res);
        this.setState({ClanWarList:res.data});
      })
      .catch((err)=>{
        console.log(err);
      });
    }
    onClickHanddler = (state) =>{             
        this.props.history.push('/clanwar/'+state.nombre)
    }
    
    render(){
        const warlist = [...this.state.ClanWarList];
        const columns = [
            {
              name: "War Name",
              selector: "nombre",
            }
          ];
        return (
          <div className='table'>
                <DataTable 
                title='Clan Wars'
                defaultSortField='winner'
                defaultSortAsc={false}
                overflowY
                noHeader
                theme="dark" 
                data={warlist} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />        
            </div>       
        )
    }
}

export default withRouter(ClanWars);
