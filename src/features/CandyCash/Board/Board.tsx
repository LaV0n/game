import React, { DragEvent, useEffect, useState } from 'react'
import blueberries from '../../../assets/icon/icons8-blueberries-96.png'
import kiwi from '../../../assets/icon/icons8-kiwi-fruit-96.png'
import orange from '../../../assets/icon/icons8-tangerine-96.png'
import apple from '../../../assets/icon/icons8-apple-96.png'
import cherry from '../../../assets/icon/icons8-cherries-96.png'
import banana from '../../../assets/icon/icons8-banana-96.png'
import cart from '../../../assets/icon/icons8-shopping-cart-64.png'
import { noValidId } from '../../../common/utils/noValidId'
import styles from './Board.module.css'

export const width = 8
const candyColor = [blueberries, kiwi, orange, apple, cherry, banana]

type ElementType = {
   src: string
   id: number
}
type BoardType = {
   count: number
   setCount: (value: number) => void
}

export const Board = ({ setCount, count }: BoardType) => {
   const [currentColorArray, setCurrentColorArray] = useState<Array<string>>([])
   const [currentDragItem, setCurrentDragItem] = useState<ElementType | null>()
   const [replaceDragItem, setReplaceDragItem] = useState<ElementType | null>()

   const createBoard = () => {
      const randomColorArray = []
      for (let i = 0; i < width ** 2; i++) {
         randomColorArray.push(candyColor[Math.floor(Math.random() * candyColor.length)])
      }
      setCurrentColorArray(randomColorArray)
   }

   const checkForColumOfThree = () => {
      for (let i = 0; i < width ** 2 - width * 2; i++) {
         const columOfThree = [i, i + width, i + width * 2]
         const decideColor = currentColorArray[i]
         if (columOfThree.every(item => currentColorArray[item] === decideColor)) {
            columOfThree.forEach(item => (currentColorArray[item] = cart))
            return true
         }
      }
   }
   const checkForColumOfFour = () => {
      for (let i = 0; i <= width ** 2 - width * 3; i++) {
         const columOfFour = [i, i + width, i + width * 2, i + width * 3]
         const decideColor = currentColorArray[i]
         if (columOfFour.every(item => currentColorArray[item] === decideColor)) {
            columOfFour.forEach(item => (currentColorArray[item] = cart))
            return true
         }
      }
   }
   const checkForRowOfThree = () => {
      for (let i = 0; i < width ** 2; i++) {
         const rowOfThree = [i, i + 1, i + 2]
         const decideColor = currentColorArray[i]
         const notValid = noValidId(3)
         if (notValid.includes(i)) continue
         if (rowOfThree.every(item => currentColorArray[item] === decideColor)) {
            rowOfThree.forEach(item => (currentColorArray[item] = cart))
            return true
         }
      }
   }
   const checkForRowOfFour = () => {
      for (let i = 0; i < width ** 2; i++) {
         const rowOfFour = [i, i + 1, i + 2, i + 3]
         const decideColor = currentColorArray[i]
         const notValid = noValidId(4)
         if (notValid.includes(i)) continue
         if (rowOfFour.every(item => currentColorArray[item] === decideColor)) {
            rowOfFour.forEach(item => (currentColorArray[item] = cart))
            return true
         }
      }
   }
   const moveIntoSquareBelow = () => {
      for (let i = 0; i <= width ** 2 - width; i++) {
         const firstRow = Array.from(Array(width).keys())

         if (firstRow.includes(i) && currentColorArray[i] === cart) {
            const randomNumber = Math.floor(Math.random() * candyColor.length)
            currentColorArray[i] = candyColor[randomNumber]
            setCount(++count)
         }
         if (currentColorArray[i + width] === cart) {
            currentColorArray[i + width] = currentColorArray[i]
            currentColorArray[i] = cart
         }
      }
   }

   const dragStartHandler = (e: DragEvent<HTMLImageElement>) => {
      setCurrentDragItem({ id: +e.currentTarget.id, src: e.currentTarget.src })
   }
   const dragDropHandler = (e: DragEvent<HTMLImageElement>) => {
      setReplaceDragItem({ id: +e.currentTarget.id, src: e.currentTarget.src })
   }
   const dragEndHandler = () => {
      if (currentDragItem && replaceDragItem) {
         const currentDragId = currentDragItem.id
         const replaceDragId = replaceDragItem.id

         if (
            replaceDragId === currentDragId - 1 ||
            replaceDragId === currentDragId + 1 ||
            replaceDragId === currentDragId - width ||
            replaceDragId === currentDragId + width
         ) {
            currentColorArray[replaceDragId] = currentDragItem.src
            currentColorArray[currentDragId] = replaceDragItem.src
            setCurrentColorArray([...currentColorArray])
         }
         setTimeout(() => {
            const isCheckRowThree = checkForRowOfThree()
            const isCheckRowFour = checkForRowOfFour()
            const isCheckColumThree = checkForColumOfThree()
            const isCheckColumFour = checkForColumOfFour()
            if (!isCheckRowThree && !isCheckRowFour && !isCheckColumThree && !isCheckColumFour) {
               currentColorArray[replaceDragId] = replaceDragItem.src
               currentColorArray[currentDragId] = currentDragItem.src
               setCurrentColorArray([...currentColorArray])
               setReplaceDragItem(null)
               setCurrentDragItem(null)
            }
         }, 200)
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
   }, [
      checkForColumOfFour,
      checkForColumOfThree,
      checkForRowOfThree,
      currentColorArray,
      checkForRowOfFour,
      moveIntoSquareBelow,
   ])

   return (
      <div className={styles.container}>
         <div className={styles.game}>
            {currentColorArray.map((candyColor, index) => (
               <img
                  key={index}
                  className={styles.fruit}
                  src={candyColor}
                  alt={candyColor}
                  id={String(index)}
                  draggable="true"
                  onDragOver={e => e.preventDefault()}
                  onDragEnter={e => e.preventDefault()}
                  onDragLeave={e => e.preventDefault()}
                  onDragStart={dragStartHandler}
                  onDragEnd={dragEndHandler}
                  onDrop={dragDropHandler}
               />
            ))}
         </div>
      </div>
   )
}
