import React, { useEffect, useState } from 'react';
import CardAux from './CardAux';
import axios from 'axios';


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));

const Card = (props) => {
    const {params} = props.match;
    const {id} = params;
    const [chosenCard,setCard]=useState([]);
    useEffect(()=>{
      axios.get("http://localhost:6600/api/carta/"+id)
      .then((res)=>{
        setCard(res.data);
      })
      .catch((err)=>{
          console.log(err)
      });
    },[]);

    return (
      <div className='home'>
          <CardAux 
          key={chosenCard.nombre}
          name={chosenCard.nombre}
          //type={chosenCard.type}
          rarity={chosenCard.calidad}
          elixircost={chosenCard.costodeElixir}
          picture={images[chosenCard.nombre+'Card.png']}
          description={chosenCard.descripcion}/>
      </div>
    )
}

export default Card;