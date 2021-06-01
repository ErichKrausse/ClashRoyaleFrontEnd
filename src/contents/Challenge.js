import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Challenge = (match) => {
  
  const [challenge,setChallenge]=useState([]);
    const {params} = match.match;
    const {id} = params;
    useEffect(()=>{
      axios.get("http://localhost:6600/api/desafio/"+id)  
      .then((res)=>{             
          setChallenge( res.data)  
      })  
      .catch(err=>{  
          console.log(err)  
      }) 
    },[]);
    const columns = [
        {
            name: "ID",
            selector: "id",
        },
        {
          name: "Name",
          selector: "name",
        },
        {
          name: "Gem Rewards",
          selector: "gemReward",
        },
        {
          name: "Minimum Level",
          selector: "minlevel",
        },
        {
          name: "Gem Cost",
          selector: "gemcost",
        }
        ,
        {
          name: "Max Defeats",
          selector: "maxdefeats",
        },
        {
          name: "Duration Time",
          selector: "durationtime",
        }
      ];
    return (
      <div className='table'>
        <DataTable 
                overflowY
                theme="dark" 
                data={challenge} 
                columns={columns} 
                highlightOnHover
                />  
      </div>
    )
}

export default Challenge;