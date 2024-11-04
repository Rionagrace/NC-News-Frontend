import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './componants/Header'
import Home from './componants/Home';

function App() {

  return (
    <>
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </section>
    </>
  )
}

export default App
