import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {withRouter} from "react-router-dom";
import CardAux from './CardAux';
import GridList from '@material-ui/core/GridList';
import { Favorite } from '@material-ui/icons';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));

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
    const favCard = _clan[0].cartaFavorita;
    const allmembers = _clan[0].allJugadores;
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
      }
    ];
    const columns3 =[
      {
        name: "NickName",
        selector: "nombre",
      },
      {
        name: "Elixir Cost",
        selector: "costodeElixir",
      },
      {
        name: "Rarity",
        selector: "calidad",
      },
      {
        name: "Descripcion",
        selector: "descripcion",
      },
    ];
    const onClickHanddler = (state) =>{      
            window.location = ('/player/'+state.nombre);
        }
    const onCardHanddler = (state)=>{
      window.location=('/card/'+state.nombre);
    }
    return (   
      <div className='table'>  
        <DataTable  
                theme="dark" 
                data={_clan} 
                columns={columns} 
                /> 
                <DataTable  
                theme="dark" 
                title = "Favorite Cards"
                data={favCard} 
                columns={columns3} 
                onRowClicked={onCardHanddler}
                 highlightOnHover
                /> 
                <DataTable 
                theme="dark" 
                title="Clan Members"
                data={allmembers} 
                columns={columns2}
                defaultSortField="cantidadTrofeos" 
                defaultSortAsc={false}
                overflowY
                 onRowClicked={onClickHanddler}
                 highlightOnHover
                /> 
                </div> 
                
            
    );
}


export default withRouter(Clan);