import { useEffect, useState } from 'react';

import './game.css';
import config from '../../../conifg.json';

import Card from '../Card/Card';
import shuffleArray from '../../scripts/shuffle';

let selectedCards = {};
let winCondition = false;
let loading = true;
function Game({ gameName }){

    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState('gameon');
    const [cardState, setCardState] = useState("");
    useEffect(() => {
        fetch(`${config.localApiAddress}/bossInfo/${gameName}`)
        .then(res => res.json())
        .then(json => {
            loading = false;
            setCards(shuffleCards(json));
        });

        return () => {
            setCards([]);
        }
    }, [gameName])

    let restart = () => {
        setGameOver('gameon');
        setCardState('');
        setScore(0);
        selectedCards = {};
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

    return (
        <div className='game'>
                {gameOver == "gameover" && (<div className='gameover'>DUM DUM</div>)}
                {loading && (<div>loading</div>)}
                {!loading && winCondition && ( 
                    <div className="win-container" >
                        <div className='win'>VICTORY ACHIEVED</div>
                        <button className='restart' onClick={()=>restart()}>Restart</button>
                    </div>
                )}
                {!loading && !winCondition && ( 
                    <div className='scoreboard'>Score: {score}</div>
                )}
                {!loading && !winCondition && cards.slice(0,10).map((card) => (
                    <Card key={card.name} name={card.name} imageFront={`${config.localApiAddress}/${card.image}`} imageBack={`/covers/${gameName}.jpg`} selected={card.name in selectedCards} onclick={cardClick} state={cardState}/>
                ))}
        </div>
    );
}

function shuffleCards(cards){
    shuffleArray(cards, 10);
    return cards;
}
export default Game;
