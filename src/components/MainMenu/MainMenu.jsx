import { useState } from 'react';
import './mainMenu.css';

import Game from '../Game/Game.jsx';

const games = ['ds1', 'ds2', 'ds3']
function MainMenu(){
    const [currentGame, setCurrentGame] = useState(0);
    return (
        <main>
            {currentGame === 0 && (
                <div className="titles">
                    <img src="/title/darksoulstitle.webp" alt="" onClick={()=>setCurrentGame(1)}/>
                    <img src="/title/darksouls2title.webp" alt="" onClick={()=>setCurrentGame(2)}/>
                    <img src="/title/darksouls3title.webp" alt="" onClick={()=>setCurrentGame(3)}/>
                </div>
            )}
            {currentGame !== 0 && (<Game gameName={ games[currentGame-1] }/>)}
        </main>
    )
}

export default MainMenu;