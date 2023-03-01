import {PositionType} from "./useGameLogic";

export const createSnakeMovement = (gridSize = 5) => ({
    moveRight: (snakeBody: PositionType[]) => {
        const bodyCopy = [...snakeBody]
        const headPos = bodyCopy[bodyCopy.length - 1]
        bodyCopy.shift()
        return[...snakeBody,{...headPos,x:headPos.x+gridSize}]
    },
    moveLeft: (snakeBody: PositionType[]) => {
        const bodyCopy = [...snakeBody]
        const headPos = bodyCopy[bodyCopy.length - 1]
        bodyCopy.shift()
        return[...snakeBody,{...headPos,x:headPos.x-gridSize}]
    },
    moveUp: (snakeBody: PositionType[]) => {
        const bodyCopy = [...snakeBody]
        const headPos = bodyCopy[bodyCopy.length - 1]
        bodyCopy.shift()
        return[...snakeBody,{...headPos,y:headPos.y-gridSize}]
    },
    moveDown: (snakeBody: PositionType[]) => {
        const bodyCopy = [...snakeBody]
        const headPos = bodyCopy[bodyCopy.length - 1]
        bodyCopy.shift()
        return[...snakeBody,{...headPos,y:headPos.y+gridSize}]
    },
})