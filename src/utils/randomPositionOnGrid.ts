import { SEGMENT_SIZE } from '../features/Snake/draw/draw'

interface RandomPositionOnGridArgs {
   threshold: number
}

export const randomPositionOnGrid = ({ threshold }: RandomPositionOnGridArgs) => {
   return Math.floor(Math.random() * (threshold / SEGMENT_SIZE)) * SEGMENT_SIZE
}
