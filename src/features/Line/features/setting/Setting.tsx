import {NavLink} from "react-router-dom";
import styles from './Setting.module.scss'
import {CustomSlider} from "../../common/CustomSlider";
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import { setDirection, setInitialCoins, setKindOfCoin, setValueOfNumbers} from "../../../../bll/gameReducer";
import {HomeLink} from "../../../../common/HomeLink/HomeLink";

export const Setting = () => {

    const dispatch=useAppDispatch()
    const direction=useAppSelector(state => state.game.direction)

    const setValue = (value: any) => {
        dispatch(setValueOfNumbers({value:value.target.value}))
    }
    const setKindOfItems = (value: any) => {
        dispatch(setKindOfCoin({type:value.target.value}))
    }

    const startGame=()=>{
        dispatch(setInitialCoins())
    }

    return (
        <div className={styles.container}>
            <HomeLink/>
            <div className={styles.block}>
                <div className={styles.slider}>
                    Number of Items
                    <CustomSlider SetValue={setValue} min={2} max={5} isNumbers={true}/>
                </div>
                <div className={styles.slider}>
                    Value
                    <CustomSlider SetValue={setKindOfItems} min={1} max={6} isNumbers={false}/>
                </div>
                <div className={styles.slider}>
                    Direction
                    <div className={styles.direction}>
                        <button className={styles.directionButton}
                                onClick={() => {dispatch(setDirection({direction:'down'}))}}
                                disabled={direction==='down'}>To Up
                        </button>
                        <button className={styles.directionButton}
                                onClick={() => {dispatch(setDirection({direction:'up'}))}}
                                disabled={direction==='up'}>To Down
                        </button>
                    </div>
                </div>
                <NavLink to={'/line/game'} style={{textDecoration:"none"}}>
                    <button className={styles.gameButton} onClick={startGame}>
                        Start Game
                    </button>
                </NavLink>
            </div>
        </div>
    )
}