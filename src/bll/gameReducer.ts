import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type KindOfCoinType= 26 | 9 | 19 | 50 | 99 | 999
type DirectionType= 'up' | 'down'
type InitialCoinsType= number | string

const initialState = {
    numberOfItem: 2,
    kindOfCoin: 26 as KindOfCoinType,
    direction: 'up' as DirectionType,
    initialCoins:[] as InitialCoinsType[]
}

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setDirection(state,action:PayloadAction<{direction:DirectionType}>){
            state.direction=action.payload.direction
        },
        setValueOfNumbers(state,action:PayloadAction<{value:number}>){
            state.numberOfItem=action.payload.value
        },
        setKindOfCoin(state,action:PayloadAction<{type:number}>){
            switch (action.payload.type){
                case 1:
                    state.kindOfCoin=26
                    break
                case 2:
                    state.kindOfCoin=9
                    break
                case 3:
                    state.kindOfCoin=19
                    break
                case 4:
                    state.kindOfCoin=50
                    break
                case 5:
                    state.kindOfCoin=99
                    break
                case 6:
                    state.kindOfCoin=999
                    break
                default:
                    state.kindOfCoin=9
            }

        },
        setInitialCoins(state){
            if(state.kindOfCoin!==26){
                while(state.numberOfItem!==state.initialCoins.length){
                    let newNumber =Math.floor(Math.random() *  state.kindOfCoin)
                    if(state.initialCoins.indexOf(newNumber) === -1){
                        state.initialCoins.push(newNumber)
                    }
                }
            }else {
                while(state.numberOfItem!==state.initialCoins.length){
                    let newLetter =String.fromCharCode(Math.floor(Math.random() *  state.kindOfCoin) + 97)
                    if(state.initialCoins.indexOf(newLetter) === -1){
                        state.initialCoins.push(newLetter)
                    }
                }
            }

        },
        resetInitialCoins(state){
            state.initialCoins=[]
            state.kindOfCoin=26
            state.numberOfItem=2
        }
    }
})

export const gameReducer = slice.reducer
export const {setDirection,setValueOfNumbers,setKindOfCoin,setInitialCoins,resetInitialCoins}=slice.actions