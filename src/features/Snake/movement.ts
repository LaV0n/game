import { Direction, PositionType } from './useGameLogic'
import { SEGMENT_SIZE } from './draw/draw'

export const createSnakeMovement = (gridSize = 5) => ({
   moveRight: (snakeBody: PositionType[]) => {
      const bodyCopy = [...snakeBody]
      const headPos = bodyCopy[bodyCopy.length - 1]
      bodyCopy.shift()
      return [...bodyCopy, { ...headPos, x: headPos.x + gridSize }]
   },
   moveLeft: (snakeBody: PositionType[]) => {
      const bodyCopy = [...snakeBody]
      const headPos = bodyCopy[bodyCopy.length - 1]
      bodyCopy.shift()
      return [...bodyCopy, { ...headPos, x: headPos.x - gridSize }]
   },
   moveUp: (snakeBody: PositionType[]) => {
      const bodyCopy = [...snakeBody]
      const headPos = bodyCopy[bodyCopy.length - 1]
      bodyCopy.shift()
      return [...bodyCopy, { ...headPos, y: headPos.y - gridSize }]
   },
   moveDown: (snakeBody: PositionType[]) => {
      const bodyCopy = [...snakeBody]
      const headPos = bodyCopy[bodyCopy.length - 1]
      bodyCopy.shift()
      return [...bodyCopy, { ...headPos, y: headPos.y + gridSize }]
   },
})

interface WillSnakeHitTheFoodArgs {
   foodPosition: PositionType
   snakeHeadPosition: PositionType
   direction: Direction
}

export const willSnakeHitTheFood = ({
   foodPosition,
   snakeHeadPosition,
   direction,
}: WillSnakeHitTheFoodArgs) => {
   switch (direction) {
      case Direction.UP:
         return (
            foodPosition.x === snakeHeadPosition.x &&
            snakeHeadPosition.y - SEGMENT_SIZE === foodPosition.y
         )
      case Direction.DOWN:
         return (
            foodPosition.x === snakeHeadPosition.x &&
            snakeHeadPosition.y + SEGMENT_SIZE === foodPosition.y
         )
      case Direction.RIGHT:
         return (
            foodPosition.y === snakeHeadPosition.y &&
            snakeHeadPosition.x + SEGMENT_SIZE === foodPosition.x
         )
      case Direction.LEFT:
         return (
            foodPosition.y === snakeHeadPosition.y &&
            snakeHeadPosition.x - SEGMENT_SIZE === foodPosition.x
         )
   }
}

export const hasSnakeEatItself = (snakeBody: PositionType[]) => {
   if (snakeBody.length <= 1) {
      return false
   }
   const head = snakeBody[snakeBody.length - 1]
   const body = snakeBody.slice(0, snakeBody.length - 1)

   return body.some(segment => segment.x === head.x && segment.y === head.y)
}
