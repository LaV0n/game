import React from 'react';
import './App.css';
import {CandyCash} from "./features/CandyCash/CandyCash";
import {Route, Routes} from "react-router-dom";
import {Main} from "./features/Main/Main";

function App() {
    return (
        <Routes>
            <Route path="/3inline" element={<CandyCash/>}/>
            <Route path="/" element={<Main/>}/>
        </Routes>
    )
}

export default App;
