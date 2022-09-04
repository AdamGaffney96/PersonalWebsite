import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";
import Projects from "../Projects/Projects";
import Chess from "../Chess/Chess";
import Sudoku from "../Sudoku/Sudoku";

async function testCall() {
    return await fetch("/api/home/").then(response => {
        return response.json();
    }).then(jsonResponse => {
        console.log(jsonResponse.map(item => item));
    })
}

function App() {
    return (
        <Router>
            <Nav />
            <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Projects" element={<Projects/>}/>
                <Route path="/Chess" element={<Chess/>}/>
                <Route path="/Sudoku" element={<Sudoku/>}/>
            </Routes>
            <button onClick={testCall}>API Call</button>
            </main>
            <Footer />
        </Router>
    )
}

export default App;
