import React, {useEffect, useRef} from 'react';

type CanvasType= React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> &
    { draw: (context:CanvasRenderingContext2D)=>void}


export const Canvas: React.FC<CanvasType> = ({draw,...props}) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
       const canvas = canvasRef.current
        if (!canvas) return
         const ctx = canvas.getContext('2d')
        if (!ctx) return;
        draw(ctx)
    }, [draw])


    return (
        <canvas width={props.width} height={props.height} ref={canvasRef}/>
    );
};

