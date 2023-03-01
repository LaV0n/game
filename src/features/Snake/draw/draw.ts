import {PositionType} from "../useGameLogic";

type DrawArgs={
    ctx:CanvasRenderingContext2D
    snakeBody:PositionType[]
}

const SEGMENT_SIZE=5

export const draw=({ctx,snakeBody}:DrawArgs)=>{
ctx.fillStyle='rgb(200,0,0)'
snakeBody.forEach(segment=>ctx.fillRect(segment.x,segment.y,SEGMENT_SIZE,SEGMENT_SIZE))
}