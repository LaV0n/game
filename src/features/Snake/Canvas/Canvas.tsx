import React, { forwardRef, useEffect } from 'react'
import * as S from './Canvas.styles'

type CanvasType = React.DetailedHTMLProps<
   React.CanvasHTMLAttributes<HTMLCanvasElement>,
   HTMLCanvasElement
> & {
   draw: (context: CanvasRenderingContext2D) => void
}

// eslint-disable-next-line react/display-name
export const Canvas = forwardRef<HTMLCanvasElement, CanvasType>(({ draw, ...props }, canvasRef) => {
   useEffect(() => {
      if (!canvasRef) {
         return
      }
      const canvas = (canvasRef as React.RefObject<HTMLCanvasElement>).current
      if (!canvas) {
         return
      }

      const context = canvas.getContext('2d')
      if (!context) {
         return
      }

      draw(context)

      return () => context.clearRect(0, 0, window.innerWidth, 400)
   }, [draw, canvasRef])

   if (!canvasRef) {
      return null
   }

   return <S.Canvas width={400} height={200} ref={canvasRef as any} {...props} />
})
