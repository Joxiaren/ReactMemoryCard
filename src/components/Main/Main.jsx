import { useEffect, useState } from 'react';

import './main.css';
import config from '../../../conifg.json';

import Card from '../Card/Card';
import shuffleArray from '../../scripts/shuffle';

let selectedCards = {};
let winCondition = false;
function Main({ gameName }){

    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    
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

    let cardClick = (card) => {
        console.log('clicked');
        //animation
        if(card in selectedCards){
            selectedCards = {};
        }
        else{
            selectedCards[card] = "selected";
        }

        let scoreCalculate = Object.keys(selectedCards).length;
        let newCards = shuffleCards([...cards]);
        
        if(scoreCalculate >= newCards.length){
            winCondition = true;
        } 
        else{
            let fair = false;
            for(let j = 0; j < 10; j++){
                if(!(newCards[j].name in selectedCards)){
                    fair = true;
                    break;
                }
            }
    
            if(!fair){
                console.log("mroao sam aaaaa");
                let i = 10;
                while(newCards[i].name in selectedCards) i++;
                [newCards[0], newCards[i]] = [newCards[i], newCards[0]];
                let first10 = newCards.slice(0, 10);
                first10 = shuffleCards(first10);
                first10.map((elem, index) => newCards[index] = elem);
            }
        }
        setCards(newCards);
        setScore(scoreCalculate);
    }   
    
    if(winCondition) return (
        <main>
            <div className='win'>VICTORY ACHIEVED</div>
        </main>
    );
    return (
        <main>
            <div className='scoreboard'>Score: {score}</div>
            {
            cards.slice(0,10).map((card) => (
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
