import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {withRouter} from "react-router-dom";

const Clan = ({match}) => {
    const [clan,setClan] = useState([]);
    useEffect(()=>{
      axios.get("http://localhost:6600/api/clan/"+id)
      .then((res)=>{
        setClan(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    },[]);
    const {params} = match;
    const {id} = params;
    const _clan = [{...clan}];
    console.log(_clan);
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
        name: "Description",
        selector: "descripcion",
      },
      {
        name: "Trophys",
        selector: "cantidadDeTrofeos",
      }
    ];
    const onClickHanddler = (state) =>{      
            window.location = ('/player/'+state.id)
        }
    return (   
      <div className='table'>  
        <DataTable  
                theme="dark" 
                data={_clan} 
                columns={columns} 
                overflowY
                // onRowClicked={onClickHanddler}
                // highlightOnHover
                /> 
                </div> 
            
    );
}


export default withRouter(Clan);