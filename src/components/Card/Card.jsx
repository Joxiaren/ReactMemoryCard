import { useEffect, useState } from 'react';
import './card.css';


function Card({ name, imageFront, imageBack, selected, onclick, state}){

    selected = selected ? 'red' : 'green';
    let cardContainerClass = `card-container ${state}`;
    if(state === 'reveal') cardContainerClass += ` ${selected}`;
    return (
        <div className={cardContainerClass}  onClick={(e)=>{if(state === "")onclick(e, name)}}>
            <div className="card">
                <img className="img-front" src={imageFront}/>
                <img className="img-back" src={imageBack}/>
                <div className="card-name">{name}</div>
            </div>
        </div>
    );
}

export default Card;