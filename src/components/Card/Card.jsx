import { useEffect, useState } from 'react';
import './card.css';


function Card({ name, imageFront, imageBack, onclick}){

    return (
        <div className="card-container" onClick={()=>onclick(name)}>
            <div className="card">
                <img className="img-front" src={imageFront}/>
                <img className="img-back" src={imageBack}/>
                <div className="card-name">{name}</div>
            </div>
        </div>
    );
}

export default Card;