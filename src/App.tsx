import React from 'react';
import './App.css';
import {Canvas} from "./features/Canvas/Canvas";

function App() {

    class InputHandler{

    }
    class ProjectTitle{}
    class Particle{}
    class Plqyer{
        game:any;
        width:number;
        height:number;
        x:number;
        y:number;
        speedY:number
        constructor(game:any) {
            this.game=game;
            this.width=120;
            this.height=190;
            this.x=20;
            this.y=100;
            this.speedY=0.2;
        }
        updade(){
            this.y +=this.speedY;
        }
        draw(context:CanvasRenderingContext2D){
            context.fillRect(this.x,this.y,this.width, this.height);
        }
    }
    class Enemy{}
    class Layer{}
    class Backfround{}
    class UI{}
    class Game{
        width:number;
        height:number;
        player: any
        constructor(width:number,height:number) {
            this.width=width;
            this.height=height;
            this.player= new Plqyer(this);
        }
        update(){
            this.player.updade();
        }
        draw(context:any){
            this.player.draw(context)
        }
    }
    const game= new Game(window.innerWidth,400)

    function animate(ctx:CanvasRenderingContext2D){
        game.update();
        game.draw(ctx)
        requestAnimationFrame(()=>animate(ctx))
        ctx.clearRect(0,0,500,500)
    }
    const drawArt=(ctx:CanvasRenderingContext2D)=> {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 120, 100)
        ctx.strokeRect(120,100,50,50)
    }

  return (
    <div className="App">
      <Canvas width={window.innerWidth} height={400} draw={drawArt}/>
      <Canvas width={window.innerWidth} height={400} draw={animate}/>
    </div>
  );
}

export default App;
