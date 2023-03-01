import {useState} from "react";

export type PositionType={
    x:number
    y:number
}

export const useGameLogic =()=>{
   const [snakeBody,setSnakeBody]=useState<PositionType[]>([{x:0,y:0}])

   return{
       snakeBody
   }

}