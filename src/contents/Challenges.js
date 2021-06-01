import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {withRouter} from "react-router-dom";
import axios from 'axios';

const Challenges = () => {
    const [challenges,setChallenges] = useState([]);
    useEffect(()=>{
      axios.get("http://localhost:6600/api/desafio")  
      .then((res)=>{  
          setChallenges( res.data)  
      })  
      .catch(err=>{  
          console.log(err)  
      }) 
    },[])
    const columns = [
        {
          name: "Name",
          selector: "nombre",
        },
        {
          name: "Gem Rewards",
          selector: "cantidadDePremios",
        },
        {
          name: "Minimum Level",
          selector: "nivelMinimo",
        },
        {
          name: "Gem Cost",
          selector: "costo",
        }
        ,
        {
          name: "Max Defeats",
          selector: "cantidaddeDerrotas",
        }
        ,
        {
          name: "Duration Time",
          selector: "tiempoDeDuracion",
        }
      ];
      const onClickHanddler = (state) =>{     
        console.log('aki') 
        window.location = ('/challenge/'+state.id)
      }
    return (
      <div className='table'>
        <DataTable 
                 overflowY
                theme="dark" 
                data={challenges} 
                columns={columns} 
                onRowClicked={onClickHanddler}
                highlightOnHover
                />  
        </div>
    )
}

export default withRouter(Challenges);