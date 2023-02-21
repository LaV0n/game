import React, { useEffect, useState} from 'react';
import './App.css';


const width = 8
const candyColor = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
]

function App() {

    const [currentColorArray, setCurrentColorArray] = useState<Array<string>>([])
    const [currentDragItem,setCurrentDragItem]=useState()
    const [replaceDragItem,setReplaceDragItem]=useState()

    const createBoard = () => {
        const randomColorArray = []
        for (let i = 0; i < width ** 2; i++) {
            randomColorArray.push(candyColor[Math.floor(Math.random() * candyColor.length)])
        }
        setCurrentColorArray(randomColorArray)
    }

    const checkForColumOfThree=()=>{
        for(let i=0;i<=47;i++){
            const columOfThree=[i,i+width,i+width*2]
            const decideColor=currentColorArray[i]
            if(columOfThree.every(item=>currentColorArray[item]===decideColor)){
                columOfThree.forEach(item=>currentColorArray[item]='')
                 return true
            }
        }
    }
    const checkForColumOfFour=()=>{
        for(let i=0;i<=39;i++){
            const columOfFour=[i,i+width,i+width*2,i+width*3]
            const decideColor=currentColorArray[i]
            if(columOfFour.every(item=>currentColorArray[item]===decideColor)){
                columOfFour.forEach(item=>currentColorArray[item]='')
                return true
            }
        }
    }
    const checkForRowOfThree=()=>{
        for(let i=0;i<64;i++){
            const rowOfThree=[i,i+1,i+2]
            const decideColor=currentColorArray[i]
            const notValid=new Array(64).filter(i=>i===width-1 ||i===width-2)
            if (notValid.includes(i)) continue
            if(rowOfThree.every(item=>currentColorArray[item]===decideColor)){
                rowOfThree.forEach(item=>currentColorArray[item]='')
                return true
            }
        }
    }
    const checkForRowOfFour=()=>{
        for(let i=0;i<64;i++){
            const rowOfFour=[i,i+1,i+2,i+3]
            const decideColor=currentColorArray[i]
            const notValid=new Array(64).filter(i=>i===width-1 ||i===width-2 || i===width-3)
            if (notValid.includes(i)) continue
            if(rowOfFour.every(item=>currentColorArray[item]===decideColor)){
                rowOfFour.forEach(item=>currentColorArray[item]='')
                return true
            }
        }
    }
    const moveIntoSquareBelow=()=>{
        for (let i=0; i<=(64-width);i++){
            const firstRow=[0,1,2,3,4,5,6,7]

            if (firstRow.includes(i) && currentColorArray[i]===''){
                let randomNumber=Math.floor(Math.random()*candyColor.length)
                currentColorArray[i]=candyColor[randomNumber]
            }
            if(currentColorArray[i+width]===''){
                currentColorArray[i+width]=currentColorArray[i]
                currentColorArray[i]=''
            }
        }
    }

    const dragStartHandler=(e:DragEvent<HTMLImageElement>)=>{
        setCurrentDragItem(e.target)
    }
    const dragDropHandler=(e:DragEvent<HTMLImageElement>)=>{
        setReplaceDragItem(e.target)
    }
    const dragEndHandler=(e:DragEvent<HTMLImageElement>)=>{
       const currentDragId=+currentDragItem.getAttribute('data-id')
       const replaceDragId=+replaceDragItem.getAttribute('data-id')
        const isCheckRowThree=checkForRowOfThree()
        const isCheckRowFour=checkForRowOfFour()
        const isCheckColumThree=checkForColumOfThree()
        const isCheckColumFour=checkForColumOfFour()


        if((replaceDragId===currentDragId-1) ||(replaceDragId===currentDragId+1) ||
        (replaceDragId===currentDragId-width) ||(replaceDragId===currentDragId+width) ){
            currentColorArray[replaceDragId]=currentDragItem.style.backgroundColor
            currentColorArray[currentDragId]=replaceDragItem.style.backgroundColor
        }
        if (!isCheckRowThree || !isCheckRowFour || !isCheckColumThree || !isCheckColumFour){
            debugger
            currentColorArray[replaceDragId]=currentDragItem.style.backgroundColor
            currentColorArray[currentDragId]=replaceDragItem.style.backgroundColor
        }

    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(()=>{
        const timer=setInterval(()=>{
            checkForColumOfFour()
            checkForColumOfThree()
            checkForRowOfFour()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArray([...currentColorArray])
        },500)
       return ()=>clearInterval(timer)
    },[checkForColumOfFour,checkForColumOfThree,
        checkForRowOfThree,currentColorArray,checkForRowOfFour,
        moveIntoSquareBelow])

    return (
        <div className="App">
            <div className="game">
                {currentColorArray.map((candyColor, index) =>
                    <img key={index}
                         style={{backgroundColor: candyColor}}
                         alt={candyColor}
                         data-id={index}
                         draggable="true"
                         onDragOver={(e)=>e.preventDefault()}
                         onDragEnter={ (e)=>e.preventDefault()}
                         onDragLeave={(e)=>e.preventDefault()}
                         onDragStart={dragStartHandler}
                         onDragEnd={dragEndHandler}
                         onDrop={dragDropHandler}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
