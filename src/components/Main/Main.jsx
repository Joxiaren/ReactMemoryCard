import { useEffect, useState } from 'react';

import './main.css';
import config from '../../../conifg.json';

import Card from '../Card/Card';
import shuffleArray from '../../scripts/shuffle';


function Main({ gameName }){

    const [cards, setCards] = useState([]);

    useEffect(() => {
        console.log(`gameName ${gameName}`);
        fetch(`${config.localApiAddress}/bossInfo/${gameName}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCards(shuffleCards(json));
        });

        return () => {
            setCards([]);
        }
    }, [gameName])

    let cardClick = (e) => {
        console.log('clicked');
        console.log(cards);
        //animation
        setCards(shuffleCards([...cards]));
    }   

    return (
        <main>
            {
            cards.map((card) => (
                <Card key={card.name} name={card.name} imageFront={`${config.localApiAddress}/${card.image}`} imageBack={`/covers/${gameName}.jpg`} onclick={cardClick}/>
            ))}
        </main>
    );
}

function shuffleCards(cards){
    shuffleArray(cards, 10);
    return cards;
}
export default Main;
