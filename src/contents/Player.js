import axios from 'axios';
import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';

const Player = ({match}) => {

  const[pj,setPj]= useState([]);

    const {params} = match;
    const {id} = params;
    useEffect(()=>{  
      axios.get("http://localhost:6600/api/jugador/"+id)  
           .then((res)=>{  
                
               setPj( res.data)  
           })  
           .catch(err=>{  
               console.log(err)  
           })  
  },[]) 
  const _player = [{...pj}];
  const currentclan = _player[0].clan;
  const tojoin = _player[0].clanesToJoin;
    const columns = [
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
      }
    ];
    const columns2 = [
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
        <DataTable 
              overflowY
              noHeader
                theme="dark" 
                data={_player} 
                columns={columns} 
                /> 
                <DataTable 
              overflowY
               title="Current Clan"
                theme="dark" 
                noDataComponent = "Doesnt belong to a clan"
                data={currentclan} 
                columns={columns2} 
                /> 
                <DataTable 
              overflowY
               title="Clans can join to"
                theme="dark" 
                data={tojoin} 
                columns={columns2} 
                /> 
          </div>
    );
}


export default Player;