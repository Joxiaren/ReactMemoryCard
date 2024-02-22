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
    const [gameOver, setGameOver] = useState('gameon');
    const [cardState, setCardState] = useState("");
    useEffect(() => {
        console.log(`gameName ${gameName}`);
        fetch(`${config.apiAddress}/bossInfo/${gameName}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            setCards(shuffleCards(json));
        });

        return () => {
            setCards([]);
        }
    }, [gameName])

    let restart = () => {
        setGameOver('gameon');
        setCardState('');
        selectedCards = {};
        setScore(0);
        winCondition = false;
        nextMove();
    }
    let cardClick = (e, card) => {
        if(card in selectedCards){

            setCardState("reveal");
            setGameOver('gameover');
            setTimeout(() => {
                restart();
            }, 6000);
        }
        else{
            selectedCards[card] = "selected";

            setScore(Object.keys(selectedCards).length);
            setCardState("cover");
            setTimeout(() => nextMove(), 350);
        }
    }   
    let nextMove = () =>{
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
                let i = 10;
                while(newCards[i].name in selectedCards) i++;
                [newCards[0], newCards[i]] = [newCards[i], newCards[0]];
                let first10 = newCards.slice(0, 10);
                first10 = shuffleCards(first10);
                first10.map((elem, index) => newCards[index] = elem);
            }
        }
        setTimeout(()=>{
            setCardState("");
        }, 350);
        
        setCards(newCards);
    }

    
    if(winCondition) return (
        <main>
            <div className="win-container" >
                <div className='win'>VICTORY ACHIEVED</div>
                <button className='restart' onClick={()=>restart()}>Restart</button>
            </div>
        </main>
    );
    return (
        <main className={gameOver}>
            <div className='scoreboard'>Score: {score}</div>
            {
            cards.slice(0,10).map((card) => (
                <Card key={card.name} name={card.name} imageFront={`${config.apiAddress}/${card.image}`} imageBack={`/covers/${gameName}.jpg`} selected={card.name in selectedCards} onclick={cardClick} state={cardState}/>
            ))}
        </main>
    );
}

function shuffleCards(cards){
    shuffleArray(cards, 10);
    return cards;
}
export default Main;
