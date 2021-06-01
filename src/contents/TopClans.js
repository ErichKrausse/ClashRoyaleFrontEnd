 
import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import {withRouter} from "react-router-dom";
import SimpleTabs from '../components/SimpleTabs';
// import { hexToRgb } from '@material-ui/core/styles';
import axios from 'axios';

class TopClans extends Component {
    state = {
        ClanList: [],
        Africa:[],
        America:[],
        Australia:[],
        Europe:[],
        Asia:[],
    }
    async componentDidMount() {
      const URLs = [ "http://localhost:6600/api/clan", 
      "http://localhost:6600/api/clan/_/region/Asia",
      "http://localhost:6600/api/clan/_/region/Africa",
      "http://localhost:6600/api/clan/_/region/Australia",
      "http://localhost:6600/api/clan/_/region/Europe",
      "http://localhost:6600/api/clan/_/region/America",
    ];
      
      const requests = URLs.map(URL => axios.get(URL).catch(err => null));

      try {
          const [ClanList, Asia,Africa,Australia,Europe,America] = await axios.all(requests);
          this.setState(
              { 
                ClanList:ClanList && ClanList.data,
                Asia:Asia && Asia.data,
                Africa:Africa && Africa.data,
                Australia:Australia && Australia.data,
                Europe:Europe && Europe.data,
                America:America && America.data,
              }
          );
      }
      catch (err) {
          console.log(err.message);
      }
  }
    
    onClickHanddler = (state) =>{             
        this.props.history.push('/clan/'+state.nombre)
    }
    
    render(){
        
        const pjlist = this.state.ClanList ? [...this.state.ClanList] :[];
        const asia = this.state.Asia  ? [...this.state.Asia]:[];
        const africa = this.state.Africa ? [...this.state.Africa]:[];
        const europe =this.state.Europe ?[...this.state.Europe]:[];
        const america = this.state.America ? [...this.state.America]:[];
        const australia = this.state.Australia ?[...this.state.Australia]:[];
        const columns = [
            {
              name: "Clan Name",
              selector: "nombre",
            },
            {
              name: "Type",
              selector: "tipo",
            },
            {
              name: "Region",
              selector: "region",
            },
            {
              name: "Trophys",
              selector: "cantidadDeTrofeos",
              sortable:true
            }
          ];
        return (
          <div className='table'> 
                {/*   */}
                <SimpleTabs tables = {[
                  <DataTable 
                  overflowY
                  noHeader
                  defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
                  theme="dark" 
                  data={pjlist} 
                  columns={columns} 
                  onRowClicked={this.onClickHanddler}
                  highlightOnHover
                   />,
                <DataTable 
                overflowY
                defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
                theme="dark" 
                data={africa} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />,
                <DataTable 
                overflowY
                defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
                theme="dark" 
                data={europe} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />,
                <DataTable 
                overflowY
                defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
                theme="dark" 
                data={asia} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />,
                <DataTable 
                overflowY
                defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
                theme="dark" 
                data={america} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />,
                <DataTable 
                overflowY
                defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
                theme="dark" 
                data={australia} 
                columns={columns} 
                onRowClicked={this.onClickHanddler}
                highlightOnHover
                />,
                ]}/>
            </div>            
        )
    }
}

export default withRouter(TopClans);
