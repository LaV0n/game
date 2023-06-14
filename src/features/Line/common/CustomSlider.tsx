import React from 'react'
import { Slider } from '@mui/material'

type CustomSliderType = {
   SetValue: (value: any) => void
   min: number
   max: number
   isNumbers: boolean
}

type ArrayType = {
   value: number
   label: string
}

export const CustomSlider = ({ SetValue, max, min, isNumbers }: CustomSliderType) => {
   let arr = [] as ArrayType[]
   const marks = [
      {
         value: 2,
         label: '2',
      },
      {
         value: 3,
         label: '3',
      },
      {
         value: 4,
         label: '4',
      },
      {
         value: 5,
         label: '5',
      },
   ]
   const kindOfItems = [
      {
         value: 1,
         label: 'A',
      },
      {
         value: 2,
         label: '9',
      },
      {
         value: 3,
         label: '19',
      },
      {
         value: 4,
         label: '50',
      },
      {
         value: 5,
         label: '99',
      },
      {
         value: 6,
         label: '999',
      },
   ]

   if (isNumbers) {
      arr = marks
   } else {
      arr = kindOfItems
   }

   function valuetext(value: number) {
      const result = arr.filter(m => m.value === value)
      return `${result[0].label}`
   }

   return (
      <Slider
         aria-label="Restricted values"
         min={min}
         max={max}
         defaultValue={min}
         valueLabelFormat={valuetext}
         step={null}
         valueLabelDisplay="auto"
         onChange={SetValue}
         marks={arr}
         sx={{
            width: 300,
            color: 'yellow',
         }}
      />
   )
}
