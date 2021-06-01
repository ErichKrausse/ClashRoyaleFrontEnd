import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';

const ClanWar = ({match}) => {

  const[war,setWar]= useState([]);
    
    const {params} = match;
    const {id} = params;
    useEffect(()=>{  
      axios.get("http://localhost:6600/api/guerraDeClanes/"+id)  
           .then((res)=>{           
            console.log(res.data);      
               setWar( res.data);  
           })  
           .catch(err=>{  
               console.log(err)  
           })  
  },[]) 
  const _war ={...war};
  console.log(_war.clanes);
  console.log(_war.mejoresJugadores);

  const columns1 = [
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
  const columns2 = [
    {
      name: "NickName",
      selector: "nombre",
    },
    {
      name: "Level",
      selector: "nivel",
    },
    {
      name: "Wins",
      selector: "cantidadVictorias",
    },
    {
      name: "Cards Discovered",
      selector: "cantidadCartasEncontradas",
    },
    {
      name: "Max Trophys",
      selector: "maximoTrofeos",
    },
    {
      name: " Trophys",
      selector: "cantidadTrofeos",
      sorteable:true
    },
    {
      name: "Clan",
      selector: "clan",
    }
  ];
    return (      
      <div className='table'>
          <h1>{id} </h1>
        <DataTable 
              overflowY
                title="Clans"
                theme="dark" 
                data={_war.clanes} 
                columns={columns1} 
                /> 
        <DataTable 
              overflowY
              defaultSortField="cantidadDeTrofeos"
                  defaultSortAsc={false}
              title="Best Players"
                theme="dark" 
                data={_war.mejoresJugadores} 
                columns={columns2} 
                /> 
          </div>
    );
}


export default ClanWar;