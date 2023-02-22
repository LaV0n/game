import React, {DragEvent, useEffect, useState} from 'react';
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

type ElementType = {
    src?: string
    id: number
    backgroundColor:string
}

function App() {

    const [currentColorArray, setCurrentColorArray] = useState<Array<string>>([])
    const [currentDragItem, setCurrentDragItem] = useState<ElementType|null>()
    const [replaceDragItem, setReplaceDragItem] = useState<ElementType|null>()

    const createBoard = () => {
        const randomColorArray = []
        for (let i = 0; i < width ** 2; i++) {
            randomColorArray.push(candyColor[Math.floor(Math.random() * candyColor.length)])
        }
        setCurrentColorArray(randomColorArray)
    }

    const checkForColumOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columOfThree = [i, i + width, i + width * 2]
            const decideColor = currentColorArray[i]
            if (columOfThree.every(item => currentColorArray[item] === decideColor)) {
                columOfThree.forEach(item => currentColorArray[item] = '')
                return true
            }
        }
    }
    const checkForColumOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decideColor = currentColorArray[i]
            if (columOfFour.every(item => currentColorArray[item] === decideColor)) {
                columOfFour.forEach(item => currentColorArray[item] = '')
                return true
            }
        }
    }
    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decideColor = currentColorArray[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
            if (notValid.includes(i)) continue
            if (rowOfThree.every(item => currentColorArray[item] === decideColor)) {
                rowOfThree.forEach(item => currentColorArray[item] = '')
                return true
            }
        }
    }
    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decideColor = currentColorArray[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
            if (notValid.includes(i)) continue
            if (rowOfFour.every(item => currentColorArray[item] === decideColor)) {
                rowOfFour.forEach(item => currentColorArray[item] = '')
                return true
            }
        }
    }
    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= (64 - width); i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]

            if (firstRow.includes(i) && currentColorArray[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColor.length)
                currentColorArray[i] = candyColor[randomNumber]
            }
            if (currentColorArray[i + width] === '') {
                currentColorArray[i + width] = currentColorArray[i]
                currentColorArray[i] = ''
            }
        }
    }

    const dragStartHandler = (e: DragEvent<HTMLImageElement>) => {
        setCurrentDragItem({id: +e.currentTarget.id,
            backgroundColor:e.currentTarget.style.backgroundColor})
    }
    const dragDropHandler = (e: DragEvent<HTMLImageElement>) => {
        setReplaceDragItem({id: +e.currentTarget.id,
            backgroundColor:e.currentTarget.style.backgroundColor})
    }
    const dragEndHandler = () => {
        if (currentDragItem && replaceDragItem) {
            const currentDragId = currentDragItem.id
            const replaceDragId = replaceDragItem.id

            if ((replaceDragId === currentDragId - 1) || (replaceDragId === currentDragId + 1) ||
                (replaceDragId === currentDragId - width) || (replaceDragId === currentDragId + width)) {
                currentColorArray[replaceDragId] = currentDragItem.backgroundColor
                currentColorArray[currentDragId] = replaceDragItem.backgroundColor
                setCurrentColorArray([...currentColorArray])
            }
            setTimeout(()=>{
                const isCheckRowThree = checkForRowOfThree()
                const isCheckRowFour = checkForRowOfFour()
                const isCheckColumThree = checkForColumOfThree()
                const isCheckColumFour = checkForColumOfFour()
                if (!isCheckRowThree && !isCheckRowFour && !isCheckColumThree && !isCheckColumFour) {
                    currentColorArray[replaceDragId] = replaceDragItem.backgroundColor
                    currentColorArray[currentDragId] = currentDragItem.backgroundColor
                    setCurrentColorArray([...currentColorArray])
                    setReplaceDragItem(null)
                    setCurrentDragItem(null)
                }
            },200)
        }
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumOfFour()
            checkForColumOfThree()
            checkForRowOfFour()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArray([...currentColorArray])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumOfFour, checkForColumOfThree,
        checkForRowOfThree, currentColorArray, checkForRowOfFour,
        moveIntoSquareBelow])

    return (
        <div className="App">
            <div className="game">
                {currentColorArray.map((candyColor, index) =>
                    <img key={index}
                         style={{backgroundColor: candyColor}}
                         alt={candyColor}
                         id={String(index)}
                         draggable="true"
                         onDragOver={(e) => e.preventDefault()}
                         onDragEnter={(e) => e.preventDefault()}
                         onDragLeave={(e) => e.preventDefault()}
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
