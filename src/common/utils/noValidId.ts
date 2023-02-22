import { width } from "../../App";

export const noValidId = (rowLength:number) => {
    let result = []
    for (let i = 1; i <= width; i++) {
        if(rowLength===3){
            result.push(i * width - 2)
            result.push(i * width - 1)
        }
       if(rowLength===4){
           result.push(i * width - 3)
           result.push(i * width - 2)
           result.push(i * width - 1)
       }
    }
    return result
};

