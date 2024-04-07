import { useState } from 'react';
import './mainMenu.css';

import Game from '../Game/Game.jsx';

const games = ['ds1', 'ds2', 'ds3', 'all']
function MainMenu(){
    const [currentGame, setCurrentGame] = useState(0);
    return (
        <main>
            {currentGame === 0 && (
                <div className="titles">
                    <div className='title' onClick={()=>setCurrentGame(1)}>DARK SOULS</div>
                    <div className='title' onClick={()=>setCurrentGame(2)}>DARK SOULS II</div>
                    <div className='title' onClick={()=>setCurrentGame(3)}>DARK SOULS III</div>
                    <div className='title' onClick={()=>setCurrentGame(4)}>TRILOGY</div>
                </div>
            )}
            {currentGame !== 0 && (<Game gameName={ games[currentGame - 1] } backCB={()=>setCurrentGame(0)}/>)}
        </main>
    )
}

export default MainMenu;