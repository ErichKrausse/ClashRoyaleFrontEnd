import React, { useEffect, useState } from 'react';
import CardAux from './CardAux';
import GridList from '@material-ui/core/GridList';
import axios from 'axios';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const images = importAll(require.context('../img/', false, /\.(png|jpe?g|svg)$/));

const Cards = () => {
    const [cardlist,setCardlist]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:6600/api/carta")
        .then((res)=>{
            setCardlist(res.data);
        })
        .catch((err)=>{
            console.log(err)
        });
    },[]);
    const newCardlist = cardlist.map((card)=>{
        return(<CardAux key={card.nombre} name={card.nombre}  
        rarity={card.calidad}
        elixircost={card.costodeElixir}
        picture={images[card.nombre+'Card.png']}
        description={card.descripcion}/>
        )
    });
    
    return (
        <GridList  children={newCardlist}/>
    )
}

export default Cards;