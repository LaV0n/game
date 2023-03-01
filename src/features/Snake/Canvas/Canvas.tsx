import React, {forwardRef, useEffect} from 'react';
import * as S from './Canvas.styles'

type CanvasType=React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & {
    draw:(context:CanvasRenderingContext2D)=>void
}

export const Canvas= forwardRef<HTMLCanvasElement,CanvasType>(
    ({draw,...props},canvasRef) => {

        useEffect(()=>{

            if(!canvasRef){
                return
            }
            const canvas=(canvasRef as React.RefObject<HTMLCanvasElement>).current
            if(!canvas){
                return;
            }

            const context=canvas.getContext('2d')
            if(!context){return;}

            draw(context)

        },[draw,canvasRef])

        if(!canvasRef){
            return null
        }

    return (
        <S.Canvas ref={canvasRef as any} {...props}/>
    );
});

