import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import styles from "./Snake.module.css";
import homeIcon from "../../assets/icon/icons8-home-page-64.png";
import {Canvas} from "./Canvas/Canvas";
import {useGameLogic} from "./useGameLogic";
import {draw} from "./draw/draw";
import wasdIcon from '../../assets/icon/icons8-клавиатура-64.png'

export enum GameState {
    RUNNING,
    GAME_OVER,
    PAUSE,
    WAITING
}

export const Snake = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [gameState, setGameState] = useState<GameState>(GameState.WAITING)

    const onGameOver = () => setGameState(GameState.GAME_OVER)

    const {snakeBody, onKeyDownHandler, foodPosition,resetGameState} = useGameLogic({
        canvasHeight: canvasRef.current?.height,
        canvasWidth: canvasRef.current?.width,
        onGameOver,
        gameState,
    })

    const drawGame = (ctx: CanvasRenderingContext2D) => {
        draw({ctx, snakeBody, foodPosition})
    }

    const playAgainHandler = () => {
        setGameState(GameState.WAITING)
        resetGameState()
    }
    const pauseButtonHandler=()=>{
        gameState===GameState.RUNNING
            ? setGameState(GameState.PAUSE)
            :setGameState(GameState.RUNNING)
    }

    return (
        <div className={styles.container} onKeyDown={onKeyDownHandler} tabIndex={0}>
            <Link to="/" className={styles.homeLink}>
                <img src={homeIcon} alt="0"/>
            </Link>
            <div className={styles.gameBlock}>
                <div className={styles.storeBlock}>
                    <div className={styles.descriptionBlock}>
                        STORE:
                        <p className={styles.title}>{(snakeBody.length-1)*10}</p>
                    </div>
                    {gameState === GameState.GAME_OVER
                        ? (<button onClick={playAgainHandler}>Play Again</button>)
                        : (<button onClick={pauseButtonHandler}
                        >
                            {gameState===GameState.RUNNING
                                ?'pause'
                                :'play'}
                        </button>)}
                    <div className={styles.descriptionBlock}>
                        <p className={styles.title}>For action use:</p>
                        <img src={wasdIcon} alt="0" className={styles.wasdIcon}/>
                    </div>
                </div>
                <Canvas ref={canvasRef} draw={drawGame}/>
                {gameState === GameState.GAME_OVER &&
                <div className={styles.endGameTitle}>
                    GAME OVER
                </div>
                }
            </div>

        </div>
    );
};

