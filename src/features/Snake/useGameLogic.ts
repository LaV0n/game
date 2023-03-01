import React, {useState} from "react";
import {useInterval} from "../../utils/useInterval";
import {createSnakeMovement} from "./movement";

export type PositionType = {
    x: number
    y: number
}

export enum Direction {
    UP, DOWN, LEFT, RIGHT
}

const MOVEMENT_SPEED = 500;

export const useGameLogic = () => {
    const [snakeBody, setSnakeBody] = useState<PositionType[]>([{x: 0, y: 0}])
    const [direction, setDirection] = useState<Direction>()

    const {moveRight,moveLeft,moveDown,moveUp}=createSnakeMovement()

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case 'KeyS':
                setDirection(Direction.DOWN)
                break;
            case 'KeyW':
                setDirection(Direction.UP)
                break;
            case 'KeyA':
                setDirection(Direction.LEFT)
                break;
            case 'KeyD':
                setDirection(Direction.RIGHT)
                break;
        }
    }

    const moveSnake = () => {
        let snakeBodyAfterMovement:PositionType[] | undefined
        switch (direction){
            case Direction.UP:
                snakeBodyAfterMovement=moveUp(snakeBody)
                break;
            case Direction.DOWN:
                snakeBodyAfterMovement= moveDown(snakeBody)
                break;
            case Direction.RIGHT:
                snakeBodyAfterMovement=moveRight(snakeBody)
                break;
            case Direction.LEFT:
                snakeBodyAfterMovement=moveLeft(snakeBody)
                break;
        }
        if(snakeBodyAfterMovement) {
            setSnakeBody(snakeBodyAfterMovement)
        }
    }

    useInterval(moveSnake, MOVEMENT_SPEED)

    return {
        snakeBody,
        onKeyDownHandler
    }

}