import React from 'react'
import './App.css'
import { CandyCash } from './features/CandyCash/CandyCash'
import { Route, Routes } from 'react-router-dom'
import { Main } from './features/Main/Main'
import { Snake } from './features/Snake/Snake'
import { Setting } from './features/Line/features/setting/Setting'
import { LineGame } from './features/Line/features/main/LineGame'

function App() {
   return (
      <Routes>
         <Route path="/3inline" element={<CandyCash />} />
         <Route path="/snake" element={<Snake />} />
         <Route path="/line" element={<Setting />} />
         <Route path="/line/game" element={<LineGame />} />
         <Route path="/" element={<Main />} />
      </Routes>
   )
}

export default App
