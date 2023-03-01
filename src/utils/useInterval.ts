import {useEffect, useLayoutEffect, useRef} from "react";

export const useInterval=(callback:()=>void, delay:number | null)=>{

    const saveCallback=useRef(callback)

    useLayoutEffect(()=>{
        saveCallback.current=callback
    },[callback])

    useEffect(()=>{
        if(!delay && delay!==0){
           return
        }
        const id=setInterval(()=>saveCallback.current(),delay)
        return ()=>clearInterval(id);
    },[delay])
}
