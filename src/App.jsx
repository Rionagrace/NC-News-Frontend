import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './componants/Header'
import Home from './componants/Home';
import Article from './componants/Article';
import categoryContext from './contexts/categoryContexts';

function App() {

  const [category, setCategory] = useState('')

  return (
    <categoryContext.Provider value={{category, setCategory}}>
    <>
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/articles/:article_id" element={<Article/>}/>
        </Routes>
      </section>
    </>
    </categoryContext.Provider>
  )
}

export default App
