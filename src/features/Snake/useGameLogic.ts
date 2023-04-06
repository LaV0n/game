import React, { useEffect, useState } from 'react'
import { useInterval } from '../../utils/useInterval'
import { createSnakeMovement, hasSnakeEatItself, willSnakeHitTheFood } from './movement'
import { SEGMENT_SIZE } from './draw/draw'
import { randomPositionOnGrid } from '../../utils/randomPositionOnGrid'
import { GameState } from './Snake'

export type PositionType = {
   x: number
   y: number
}

export enum Direction {
   UP,
   DOWN,
   LEFT,
   RIGHT,
}

const MOVEMENT_SPEED = 100

interface UseGameLogicArgs {
   canvasWidth?: number
   canvasHeight?: number
   onGameOver: () => void
   gameState: GameState
}

export const useGameLogic = ({
   canvasWidth,
   canvasHeight,
   onGameOver,
   gameState,
}: UseGameLogicArgs) => {
   const [snakeBody, setSnakeBody] = useState<PositionType[]>([{ x: 200, y: 100 }])
   const [direction, setDirection] = useState<Direction>()

   const { moveRight, moveLeft, moveDown, moveUp } = createSnakeMovement()
   const snakeHeadPosition = snakeBody[snakeBody.length - 1]
   const [foodPosition, setFoodPosition] = useState<PositionType | undefined>()

   useEffect(() => {
      if (!canvasHeight || !canvasWidth) {
         return
      }
      setFoodPosition({
         x: randomPositionOnGrid({ threshold: canvasWidth }),
         y: randomPositionOnGrid({ threshold: canvasHeight }),
      })
   }, [canvasHeight, canvasWidth])

   const resetGameState = () => {
      setDirection(undefined)
      setSnakeBody([
         {
            x: randomPositionOnGrid({ threshold: canvasWidth! }),
            y: randomPositionOnGrid({ threshold: canvasHeight! }),
         },
      ])
      setFoodPosition({
         x: randomPositionOnGrid({ threshold: canvasWidth! }),
         y: randomPositionOnGrid({ threshold: canvasHeight! }),
      })
   }

   const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.code) {
         case 'KeyS':
            if (direction !== Direction.UP) {
               setDirection(Direction.DOWN)
            }
            break
         case 'KeyW':
            if (direction !== Direction.DOWN) {
               setDirection(Direction.UP)
            }
            break
         case 'KeyA':
            if (direction !== Direction.RIGHT) {
               setDirection(Direction.LEFT)
            }
            break
         case 'KeyD':
            if (direction !== Direction.LEFT) {
               setDirection(Direction.RIGHT)
            }
            break
      }
   }

   const moveSnake = () => {
      let snakeBodyAfterMovement: PositionType[] | undefined
      switch (direction) {
         case Direction.UP:
            if (snakeHeadPosition.y > 0) {
               snakeBodyAfterMovement = moveUp(snakeBody)
            } else if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
               setDirection(Direction.LEFT)
            } else {
               setDirection(Direction.RIGHT)
            }
            break
         case Direction.DOWN:
            if (canvasHeight && snakeHeadPosition.y > canvasHeight - SEGMENT_SIZE * 2) {
               if (canvasWidth && snakeHeadPosition.x > canvasWidth / 2) {
                  setDirection(Direction.LEFT)
               } else {
                  setDirection(Direction.RIGHT)
               }
            } else {
               snakeBodyAfterMovement = moveDown(snakeBody)
            }
            break
         case Direction.RIGHT:
            if (canvasWidth && snakeHeadPosition.x > canvasWidth - SEGMENT_SIZE * 2) {
               if (canvasHeight && snakeHeadPosition.y > canvasHeight / 2) {
                  setDirection(Direction.UP)
               } else {
                  setDirection(Direction.DOWN)
               }
            } else {
               snakeBodyAfterMovement = moveRight(snakeBody)
            }
            break
         case Direction.LEFT:
            if (snakeHeadPosition.x > 0) {
               snakeBodyAfterMovement = moveLeft(snakeBody)
            } else if (canvasHeight && snakeHeadPosition.y > canvasHeight / 2) {
               setDirection(Direction.UP)
            } else {
               setDirection(Direction.DOWN)
            }
            break
      }

      //snake eats itself
      if (snakeBodyAfterMovement) {
         const isGameOver = hasSnakeEatItself(snakeBodyAfterMovement)
         if (isGameOver) {
            onGameOver()
         }
      }

      if (
         direction !== undefined &&
         foodPosition &&
         willSnakeHitTheFood({
            foodPosition,
            snakeHeadPosition,
            direction,
         })
      ) {
         setSnakeBody([...snakeBodyAfterMovement!, { x: foodPosition.x, y: foodPosition.y }])
         setFoodPosition({
            x: randomPositionOnGrid({ threshold: canvasWidth! }),
            y: randomPositionOnGrid({ threshold: canvasHeight! }),
         })
      } else if (snakeBodyAfterMovement) {
         setSnakeBody(snakeBodyAfterMovement)
      }
   }

   useInterval(moveSnake, gameState === GameState.RUNNING ? MOVEMENT_SPEED : null)

   return {
      snakeBody,
      onKeyDownHandler,
      foodPosition,
      resetGameState,
   }
}
